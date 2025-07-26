from fastapi import APIRouter
from fastapi import HTTPException, Depends
from backend.messages.messageModel import Message_create
from backend.messages.messageService import add_sms, get_all_sms, get_sms_by_id, get_sms_by_session
from backend.core.database import get_session
from sqlmodel import Session

router = APIRouter()


@router.post("/add-message")
def add_message(message: Message_create, session: Session = Depends(get_session)):
    try: 
        return add_sms(message=message, session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"error: {e}")
    
@router.get("/get-all-messages")
def get_all_messages(session: Session = Depends(get_session)):
    try:
        return get_all_sms(session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")
    
@router.get("/get-messages-by-session")
def get_messages_by_session(session_message: int, session: Session = Depends(get_session)):
    try:
        return get_sms_by_session(s=session_message, session=session) 
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")

@router.get("/get-message-by-id")
def get_message_by_id(id: int, session: Session = Depends(get_session)):
    try:
        return get_sms_by_id(id=id, session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")