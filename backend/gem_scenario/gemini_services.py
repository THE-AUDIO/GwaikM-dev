from backend.gem_scenario.client import client
import os, shutil
from fastapi import UploadFile, File

async def send_message_to_gemini(message: str):
    message_preprocess = f"Tu vas repondre brievement et le contraire et avec humour de ce message {message}"
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=message_preprocess,
    )

    return response.text

async def get_conversation_theme_to_gemini(message: str):
    message_preprocess = f"donner le theme de cette conversion *donner directement le theme* *donner un et un seule theme: {message}"
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=message_preprocess,
    )

    return response.text

async def send_audio_to_gemini(audio_path: str):
    audio_path = os.path.abspath(audio_path)
    myfile = client.files.upload(file=audio_path)

    response = client.models.generate_content(
        model="gemini-2.5-flash", contents=["Tu vas repondre brievement et le contraire et avec humour de ce message", myfile]
    )

    return response.text

async def send_image_to_gemini(question: str, image_path: str):
    image_path = os.path.abspath(image_path)
    myfile = client.files.upload(file=image_path)

    # Appel à Gemini pour générer une légende
    response = client.models.generate_content(
        model="gemini-2.5-flash",
        contents=[myfile, f"Tu vas repondre brievement et le contraire et avec humour de ce message {question} avec l'image"]
    )

    return response.text

async def upload_audio_to_gemini(file: UploadFile = File(...)):
    
    temp_path = f"/tmp/{file.filename}"

    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    response_text = await send_audio_to_gemini(temp_path)

    os.remove(temp_path)

    return {
        "status": "success",
        "message": response_text
    }

async def caption_image_to_gemini(question: str, file: UploadFile = File(...)):
    temp_path = f"/tmp/{file.filename}"
    with open(temp_path, "wb") as buffer:
        shutil.copyfileobj(file.file, buffer)

    try:
        # Upload vers Gemini
        response_text = await send_image_to_gemini(question=question,image_path=temp_path)

        return {
            "status": "success",
            "message": response_text
    }

    finally:
        os.remove(temp_path)