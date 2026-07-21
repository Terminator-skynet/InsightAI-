from app.services.gemini_service import generate_ai_insights

summary = {
    "rows": 5000,
    "columns": 12,
    "missing_values": 50,
    "duplicate_rows": 4,
    "numeric_columns": 8,
    "categorical_columns": 4
}

print(generate_ai_insights(summary))