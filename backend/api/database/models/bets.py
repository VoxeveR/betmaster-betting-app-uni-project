import enum
from sqlalchemy import Column, Integer, Numeric, Enum, DateTime, ForeignKey, func
from api.database.init_db import Base

class BetResult(enum.Enum):
    WON = 'Won'
    LOST = 'Lost'

class BetStatus(enum.Enum):
    SETTLED = 'Settled'
    UNSETTLED = 'Unsettled'

class Bets(Base):
    __tablename__ = 'bets'

    bet_id = Column(Integer, primary_key=True)
    user_id = Column(Integer, ForeignKey('users.user_id'), nullable=False)
    game_id = Column(Integer, ForeignKey('games.game_id'), nullable=False)
    bet_amount = Column(Numeric(12,2), nullable=False)
    odds = Column(Numeric(2,2), nullable=False)
    status = Column(Enum(BetStatus), nullable=False)
    created_at = Column(DateTime, server_default=func.now())
    bet_result = Column(Enum(BetResult))