from fastapi import APIRouter, UploadFile, File, HTTPException
import pytesseract
from pdf2image import convert_from_bytes
from PIL import Image
import io

router = APIRouter(
    prefix="/ocr",
    tags=["ocr"],
    responses={404: {"description": "Not found"}},
)

@router.post("/upload")
async def upload_file(file: UploadFile = File(...)):
    """
    Upload a file (PDF or Image) and extract text using OCR.
    """
    if not file.filename:
        raise HTTPException(status_code=400, detail="No filename provided")

    contents = await file.read()
    text = ""

    try:
        if file.content_type == "application/pdf":
            # Convert PDF to images
            images = convert_from_bytes(contents)
            for i, image in enumerate(images):
                text += f"--- Page {i+1} ---\n"
                text += pytesseract.image_to_string(image) + "\n"
        elif file.content_type in ["image/jpeg", "image/png", "image/jpg"]:
            # Process image directly
            image = Image.open(io.BytesIO(contents))
            text = pytesseract.image_to_string(image)
        else:
            raise HTTPException(status_code=400, detail="Unsupported file type. Please upload PDF or Image (JPEG/PNG).")
            
    except Exception as e:
        raise HTTPException(status_code=500, detail=f"OCR processing failed: {str(e)}")

    return {"filename": file.filename, "extracted_text": text}
