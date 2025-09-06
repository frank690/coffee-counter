"""
Defining API routes.
"""

from fastapi import APIRouter, HTTPException, Query
from src.models import User
from src import xls

router = APIRouter()


@router.get("/users", response_model=list[User])
def get_users() -> list[User]:
    """
    Get all users from the spreadsheet.

    Returns:
        A list of user dictionaries.
    """
    return xls.get_users()


@router.post("/update")
def update(uid: str = Query(...)) -> dict:
    """
    Update a user's coffee count.
    Args:
        uid: The user ID.
    Returns:
        Updated user data or raises HTTPException if user not found.
    """
    result = xls.user_buys_coffee(uid)
    if result is None:
        raise HTTPException(status_code=404, detail="User not found")
    return result
