import enum
from sqlalchemy import Column, Integer, String, Enum, ForeignKey
from api.database.init_db import Base

class OddsType(enum.Enum):
    One = '1'
    Two = '2'
    X = 'X'

class Odds(Base):
    __tablename__ = 'odds'

    odds_id = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey("games.game_id"), nullable=False)
    odds = Column(String, nullable=False)
    odds_type = Column(Enum(OddsType), nullable=False)