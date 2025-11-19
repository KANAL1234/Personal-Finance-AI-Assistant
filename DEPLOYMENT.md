# Deployment Guide

This application consists of two parts:
1.  **Backend**: FastAPI (Python) - Requires Tesseract and Poppler.
2.  **Frontend**: Next.js (Node.js).

## Option 1: Docker (Recommended)
The easiest way to deploy is using Docker, as it handles the system dependencies (Tesseract, Poppler) automatically.

### Prerequisites
- Docker and Docker Compose installed on your server (e.g., DigitalOcean Droplet, AWS EC2, or locally).

### Steps
1.  **Build and Run**:
    ```bash
    docker-compose up --build -d
    ```
2.  **Access**:
    - Frontend: `http://localhost:3000` (or your server IP)
    - Backend: `http://localhost:8000`

## Option 2: Cloud Platforms (Vercel + Render)

### Frontend (Vercel)
1.  Push your code to GitHub.
2.  Import the project in Vercel.
3.  Set the Root Directory to `frontend`.
4.  Deploy.

### Backend (Render/Railway)
**Warning**: You must use a Dockerfile deployment on these platforms because of the Tesseract dependency. Standard Python environments won't have Tesseract installed.

1.  Create a new Web Service on Render.
2.  Connect your GitHub repo.
3.  Select "Docker" as the runtime.
4.  **Crucial Step**:
    - **Root Directory**: `backend`
    - **Dockerfile Path**: `Dockerfile` (or leave blank if Root Directory is set to `backend`)
