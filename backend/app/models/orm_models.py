# backend/app/models/orm_models.py

from datetime import datetime
from typing import Optional

from sqlalchemy import (
    Column,
    Integer,
    String,
    DateTime,
    Boolean,
    Float,
    ForeignKey,
    Text,
)
from sqlalchemy.orm import declarative_base, relationship

Base = declarative_base()


class Client(Base):
    """
    A client app that uses your VoiceAuth Core (e.g., banking app, IoT device app).
    Each client gets an API key.
    """
    __tablename__ = "clients"

    id = Column(Integer, primary_key=True, index=True)
    name = Column(String(100), nullable=False, unique=True)
    api_key = Column(String(128), nullable=False, unique=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    users = relationship("User", back_populates="client")
    auth_logs = relationship("AuthLog", back_populates="client")


class User(Base):
    """
    A user of a client app.
    external_user_id = ID from the client’s own system.
    """
    __tablename__ = "users"

    id = Column(Integer, primary_key=True, index=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=False)
    external_user_id = Column(String(128), nullable=False)
    display_name = Column(String(100), nullable=True)
    created_at = Column(DateTime, default=datetime.utcnow)

    client = relationship("Client", back_populates="users")
    voice_profiles = relationship("VoiceProfile", back_populates="user")
    auth_logs = relationship("AuthLog", back_populates="user")

    __table_args__ = (
        # same external_user_id can exist in different clients, but must be unique per client
        {},
    )


class VoiceProfile(Base):
    """
    Stores the enrolled voice template (embedding) for a user.
    """
    __tablename__ = "voice_profiles"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=False)
    # store embedding as JSON/text (e.g., comma-separated floats or JSON string)
    embedding = Column(Text, nullable=False)
    model_name = Column(String(100), nullable=False, default="ecapa-tdnn")
    created_at = Column(DateTime, default=datetime.utcnow)
    updated_at = Column(
        DateTime,
        default=datetime.utcnow,
        onupdate=datetime.utcnow,
    )

    user = relationship("User", back_populates="voice_profiles")


class AuthLog(Base):
    """
    Logs each authentication attempt (good for security & tuning thresholds).
    """
    __tablename__ = "auth_logs"

    id = Column(Integer, primary_key=True, index=True)
    user_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    client_id = Column(Integer, ForeignKey("clients.id"), nullable=True)

    success = Column(Boolean, nullable=False)
    similarity = Column(Float, nullable=True)
    live_prob = Column(Float, nullable=True)
    reason = Column(String(100), nullable=True)

    created_at = Column(DateTime, default=datetime.utcnow)

    user = relationship("User", back_populates="auth_logs")
    client = relationship("Client", back_populates="auth_logs")
