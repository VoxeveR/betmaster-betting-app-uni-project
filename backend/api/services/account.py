from typing import Optional
from api.database.models.transactions import Transactions, TransactionType, TransactionStatus
from api.database.models.account import Account
from api.schemas.account import ChangeBalance
from sqlalchemy.orm import Session
from api.core.logging import logger


def check_balance_for_bet(user_id: int, amount: float, db: Session) -> bool:
    try:
        result = db.query(Account.balance).filter(Account.user_id == user_id).first()

        if float(result.balance) - amount < 0:
            return False

        return True
    except Exception as e:
        logger.error(e)
        return False

def change_balance_by_bet(user_id: int, amount: float, db: Session) -> bool:
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


def change_balance_by_deposit(change_balance: ChangeBalance, db: Session) -> bool:
    try:
        result = db.query(Account.account_id).filter(Account.user_id == change_balance.user_id).first()
        db.query(Account).filter(Account.account_id == result.account_id).update({Account.balance: Account.balance + change_balance.amount})

        new_transaction = Transactions(
            account_id=result.account_id,
            transaction_type=TransactionType.DEPOSIT,
            amount=change_balance.amount,
            status=TransactionStatus.PENDING
        )

        db.add(new_transaction)

        db.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False


def change_balance_by_withdrawal(change_balance: ChangeBalance, db: Session) -> bool:
    try:
        result = db.query(Account.account_id).filter(Account.user_id == change_balance.user_id).first()
        db.query(Account).filter(Account.account_id == result.account_id).update({Account.balance: Account.balance + change_balance.amount})

        new_transaction = Transactions(
            account_id=result.account_id,
            transaction_type=TransactionType.WITHDRAWAL,
            amount=change_balance.amount,
            status=TransactionStatus.PENDING
        )

        db.add(new_transaction)

        db.commit()
        return True
    except Exception as e:
        logger.error(e)
        db.rollback()
        return False


def get_balance_from_account(user_id: int, db: Session) -> Optional[dict]:
    try:
        result = db.query(Account.balance).filter(Account.user_id == user_id).first()

        if result is None:
            return None

        return {"balance": result.balance}
    except Exception as e:
        logger.error(e)
        return None
