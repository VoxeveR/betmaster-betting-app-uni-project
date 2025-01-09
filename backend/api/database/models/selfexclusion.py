from sqlalchemy import Column, Integer, DateTime, ForeignKey
from api.database.init_db import Base

class SelfExclusion(Base):
    __tablename__ = 'selfexclusion'

    self_exclusion_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    start_date = Column(DateTime, nullable=False)
    end_date = Column(DateTime, nullable=False)