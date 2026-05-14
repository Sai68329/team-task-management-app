from fastapi import APIRouter, Depends, HTTPException, status
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import User
from app.schemas import SignupSchema, LoginSchema
from app.auth import (
    hash_password,
    verify_password,
    create_access_token
)

router = APIRouter(
    prefix="/auth",
    tags=["Auth"]
)

# SIGNUP

@router.post("/signup")
def signup(
    user: SignupSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if existing_user:

        raise HTTPException(
            status_code=status.HTTP_400_BAD_REQUEST,
            detail="Email already exists"
        )

    new_user = User(
        name=user.name,

        email=user.email,

        password=hash_password(user.password),

        role="ADMIN"
    )

    db.add(new_user)

    db.commit()

    db.refresh(new_user)

    return {
        "message": "User created successfully",
        "user": {
            "id": new_user.id,
            "name": new_user.name,
            "email": new_user.email,
            "role": new_user.role
        }
    }

@router.get("/users")
def get_users(
    db: Session = Depends(get_db)
):

    users = db.query(User).all()

    return users

# LOGIN

@router.post("/login")
def login(
    user: LoginSchema,
    db: Session = Depends(get_db)
):

    existing_user = db.query(User).filter(
        User.email == user.email
    ).first()

    if not existing_user:

        raise HTTPException(
            status_code=status.HTTP_404_NOT_FOUND,
            detail="User not found"
        )

    if not verify_password(
        user.password,
        existing_user.password
    ):

        raise HTTPException(
            status_code=status.HTTP_401_UNAUTHORIZED,
            detail="Invalid password"
        )

    token = create_access_token({
        "sub": existing_user.email,
        "user_id": existing_user.id,
        "role": existing_user.role
    })

    return {
        "message": "Login successful",

        "access_token": token,

        "token_type": "bearer",

        "user": {
            "id": existing_user.id,
            "name": existing_user.name,
            "email": existing_user.email,
            "role": existing_user.role
        }
    }