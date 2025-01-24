from fastapi import FastAPI, Request
from fastapi.middleware.cors import CORSMiddleware
from api.api import api_router
from api.core.logging import logger
from api.worker.aps_app import start_scheduler
from datetime import datetime
from fastapi.staticfiles import StaticFiles
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(
    api_router,
    prefix="/api",
)

app.mount("/static", StaticFiles(directory="static"), name="static")


@app.middleware("http")
async def log_requests(request: Request, call_next):
    start_time = datetime.now()
    response = await call_next(request)
    duration = datetime.now() - start_time

    logger.info(
        f"Hostname: {request.url.hostname} | "
        f"Path: {request.url.path} | "
        f"Method: {request.method} | "
        f"Duration: {duration.total_seconds():.2f}s | "
        f"Status: {response.status_code}"
    )

    return response

@app.get("/healthcheck")
async def healthcheck():
    return {"status": "ok"}

@app.on_event("startup")
async def startup():
    start_scheduler()