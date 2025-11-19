from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.routers import ocr, categorization, forecasting
from backend.database import create_db_and_tables

app = FastAPI(title="Personal Finance AI Assistant")

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.on_event("startup")
def on_startup():
    create_db_and_tables()

app.include_router(ocr.router)
app.include_router(categorization.router)
app.include_router(forecasting.router)

@app.get("/")
def read_root():
    return {"message": "Welcome to Personal Finance AI Assistant Backend"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
