# Multi-stage build to optimize image size
FROM python:3.11-slim as builder

WORKDIR /app

# Copy requirements and install dependencies
COPY requirements.txt .
RUN pip install --no-cache-dir --user -r requirements.txt

# Runtime stage
FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    libgl1 \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy Python packages from builder
COPY --from=builder /root/.local /root/.local

# Copy app code into 'backend' directory to preserve package structure
COPY . ./backend

# Set PYTHONPATH so python can find the 'backend' module
ENV PYTHONPATH=/app
ENV PATH=/root/.local/bin:$PATH

# Expose port
EXPOSE 8000

# Run app with single worker to minimize memory usage (512MB limit)
CMD uvicorn backend.main:app --host 0.0.0.0 --port ${PORT:-8000} --workers 1 --timeout-keep-alive 75
