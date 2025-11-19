from fastapi import FastAPI

app = FastAPI(title="Personal Finance AI Assistant")

@app.get("/")
def read_root():
    return {"message": "Welcome to Personal Finance AI Assistant Backend"}

@app.get("/health")
def health_check():
    return {"status": "healthy"}
