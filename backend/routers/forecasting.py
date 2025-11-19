from fastapi import APIRouter, HTTPException
from pydantic import BaseModel
from typing import List
from backend.services.forecaster import forecaster

router = APIRouter(
    prefix="/forecast",
    tags=["forecast"],
    responses={404: {"description": "Not found"}},
)

class TransactionItem(BaseModel):
    date: str
    amount: float

class ForecastRequest(BaseModel):
    history: List[TransactionItem]
    days: int = 30

@router.post("/")
async def predict_spending(request: ForecastRequest):
    """
    Predict future spending based on historical transaction data.
    """
    result = forecaster.forecast(
        [item.dict() for item in request.history], 
        days=request.days
    )
    
    if "error" in result:
        raise HTTPException(status_code=500, detail=result["error"])
        
    return result
