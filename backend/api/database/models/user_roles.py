import enum
from sqlalchemy import Column, Integer, Enum
from api.database.init_db import Base

class Role(enum.Enum):
    USER = 'USER'
    ADMIN = 'ADMIN'
    ANALYST = 'ANALYST'

class UserRoles(Base):
    __tablename__ = "user_roles"

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, nullable=False)
    role_name = Column(Enum(Role), nullable=True)