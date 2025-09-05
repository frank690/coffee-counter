"""
Main entrance point of the backend application.
"""

from fastapi import FastAPI
from fastapi.middleware.cors import CORSMiddleware
from backend.src.xls import initialize_spreadsheet
from backend.src.routes import router

initialize_spreadsheet()
app = FastAPI()

app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

app.include_router(router)