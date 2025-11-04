from sqlalchemy import Column, Integer, String, Text
from backend.database.connection import Base

class Coaching(Base):
    __tablename__ = "coachings"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(255), nullable=False)
    description = Column(Text, nullable=False)
    niveau = Column(String(100), nullable=True)  # ex: débutant, intermédiaire, expert
