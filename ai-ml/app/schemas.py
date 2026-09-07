from typing import List, Optional
from pydantic import BaseModel


class ProductInfo(BaseModel):
    name: Optional[str] = None
    brand: Optional[str] = None
    manufacturer: Optional[str] = None
    mrp: Optional[str] = None
    net_quantity: Optional[str] = None
    batch_lot: Optional[str] = None
    manufacturing_date: Optional[str] = None
    expiry_best_before: Optional[str] = None


class ComplianceCheck(BaseModel):
    check: str
    status: str
    message: str


class ComplianceResult(BaseModel):
    checks: List[ComplianceCheck]
    score: Optional[float] = None
    status: str
    summary: Optional[str] = None


class VisualEvidence(BaseModel):
    type: str
    label: str
    value: str


class AnalysisResponse(BaseModel):
    product: ProductInfo
    ingredients: List[str]
    allergens: List[str]
    compliance: ComplianceResult
    visual_evidence: List[VisualEvidence]
    raw_ocr_text: str