from fastapi import APIRouter, Depends
from sqlalchemy.orm import Session
from backend.database.connection import SessionLocal
from backend.models.coaching import Coaching, Reservation, ContactMessage
from backend.schemas.coaching_schema import (
    CoachingResponse, ReservationCreate, ReservationResponse,
    ContactMessageCreate, ContactMessageResponse
)

# Crée le router
router = APIRouter(
    prefix="",
    tags=["coachings"]
)

# Dépendance pour la session DB
def get_db():
    db = SessionLocal()
    try:
        yield db
    finally:
        db.close()

# ----- Routes -----

@router.get("/coachings", response_model=list[CoachingResponse])
def read_coachings(db: Session = Depends(get_db)):
    return db.query(Coaching).all()

@router.post("/reservations", response_model=ReservationResponse)
def create_reservation(reservation: ReservationCreate, db: Session = Depends(get_db)):
    db_res = Reservation(
        nom=reservation.nom,
        email=reservation.email,
        coaching_id=reservation.coaching_id
    )
    db.add(db_res)
    db.commit()
    db.refresh(db_res)
    return db_res
@router.post("/contact-messages", response_model=ContactMessageResponse)
def create_contact_message(message: ContactMessageCreate, db: Session = Depends(get_db)):
    db_msg = ContactMessage(
        nom=message.nom,
        email=message.email,
        telephone=message.telephone,
        sujet=message.sujet,
        message=message.message
    )
    db.add(db_msg)
    db.commit()
    db.refresh(db_msg)
    return db_msg