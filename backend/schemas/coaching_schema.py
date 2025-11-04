from pydantic import BaseModel

class CoachingSchema(BaseModel):
    id: int
    titre: str
    description: str
    niveau: str | None = None  # optionnel

    class Config:
       from_attributes = True

class CoachingCreateSchema(BaseModel):
    titre: str
    description: str
    niveau: str | None = None
