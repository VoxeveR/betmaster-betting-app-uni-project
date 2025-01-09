from api.database.models.gameReslut import GameResult
from sqlalchemy import Column, Integer, Numeric, Enum, ForeignKey
from api.database.init_db import Base



class Odds(Base):
    __tablename__ = 'odds'

    odds_id = Column(Integer, primary_key=True)
    game_id = Column(Integer, ForeignKey("games.game_id"), nullable=False)
    odds = Column(Numeric, nullable=False)
    odds_type = Column(Enum(GameResult), nullable=False)