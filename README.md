# Personal Finance AI Assistant

A full-stack AI assistant for personal finance management.

## Features
- **OCR**: Reads bank statements.
- **Categorization**: Automatically categorizes transactions using NLP.
- **Forecasting**: Predicts future spending using time-series ML.
- **Chat**: Conversational interface for budgeting advice.

## Tech Stack
- **Frontend**: Next.js, TailwindCSS
- **Backend**: FastAPI, Python
- **Database**: PostgreSQL (planned), ChromaDB (Vector DB)

## Getting Started

### Backend
```bash
cd backend
python3 -m venv venv
source venv/bin/activate
pip install -r requirements.txt
uvicorn main:app --reload
```

### Frontend
```bash
cd frontend
npm run dev
```
