from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session
from typing import List
from backend.database.connection import SessionLocal
from backend.models.coaching import Coaching
from backend.schemas.coaching_schema import CoachingSchema, CoachingCreateSchema

router = APIRouter(prefix="/coachings", tags=["Coachings"])

# --- Dépendance pour obtenir une session DB ---
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# --- 1. Lister tous les coachings ---
@router.get("/", response_model=List[CoachingSchema])
def get_all_coachings(db: Session = Depends(get_db)):
    return db.query(Coaching).all()

# --- 2. Récupérer un coaching par ID ---
@router.get("/{coaching_id}", response_model=CoachingSchema)
def get_coaching(coaching_id: int, db: Session = Depends(get_db)):
    coaching = db.query(Coaching).filter(Coaching.id == coaching_id).first()
    if not coaching:
        raise HTTPException(status_code=404, detail="Coaching non trouvé")
    return coaching

# --- 3. Créer un nouveau coaching ---
@router.post("/", response_model=CoachingSchema)
def create_coaching(coaching_data: CoachingCreateSchema, db: Session = Depends(get_db)):
    new_coaching = Coaching(
        titre=coaching_data.titre,
        description=coaching_data.description,
        niveau=coaching_data.niveau
    )
    db.add(new_coaching)
    db.commit()
    db.refresh(new_coaching)
    return new_coaching

# --- 4. Modifier un coaching ---
@router.put("/{coaching_id}", response_model=CoachingSchema)
def update_coaching(coaching_id: int, coaching_data: CoachingCreateSchema, db: Session = Depends(get_db)):
    coaching = db.query(Coaching).filter(Coaching.id == coaching_id).first()
    if not coaching:
        raise HTTPException(status_code=404, detail="Coaching non trouvé")

    coaching.titre = coaching_data.titre
    coaching.description = coaching_data.description
    coaching.niveau = coaching_data.niveau

    db.commit()
    db.refresh(coaching)
    return coaching

# --- 5. Supprimer un coaching ---
@router.delete("/{coaching_id}", response_model=dict)
def delete_coaching(coaching_id: int, db: Session = Depends(get_db)):
    coaching = db.query(Coaching).filter(Coaching.id == coaching_id).first()
    if not coaching:
        raise HTTPException(status_code=404, detail="Coaching non trouvé")

    db.delete(coaching)
    db.commit()
    return {"message": "Coaching supprimé avec succès"}
