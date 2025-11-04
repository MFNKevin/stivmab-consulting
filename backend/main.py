from fastapi import FastAPI
from backend.database.connection import Base, engine
from backend.models import coaching # noqa: F401
from backend.routes import coaching_routes 
from fastapi.middleware.cors import CORSMiddleware

app = FastAPI(
    title="StivMab Consulting API",
    description="Backend officiel du site StivMab Consulting",
    version="1.0.0"
)

# Création des tables
Base.metadata.create_all(bind=engine)

@app.get("/")
def read_root():
    return {"message": "Bienvenue sur l'API StivMab Consulting 🚀"}


app.add_middleware(
    CORSMiddleware,
    allow_origins=["http://127.0.0.1:5500"],  # Tu peux restreindre à ton domaine plus tard
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)


app.include_router(coaching_routes.router)