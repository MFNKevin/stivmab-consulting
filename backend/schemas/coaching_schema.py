from pydantic import BaseModel
from typing import Optional

# ----- Coaching -----
class CoachingBase(BaseModel):
    titre: str
    description: str
    niveau: Optional[str] = "Tous niveaux"
    video_url: Optional[str] = None
    duree: Optional[str] = None

class CoachingCreate(CoachingBase):
    pass

class CoachingResponse(CoachingBase):
    id: int
    class Config:
        from_attributes = True

# ----- Reservation -----
class ReservationBase(BaseModel):
    nom: str
    email: str
    coaching_id: int
    telephone: Optional[str] = None

class ReservationCreate(ReservationBase):
    pass

class ReservationResponse(ReservationBase):
    id: int
    premiere_seance_gratuite: bool
    class Config:
        from_attributes = True

# ----- Contact Message -----
class ContactMessageBase(BaseModel):
    nom: str
    email: str
    sujet: str
    message: str
    telephone: Optional[str] = None

class ContactMessageCreate(ContactMessageBase):
    pass

class ContactMessageResponse(ContactMessageBase):
    id: int
    class Config:
        from_attributes = True
