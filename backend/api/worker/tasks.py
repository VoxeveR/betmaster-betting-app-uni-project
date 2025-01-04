from datetime import datetime
from sqlalchemy.orm import Session
from api.core.logging import logger
from api.database.models.games import Games, GameStatus



def task_check_game_started(db: Session):
    try:
        db.query(Games).filter(
            Games.game_status == GameStatus.BEFORE and
            Games.start_time <= datetime.now()).update({Games.game_status: GameStatus.PLAYING})

        logger.info(f"Game started at {datetime.now()}")

        db.commit()
    except Exception as e:
        logger.error(e)
        db.rollback()
