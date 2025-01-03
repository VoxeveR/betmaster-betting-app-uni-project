from api.database.models.user import User
from api.database.models.user_roles import UserRoles, Role
from sqlalchemy.orm import Session
from api.schemas.user import UserReg
from api.core.logging import logger
from api.core.security import hash_password

def create_new_admin(admin: UserReg, db: Session):
    try:
        new_admin = User(
            username=admin.username,
            password=hash_password(admin.password),
            name=admin.name,
            surname=admin.surname,
            email=str(admin.email),
        )
        db.add(new_admin)
        db.flush()

        new_role = UserRoles(
            user_id=new_admin.user_id,
            role_name=Role.ADMIN,
        )
        db.add(new_role)

        db.commit()

        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False

