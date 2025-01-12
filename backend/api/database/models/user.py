from sqlalchemy import Column, Integer, String, Boolean, Text, Numeric, DateTime, func
from api.database.init_db import Base

class User(Base):
    __tablename__ = "users"

    user_id = Column(Integer, primary_key=True, autoincrement=True)
    username = Column(String(40), nullable=False)
    password = Column(Text, nullable=False)
    name = Column(String(40), nullable=False)
    surname = Column(String(60), nullable=False)
    email = Column(Text, nullable=False)
    pesel = Column(Numeric(11), nullable=True)
    id_number = Column(String(10), nullable=True)
    phone_number = Column(Numeric(11), nullable=True)
    is_verified = Column(Boolean, nullable=True)
    is_banned = Column(Boolean, nullable=False, server_default=func.false())
    created_at = Column(DateTime, server_default=func.now())