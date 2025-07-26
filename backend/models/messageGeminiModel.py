from sqlmodel import Field, SQLModel
from datetime import datetime
from typing import Optional

class Message(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    question: str
    response: str
    date: datetime
    session: int

class ConversationTheme(SQLModel, table=True):
    id: Optional[int] = Field(default=None, primary_key=True, sa_column_kwargs={"autoincrement": True})
    theme: str
    session: int