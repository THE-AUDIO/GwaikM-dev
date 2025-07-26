from fastapi import APIRouter
from fastapi import HTTPException, Depends
from backend.messages.messageModel import Conversation_theme
from backend.messages.messageService import add_theme, get_all_theme, get_conv_theme_by_session
from backend.core.database import get_session
from sqlmodel import Session

router = APIRouter()

@router.post("/add-conversation-theme")
def add_conversation_theme(conversation_theme: Conversation_theme, session: Session = Depends(get_session)):
    try:
        return add_theme(conv_theme=conversation_theme, session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")
    
@router.get("/get-conversation-theme-by-session")
def get_conversation_theme_by_session(session_id: int, session: Session = Depends(get_session)):
    try:
        return get_conv_theme_by_session(session_id=session_id, session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")
    
@router.get("/get-all-conversation-theme")
def get_all_conversation_theme(session: Session = Depends(get_session)):
    try:
        return get_all_theme(session=session)
    except Exception as e:
        raise HTTPException(status_code=404, detail=f"Error: {e}")