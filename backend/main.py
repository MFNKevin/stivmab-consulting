from fastapi import FastAPI
from fastapi.staticfiles import StaticFiles # <--- 1. NOUVEL IMPORT IMPORTANT
from backend.database.connection import Base, engine
from backend.models import coaching # noqa: F401
from backend.routes import coaching_routes 
from fastapi.middleware.cors import CORSMiddleware
import os

app = FastAPI(
    title="StivMab Consulting API",
    description="Backend officiel du site StivMab Consulting",
    version="1.0.0"
)

# Création des tables
Base.metadata.create_all(bind=engine)

# Configuration CORS
# J'ai mis ["*"] pour que vos amis puissent y accéder via le lien Ngrok sans blocage
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"], 
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

# Inclusion des routes API (Coaching, etc.)
app.include_router(coaching_routes.router)

# --- MODIFICATION MAJEURE ICI ---

# J'ai supprimé l'ancien @app.get("/") qui retournait le message JSON.
# À la place, on dit à FastAPI de servir le dossier "frontend" à la racine.

# On vérifie que le dossier existe pour éviter une erreur
if os.path.isdir("frontend"):
    app.mount("/", StaticFiles(directory="frontend", html=True), name="static")
else:
    print("⚠️ ATTENTION : Le dossier 'frontend' est introuvable. Vérifiez l'architecture.")