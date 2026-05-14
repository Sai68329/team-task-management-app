from fastapi import APIRouter, Depends, HTTPException
from sqlalchemy.orm import Session

from app.database import get_db
from app.models import Project, Task
from app.schemas import ProjectSchema
from app.dependencies import get_current_user

router = APIRouter(
    prefix="/projects",
    tags=["Projects"]
)

# CREATE PROJECT

@router.post("/")
def create_project(
    project: ProjectSchema,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    new_project = Project(
        name=project.name,

        description=project.description,

        # NEW
        status=project.status,

        created_by=user["user_id"]
    )

    db.add(new_project)

    db.commit()

    db.refresh(new_project)

    return {
        "message": "Project created successfully",
        "project": new_project
    }


# GET ALL PROJECTS

@router.get("/")
def get_projects(
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    projects = db.query(Project).all()

    return projects


@router.get("/{project_id}")
def get_project_details(
    project_id: int,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:
        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    tasks = db.query(Task).filter(
        Task.project_id == project_id
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
            "assigned_user": task.assigned_user.name
            if task.assigned_user else None,
        })

    return {
        "project": {
            "id": project.id,
            "name": project.name,
            "description": project.description,
            "status": project.status,
        },
        "tasks": formatted_tasks
    }


# UPDATE PROJECT STATUS

@router.put("/{project_id}/status")
def update_project_status(
    project_id: int,
    status: str,
    db: Session = Depends(get_db),
    user=Depends(get_current_user)
):

    project = db.query(Project).filter(
        Project.id == project_id
    ).first()

    if not project:

        raise HTTPException(
            status_code=404,
            detail="Project not found"
        )

    project.status = status

    db.commit()

    db.refresh(project)

    return {
        "message": "Project status updated successfully",
        "project": project
    }