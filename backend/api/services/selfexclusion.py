from sqlalchemy.orm import Session

from api.core.logging import logger
from api.database.models.selfexclusion import SelfExclusion
from api.schemas.selfexclusion import SelfExclusionModel


def add_selfexclusion(user_id: int, selfExclusion: SelfExclusionModel, db: Session) -> bool:
    try:
        new_selfExclusion = SelfExclusion(
            user_id=user_id,
            start_date=selfExclusion.start_date,
            end_date=selfExclusion.end_date,
        )

        db.add(new_selfExclusion)
        db.commit()

        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False
