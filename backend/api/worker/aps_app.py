from apscheduler.schedulers.background import BackgroundScheduler
from apscheduler.triggers.cron import CronTrigger
from api.worker.tasks import (
    task_check_game_started,
    task_generate_raport,
)
from api.core.logging import logger
from api.database.init_db import SessionLocal

scheduler = BackgroundScheduler()
scheduler.start()

def task_creator(task_function, task_name: str, schedule_type: str, **kwargs):
    def task_wrapper():
        db = SessionLocal()
        try:
            if 'filename' in kwargs.keys():
                task_function(db, kwargs['filename'])
            else:
                task_function(db)
        except Exception as e:
            logger.error(f"Błąd w zadaniu {task_name}: {e}")
        finally:

            db.close()


    if schedule_type == 'interval':

        scheduler.add_job(
            task_wrapper,
            'interval',
            id=task_name,
            **kwargs
        )
    elif schedule_type == 'cron_weekly':

        scheduler.add_job(
            task_wrapper,
            id=task_name,
            trigger=CronTrigger(
                day_of_week=kwargs.get('day_of_week', 'mon'),
                hour=kwargs.get('hour', 0),
                minute=kwargs.get('minute', 0)
            )
        )
    elif schedule_type == 'cron_monthly':

        scheduler.add_job(
            task_wrapper,
            'cron',
            id=task_name,
            day=kwargs.get('day', 1),
            hour=kwargs.get('hour', 0),
            minute=kwargs.get('minute', 0)
        )
    else:
        raise ValueError(f"Nieznany typ harmonogramu: {schedule_type}")

    # scheduler.add_job(task_check_game_started, 'interval', id=task_name, minutes=kwargs.get('minute', 0))

def start_scheduler():
    task_creator(task_check_game_started, task_name="check_game_started", schedule_type='interval', minutes=1)
    task_creator(task_generate_raport, task_name="genrate_raport", schedule_type='cron_weekly', day_of_week=3, hour=0, minute=5, filename="test")

