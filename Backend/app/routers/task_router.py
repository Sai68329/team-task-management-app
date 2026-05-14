from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Task
from app.schemas import TaskSchema
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/tasks",
    tags=["Tasks"]
)

# CREATE TASK

@router.post("/")
def create_task(
    task: TaskSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    new_task = Task(
        title=task.title,
        description=task.description,
        priority=task.priority,

        # NEW
        status=task.status,

        deadline=task.deadline,

        assigned_to=task.assigned_to,

        project_id=task.project_id
    )

    db.add(new_task)

    db.commit()

    db.refresh(new_task)

    return {
        "message": "Task created successfully",
        "task": new_task
    }


# GET ALL TASKS

from sqlalchemy.orm import joinedload

@router.get("/")
def get_tasks(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    tasks = db.query(Task).options(

        joinedload(Task.assigned_user),

        joinedload(Task.project)

    ).all()

    formatted_tasks = []

    for task in tasks:

        formatted_tasks.append({

            "id": task.id,

            "title": task.title,

            "description": task.description,

            "priority": task.priority,

            "status": task.status,

            "deadline": task.deadline,

            "assigned_to": task.assigned_to,

            "assigned_user":
                task.assigned_user.name
                if task.assigned_user
                else None,

            "project_id": task.project_id,

            "project_name":
                task.project.name
                if task.project
                else None,
        })

    return formatted_tasks


# UPDATE TASK STATUS

@router.put("/{task_id}/status")
def update_task_status(
    task_id: int,
    status: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    task = db.query(Task).filter(
        Task.id == task_id
    ).first()

    if not task:

        raise HTTPException(
            status_code=404,
            detail="Task not found"
        )

    task.status = status

    db.commit()

    db.refresh(task)

    return {
        "message": "Task status updated successfully",
        "task": task
    }