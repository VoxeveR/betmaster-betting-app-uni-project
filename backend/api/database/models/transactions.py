import enum
from sqlalchemy import Column, Integer, Numeric, ForeignKey, Enum, DateTime, func
from api.database.init_db import Base

class TransactionType(enum.Enum):
    BET_TRANSACTION = 'BET_TRANSACTION'
    WITHDRAWAL = 'WITHDRAWAL'
    DEPOSIT = 'DEPOSIT'

class TransactionStatus(enum.Enum):
    PENDING = 'PENDING'
    CANCELED = 'CANCELED'
    CREDITED = 'CREDITED'

class Transactions(Base):
    __tablename__ = 'transactions'

    transaction_id = Column(Integer, primary_key=True)
    account_id = Column(Integer, ForeignKey('account.account_id'), nullable=False)
    transaction_type = Column(Enum(TransactionType), nullable=False)
    amount = Column(Numeric(12, 2), nullable=False)
    transaction_date = Column(DateTime, nullable=False, server_default=func.now())
    status = Column(Enum(TransactionStatus), nullable=False)