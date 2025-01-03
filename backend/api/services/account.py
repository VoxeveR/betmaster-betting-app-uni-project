from pkg_resources import resource_listdir

from api.database.models.transactions import Transactions, TransactionType, TransactionStatus
from api.database.models.account import Account
from sqlalchemy.orm import Session
from api.core.logging import logger
import decimal


def check_balance_for_bet(user_id: int, amount: float, db: Session) -> bool:
    try:
        result = db.query(Account.balance).filter(Account.user_id == user_id).first()

        if float(result.balance) - amount < 0:
            return False

        return True
    except Exception as e:
        logger.error(e)
        return False

def change_balance(user_id: int, amount: float, db: Session) -> bool:
    try:
        result = db.query(Account.account_id).filter(Account.user_id == user_id).first()
        db.query(Account).filter(Account.account_id == result.account_id).update({Account.balance: Account.balance - amount})

        new_transaction = Transactions(
            account_id=result.account_id,
            transaction_type=TransactionType.BET_TRANSACTION,
            amount=amount,
            status=TransactionStatus.CREDITED
        )

        db.add(new_transaction)

        db.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False
