from pydantic import BaseModel
from datetime import datetime

class Message_create(BaseModel):
    question: str
    response: str
    date: datetime
    session: int

class Conversation_theme(BaseModel):
    theme: str
    session: int