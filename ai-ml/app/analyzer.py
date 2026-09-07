import re


def extract_product_info(text: str) -> dict:

    product = {
        "name": None,
        "brand": None,
        "manufacturer": None,
        "mrp": None,
        "net_quantity": None,
        "batch_lot": None,
        "manufacturing_date": None,
        "expiry_best_before": None,
    }

    lines = [
        line.strip()
        for line in text.splitlines()
        if line.strip()
    ]

    # -------------------------
    # MRP
    # -------------------------
    match = re.search(
        r"(?:MRP|M\.R\.P\.?|Rs\.?)\s*(?:&\s*)?"
        r"(?:[:\-])?\s*(?:₹\s*)?"
        r"([0-9]+(?:\.[0-9]{1,2})?)",
        text,
        re.IGNORECASE
    )

    if match:
        product["mrp"] = match.group(1)

    # -------------------------
    # NET QUANTITY
    # -------------------------
    match = re.search(
        r"Net\s*Quantity\s*:\s*"
        r"([0-9]+(?:\.[0-9]+)?)\s*(g|kg|ml|l)",
        text,
        re.IGNORECASE
    )

    if match:
        product["net_quantity"] = (
            match.group(1) + " " + match.group(2)
        )

    # -------------------------
    # MANUFACTURER
    # -------------------------
    match = re.search(
        r"Manufactured\s*&\s*Packed\s*by\s*:\s*([^\n]+)",
        text,
        re.IGNORECASE
    )

    if match:
        product["manufacturer"] = match.group(1).strip()

    # -------------------------
    # PRODUCT NAME / BRAND
    # -------------------------
    # Look at the lines before the ingredient section.
    # Avoid obvious headings and descriptions.

    ingredient_index = None

    for i, line in enumerate(lines):
        if re.search(r"^Ingredients\s*:", line, re.IGNORECASE):
            ingredient_index = i
            break

    if ingredient_index is not None:

        candidate_lines = lines[:ingredient_index]

        ignored = {
            "nutritional information",
            "energy",
            "protein",
            "carbohydrate",
            "total fat",
            "sodium"
        }

        candidates = []

        for line in candidate_lines:

            lower_line = line.lower()

            if lower_line in ignored:
                continue

            if "approx." in lower_line:
                continue

            if "kcal" in lower_line:
                continue

            if "crunchy." in lower_line:
                continue

            if "spicy." in lower_line:
                continue

            if "irresistible." in lower_line:
                continue

            if len(line) < 3:
                continue

            candidates.append(line)

        # Usually the first two useful consecutive lines
        # near the top are brand + product name.
        if len(candidates) >= 2:
            product["brand"] = candidates[0]
            product["name"] = candidates[0] + " " + candidates[1]

        elif len(candidates) == 1:
            product["name"] = candidates[0]

    # -------------------------
    # DATES
    # -------------------------
    date_pattern = (
        r"\b[0-9]{1,2}[\/\-][0-9]{1,2}[\/\-][0-9]{2,4}\b"
    )

    dates = re.findall(date_pattern, text)

    if len(dates) >= 2:
        product["manufacturing_date"] = dates[-2]
        product["expiry_best_before"] = dates[-1]

    # -------------------------
    # BATCH / LOT
    # -------------------------
    if len(dates) >= 2:

        first_date_position = text.find(dates[-2])

        text_before_date = text[:first_date_position]

        previous_lines = [
            line.strip()
            for line in text_before_date.splitlines()
            if line.strip()
        ]

        if previous_lines:

            candidate = previous_lines[-1]

            invalid_values = {
                "batch",
                "batch no",
                "batch no.",
                "mfg",
                "mfg date",
                "mfg date :",
                "best before",
                "best before :"
            }

            if (
                candidate.lower() not in invalid_values
                and re.fullmatch(
                    r"[A-Za-z0-9\/\-]+",
                    candidate
                )
            ):
                product["batch_lot"] = candidate

    return product