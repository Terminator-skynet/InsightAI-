from fastapi import APIRouter, UploadFile, File, HTTPException
import pandas as pd

router = APIRouter()


@router.post("/upload")
async def upload_csv(file: UploadFile = File(...)):
    try:
        # Read CSV (UTF-8 first, fallback to Latin-1)
        try:
            df = pd.read_csv(file.file, encoding="utf-8")
        except UnicodeDecodeError:
            file.file.seek(0)
            df = pd.read_csv(file.file, encoding="latin1")

        # Basic Information
        rows = len(df)
        columns = len(df.columns)
        column_names = list(df.columns)

        numeric_columns = len(df.select_dtypes(include="number").columns)
        categorical_columns = len(df.select_dtypes(exclude="number").columns)

        missing_values = int(df.isnull().sum().sum())
        duplicate_rows = int(df.duplicated().sum())

        memory_usage = round(
            df.memory_usage(deep=True).sum() / (1024 * 1024),
            2,
        )

        # Column Information
        column_info = []

        for col in df.columns:
            column_info.append({
                "name": col,
                "dtype": str(df[col].dtype),
                "missing": int(df[col].isnull().sum()),
                "unique": int(df[col].nunique()),
                "sample": str(df[col].dropna().iloc[0]) if not df[col].dropna().empty else "N/A",
            })

        # Numeric Statistics
        statistics = {}

        numeric_df = df.select_dtypes(include="number")

        if not numeric_df.empty:
            statistics = numeric_df.describe().round(2).to_dict()

        # Missing Values Per Column
        missing_per_column = (
            df.isnull()
            .sum()
            .to_dict()
        )

        # Chart Data
        chart_data = {
            "data_types": [
                {
                    "name": "Numeric",
                    "value": numeric_columns,
                },
                {
                    "name": "Categorical",
                    "value": categorical_columns,
                },
            ],
            "missing_values": [
                {
                    "name": col,
                    "value": int(df[col].isnull().sum()),
                }
                for col in df.columns
            ],
        }

        # Preview
        preview = df.head(10).fillna("").to_dict(orient="records")

        return {
            "rows": rows,
            "columns": columns,
            "column_names": column_names,

            "numeric_columns": numeric_columns,
            "categorical_columns": categorical_columns,

            "missing_values": missing_values,
            "duplicate_rows": duplicate_rows,
            "memory_usage": memory_usage,

            "column_info": column_info,

            "statistics": statistics,

            "missing_per_column": missing_per_column,

            "chart_data": chart_data,

            "preview": preview,
        }

    except Exception as e:
        raise HTTPException(status_code=500, detail=str(e))