from fastapi import APIRouter
from fastapi import Body, HTTPException
from backend.gem_scenario.gemini_services import send_message_to_gemini, get_conversation_theme_to_gemini, upload_audio_to_gemini, caption_image_to_gemini
from fastapi import UploadFile, File

router = APIRouter()

@router.post("/send-message")
async def send_message(message: str = Body(...)):
    try:
        return await send_message_to_gemini(message=message)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")

@router.post("/send-message-audio")
async def send_message_audio(file: UploadFile = File(...)):
    try:
        return await upload_audio_to_gemini(file=file)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")
    
@router.post("/send-message-image")
async def send_message_image(question: str = Body(...), file: UploadFile = File(...)):
    try:
        return await caption_image_to_gemini(question=question, file=file)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")

@router.post("/generate-theme")
async def generate_theme(message: str = Body(...)):
    try:
        return await get_conversation_theme_to_gemini(message=message)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")