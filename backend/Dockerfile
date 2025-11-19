FROM python:3.11-slim

# Install system dependencies
RUN apt-get update && apt-get install -y \
    tesseract-ocr \
    poppler-utils \
    libgl1-mesa-glx \
    && rm -rf /var/lib/apt/lists/*

WORKDIR /app

# Copy requirements (if you have one, otherwise we install manually for now)
# It's better to freeze requirements first.
COPY requirements.txt .
RUN pip install --no-cache-dir -r requirements.txt

# Copy app code
COPY . .

# Expose port
EXPOSE 8000

# Run app
# Run app using PORT environment variable (default 8000)
CMD uvicorn main:app --host 0.0.0.0 --port ${PORT:-8000}
