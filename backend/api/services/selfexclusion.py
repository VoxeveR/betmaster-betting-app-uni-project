from sqlalchemy.orm import Session

from api.core import logging
from api.database.models.selfexclusion import SelfExclusion
from api.schemas.selfexclusion import SelfExclusion


def add_selfexclusion(user_id: int, selfExclusion: SelfExclusion, db: Session) -> bool:
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
        logging.error(e)
        db.rollback()
        return False
