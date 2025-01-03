from sqlalchemy import Column, Integer, ForeignKey, Enum
from api.database.models.gameReslut import GameResult
from api.database.init_db import Base

class BetsGames(Base):
    __tablename__ = 'betsgames'

    bet_id = Column(Integer, ForeignKey('bets.bet_id'), primary_key=True, nullable=False)
    game_id = Column(Integer, ForeignKey('games.game_id'), primary_key=True, nullable=False)
    expected_result = Column(Enum(GameResult), nullable=False)