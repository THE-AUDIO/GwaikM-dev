from backend.models.messageGeminiModel import Message, ConversationTheme
from backend.messages.messageModel import Message_create, Conversation_theme
from sqlmodel import Session, select

def add_sms(message: Message_create, session: Session):
    sms: Message = Message(
        question=message.question,
        response=message.response,
        date=message.date,
        session=message.session
    )

    session.add(sms)
    session.commit()
    session.refresh(sms)

    return {
        "status": "success",
        "message": sms
    }

def get_all_sms(session: Session):
    messages = session.exec(select(Message)).all()

    return {
        "status": "success",
        "messages": messages
    }

def get_sms_by_id(id: int, session: Session):
    message = session.exec(
            select(Message).
            where(Message.id == id)
        ).first()
    
    return {
        "status": "success",
        "message": message
    }

def get_sms_by_session(s: int, session: Session):
    messages = session.exec(
        select(Message).
        where(Message.session == s)
    ).all()

    return {
        "status": "success",
        "messages": messages
    }

def add_theme(conv_theme: Conversation_theme, session: Session):
    conversation_theme: ConversationTheme = ConversationTheme(
        theme=conv_theme.theme,
        session=conv_theme.session
    )

    session.add(conversation_theme)
    session.commit()
    session.refresh(conversation_theme)

    return {
        "status": "success",
        "theme": conversation_theme
    }

def get_conv_theme_by_session(session_id: int, session: Session):
    theme = session.exec(
            select(ConversationTheme).
            where(ConversationTheme.session == session_id)
        ).first()
    
    return {
        "status": "success",
        "theme": theme
    }


def get_all_theme(session: Session):
    themes = session.exec(select(ConversationTheme)).all()

    return {
        "status": "success",
        "themes": themes
    }