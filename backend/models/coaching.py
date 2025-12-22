from sqlalchemy import Column, Integer, String, Text, Boolean, DateTime, ForeignKey
from sqlalchemy.orm import relationship
from datetime import datetime
from backend.database.connection import Base

class Coaching(Base):
    __tablename__ = "coachings"

    id = Column(Integer, primary_key=True, index=True)
    titre = Column(String(100), nullable=False)
    description = Column(Text, nullable=False)
    niveau = Column(String(50), default="Tous niveaux")
    video_url = Column(String(255))  # YouTube/Vimeo URL
    duree = Column(String(50))  # Ex: "45 min"
    created_at = Column(DateTime, default=datetime.utcnow)

    reservations = relationship("Reservation", back_populates="coaching")


class Reservation(Base):
    __tablename__ = "reservations"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    telephone = Column(String(20), nullable=True)
    coaching_id = Column(Integer, ForeignKey("coachings.id"))
    date_reservation = Column(DateTime, default=datetime.utcnow)
    premiere_seance_gratuite = Column(Boolean, default=True)

    coaching = relationship("Coaching", back_populates="reservations")


class ContactMessage(Base):
    __tablename__ = "contact_messages"

    id = Column(Integer, primary_key=True, index=True)
    nom = Column(String(100), nullable=False)
    email = Column(String(100), nullable=False)
    telephone = Column(String(20), nullable=True)
    sujet = Column(String(200), nullable=False)
    message = Column(Text, nullable=False)
    created_at = Column(DateTime, default=datetime.utcnow)
