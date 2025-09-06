"""
Contains pydantic models for request and response validation.
"""

__all__ = ["User", "Action"]

from pydantic import BaseModel


class User(BaseModel):
    uid: str
    name: str
    count: int

class Action(BaseModel):
    uid: str
    name: str
    date: str