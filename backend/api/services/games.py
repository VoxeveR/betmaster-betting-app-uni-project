from api.database.models.games import Games, GameStatus
from typing_extensions import Optional
from sqlalchemy.orm import Session
from api.core.logging import logger
from collections import defaultdict

def checkGameExist(games: dict, db: Session) -> bool:
    for game_id in games.keys():
        game = db.query(Games).filter(Games.game_id == int(game_id)).first()
        if not game:
            return False
    return True

def get_games_categories(db: Session) -> Optional[dict]:
    try:
        result = db.query(Games.sport_type, Games.event_name).filter(Games.game_status != GameStatus.FINISHED).all()

        categories = defaultdict(list)

        for sport_type, event_name in result:
            categories[sport_type].append(event_name)

        return categories
    except Exception as e:
        logger.error(e)
        return None