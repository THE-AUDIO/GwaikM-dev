from fastapi import APIRouter
from backend.routes.gemini_routes import router as gemini_router
from backend.routes.message_routes import router as message_router
from backend.routes.theme_routes import router as theme_router

routers = APIRouter()

@routers.get("/")
def welcome():
    return {"message": "Welcome to Nandra API!"}

routers.include_router(router=gemini_router, tags=["Gemini routes"])
routers.include_router(router=message_router, tags=["Message routes"])
routers.include_router(router=theme_router, tags=["Conversation theme routes"])