from fastapi import APIRouter, HTTPException
from pydantic import BaseModel

from app.services.gemini_service import ask_gemini

router = APIRouter()

# This will store the latest uploaded dataset summary
dataset_context = ""


class ChatRequest(BaseModel):
    question: str


@router.post("/chat")
async def chat(request: ChatRequest):
    try:
        if not dataset_context:
            raise HTTPException(
                status_code=400,
                detail="Please upload a dataset first."
            )

        prompt = f"""
You are an expert Senior Data Scientist.

Dataset Information:

{dataset_context}

User Question:
{request.question}

Answer clearly using the dataset information.
If the dataset does not contain enough information,
say so instead of making assumptions.
"""

        answer = ask_gemini(prompt)

        return {
            "answer": answer
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))