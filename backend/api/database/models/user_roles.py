import enum
from sqlalchemy import Column, Integer, Enum, ForeignKey

class Role(enum.Enum):
    USER = 'USER'
    ADMIN = 'ADMIN'
    ANALYST = 'ANALYST'


class UserRoles(Base):
    __tablename__ = "user_roles"

    role_id = Column(Integer, primary_key=True, autoincrement=True)
    user_id = Column(Integer, ForeignKey("users.user_id"), nullable=False)
    role_name = Column(Enum(Role), nullable=True)