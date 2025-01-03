from sqlalchemy import Column, Integer, Numeric, ForeignKey
from api.database.init_db import Base

class Account(Base):
    __tablename__ = 'account'

    account_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('user.user_id'), nullable=False)
    balance = Column(Numeric(15,2), nullable=False, default=0.00)