from fastapi import FastAPI, UploadFile, File
from PIL import Image
from app.preprocessing import preprocess_image
from app.ocr import extract_text
from app.analyzer import extract_product_info
from app.ingredients import extract_ingredients
from app.allergens import detect_allergens
from app.compliance import check_compliance
from app.evidence import build_visual_evidence
from app.schemas import AnalysisResponse
import io


app = FastAPI()


@app.get("/")
def home():
    return {
        "message": "PackSure AI service is running!"
    }


@app.post(
    "/ai/analyze",
    response_model=AnalysisResponse
)
async def analyze(image: UploadFile = File(...)):

    # Read uploaded image
    contents = await image.read()

    # Open image
    original_image = Image.open(
        io.BytesIO(contents)
    )

    # Preprocess image
    processed_image = preprocess_image(
        original_image
    )

    # Extract text using OCR
    raw_text = extract_text(
        processed_image
    )

    # Extract product information
    product_info = extract_product_info(
        raw_text
    )

    # Extract ingredients
    ingredients = extract_ingredients(
        raw_text
    )

    # Detect allergens
    allergens = detect_allergens(
        raw_text
    )

    # Check compliance
    compliance = check_compliance(
        product_info,
        ingredients,
        allergens
    )

    # Build visual evidence
    visual_evidence = build_visual_evidence(
        product_info,
        ingredients,
        allergens
    )

    # Return structured analysis
    return {
        "product": product_info,
        "ingredients": ingredients,
        "allergens": allergens,
        "compliance": compliance,
        "visual_evidence": visual_evidence,
        "raw_ocr_text": raw_text
    }