import re


def extract_ingredients(text: str) -> list:

    ingredients = []

    # Find ingredient section
    match = re.search(
        r"Ingredients\s*:\s*(.*?)(?=\n\s*Contains\b|\n\s*Manufactured\b)",
        text,
        re.IGNORECASE | re.DOTALL
    )

    if not match:
        return ingredients

    ingredient_text = match.group(1)

    # Join OCR line breaks
    ingredient_text = re.sub(
        r"\s+",
        " ",
        ingredient_text
    ).strip()

    # Remove unnecessary full stops
    ingredient_text = ingredient_text.replace(
        "Condiments.",
        "Condiments"
    )

    # Split commas only when we are NOT inside parentheses
    parts = []
    current = ""
    depth = 0

    for char in ingredient_text:

        if char == "(":
            depth += 1

        elif char == ")":
            depth = max(0, depth - 1)

        if char == "," and depth == 0:
            if current.strip():
                parts.append(current.strip())
            current = ""
        else:
            current += char

    if current.strip():
        parts.append(current.strip())

    # Clean each ingredient
    for item in parts:

        item = item.strip(" .")

        # Remove unnecessary "and" at the beginning
        item = re.sub(
            r"^and\s+",
            "",
            item,
            flags=re.IGNORECASE
        )

        if item:
            ingredients.append(item)

    return ingredients