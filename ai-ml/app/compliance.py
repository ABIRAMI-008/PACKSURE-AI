def check_compliance(product: dict, ingredients: list, allergens: list) -> dict:

    checks = []

    # Product name
    if product.get("name"):
        checks.append({
            "check": "Product name",
            "status": "Pass",
            "message": "Product name detected from OCR."
        })
    else:
        checks.append({
            "check": "Product name",
            "status": "Verify",
            "message": "Product name could not be confidently detected."
        })

    # Manufacturer
    if product.get("manufacturer"):
        checks.append({
            "check": "Manufacturer",
            "status": "Pass",
            "message": "Manufacturer information detected."
        })
    else:
        checks.append({
            "check": "Manufacturer",
            "status": "Verify",
            "message": "Manufacturer information is missing or unclear."
        })

    # MRP
    if product.get("mrp"):
        checks.append({
            "check": "MRP",
            "status": "Pass",
            "message": "MRP detected."
        })
    else:
        checks.append({
            "check": "MRP",
            "status": "Verify",
            "message": "MRP could not be confidently detected."
        })

    # Net quantity
    if product.get("net_quantity"):
        checks.append({
            "check": "Net quantity",
            "status": "Pass",
            "message": "Net quantity detected."
        })
    else:
        checks.append({
            "check": "Net quantity",
            "status": "Verify",
            "message": "Net quantity could not be confidently detected."
        })

    # Batch / Lot
    if product.get("batch_lot"):
        checks.append({
            "check": "Batch / Lot",
            "status": "Pass",
            "message": "Batch / lot information detected."
        })
    else:
        checks.append({
            "check": "Batch / Lot",
            "status": "Verify",
            "message": "Batch / lot information could not be confidently detected."
        })

    # Manufacturing date
    if product.get("manufacturing_date"):
        checks.append({
            "check": "Manufacturing date",
            "status": "Pass",
            "message": "Manufacturing date detected."
        })
    else:
        checks.append({
            "check": "Manufacturing date",
            "status": "Verify",
            "message": "Manufacturing date could not be confidently detected."
        })

    # Best before / expiry
    if product.get("expiry_best_before"):
        checks.append({
            "check": "Best before / expiry",
            "status": "Pass",
            "message": "Best before / expiry information detected."
        })
    else:
        checks.append({
            "check": "Best before / expiry",
            "status": "Verify",
            "message": "Best before / expiry information could not be confidently detected."
        })

    # Ingredients
    if ingredients:
        checks.append({
            "check": "Ingredients",
            "status": "Pass",
            "message": "Ingredient declaration detected."
        })
    else:
        checks.append({
            "check": "Ingredients",
            "status": "Verify",
            "message": "Ingredient declaration could not be confidently detected."
        })

    # Allergen declaration
    if allergens:
        checks.append({
            "check": "Allergen declaration",
            "status": "Pass",
            "message": "Potential allergens detected in the product text."
        })
    else:
        checks.append({
            "check": "Allergen declaration",
            "status": "Verify",
            "message": "No supported allergen was detected. Manual verification is recommended."
        })

    # -------------------------
    # SCORE
    # -------------------------

    total_checks = len(checks)

    passed_checks = sum(
        1
        for check in checks
        if check["status"] == "Pass"
    )

    if total_checks > 0:
        score = round(
            (passed_checks / total_checks) * 100,
            2
        )
    else:
        score = None

    # -------------------------
    # OVERALL STATUS
    # -------------------------

    verify_count = sum(
        1
        for check in checks
        if check["status"] == "Verify"
    )

    if verify_count == 0:
        status = "Pass"
        summary = "All currently supported checks passed."
    else:
        status = "Requires Verification"
        summary = (
            f"{verify_count} compliance check(s) require verification."
        )

    return {
        "checks": checks,
        "score": score,
        "status": status,
        "summary": summary
    }