import os
from dotenv import load_dotenv
from google import genai

load_dotenv()

client = genai.Client(
    api_key=os.getenv("GEMINI_API_KEY")
)

def generate_ai_insights(summary):

    prompt = f"""
You are a Senior Data Scientist.

Analyze this dataset.

Dataset Summary:
{summary}

Provide:

1. Executive Summary
2. Data Quality
3. Business Insights
4. Recommended Charts
5. Recommended ML Models
6. Data Cleaning Suggestions
7. Final Recommendation

Keep the response professional and concise.
"""

    response = client.models.generate_content(
        model="gemini-3.1-flash-lite",
        contents=prompt,
    )

    return response.text