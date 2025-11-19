from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from backend.services.categorizer import categorizer

router = APIRouter(
    prefix="/categorize",
    tags=["categorize"],
    responses={404: {"description": "Not found"}},
)

class TransactionRequest(BaseModel):
    description: str

@router.post("/")
async def categorize_transaction(request: TransactionRequest):
    """
    Categorize a transaction description using Vector Search.
    """
    if not request.description:
        raise HTTPException(status_code=400, detail="Description is required")
    
    result = categorizer.categorize(request.description)
    return result
