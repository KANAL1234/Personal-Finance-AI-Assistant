from typing import Optional
from sqlmodel import Field, SQLModel
from datetime import datetime

class Transaction(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True)
    date: datetime
    amount: float
    description: str
    category: Optional[str] = None
