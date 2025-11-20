FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code into 'backend' directory to preserve package structure
COPY . ./backend

# Set PYTHONPATH so python can find the 'backend' module
ENV PYTHONPATH=/app

# Expose port
EXPOSE 8000

# Run app using PORT environment variable (default 8000)
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000}
