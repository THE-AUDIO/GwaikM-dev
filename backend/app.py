from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.core.database import init_db
from backend.routes.routes import routers

app = FastAPI()

# CORS configuration
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],  # liste de domaines spécifiques en production
    allow_credentials=True,
    allow_methods=["*"],  # Autorise toutes les méthodes (GET, POST, etc.)
    allow_headers=["*"],  # Autorise tous les headers (ex: Content-Type, Authorization)
)


# Initialisation de la base au démarrage de l'application
@app.on_event("startup")
def on_startup():
    init_db()

app.include_router(router=routers)