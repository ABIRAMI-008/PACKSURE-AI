import re


SUPPORTED_ALLERGENS = {
    "peanuts": [
        "peanut",
        "peanuts"
    ],

    "tree_nuts": [
        "almond",
        "cashew",
        "walnut",
        "pistachio",
        "hazelnut",
        "pecan",
        "macadamia",
        "other nuts",
        "nuts"
    ],

    "milk": [
        "milk",
        "milk powder",
        "whey",
        "casein"
    ],

    "soy": [
        "soy",
        "soya",
        "soybean"
    ],

    "gluten": [
        "wheat",
        "barley",
        "rye",
        "gluten"
    ],

    "egg": [
        "egg",
        "eggs"
    ],

    "fish": [
        "fish"
    ],

    "shellfish": [
        "shellfish",
        "crab",
        "prawn",
        "shrimp"
    ]
}


def detect_allergens(text: str) -> list:

    detected = []

    text_lower = text.lower()

    for allergen, keywords in SUPPORTED_ALLERGENS.items():

        for keyword in keywords:

            if re.search(
                r"\b" + re.escape(keyword) + r"\b",
                text_lower
            ):
                detected.append(allergen)
                break

    return detected