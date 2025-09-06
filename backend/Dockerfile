FROM python:3.12

WORKDIR /app
RUN apt-get update && apt-get install -y build-essential

RUN pip install poetry
COPY pyproject.toml poetry.lock ./
RUN poetry install --no-dev --no-interaction --no-ansi

COPY . .
EXPOSE 8000
CMD ["uvicorn", "src.main:app", "--host", "0.0.0.0", "--port", "8000"]
