# Użyj oficjalnego obrazu Pythona jako obrazu bazowego
FROM python:3.13-slim

# Ustaw katalog roboczy w kontenerze
WORKDIR /app

# Skopiuj plik wymagań do kontenera
COPY requirements.txt .

# Zainstaluj zależności
RUN pip install --no-cache-dir -r requirements.txt

# Skopiuj resztę kodu aplikacji do kontenera
COPY . .

# Ustaw zmienną środowiskową dla FastAPI
ENV PYTHONUNBUFFERED=1
ENV USER_DB=user
ENV PASS_DB=password
ENV IP_DB=localhost
ENV PORT_DB=5432
ENV DATABASE=betmaster


# Ustaw port, na którym będzie działać aplikacja
EXPOSE 8080

# Uruchom aplikację za pomocą Uvicorn
CMD ["uvicorn", "main:app", "--host", "0.0.0.0", "--port", "8000", "--reload", "--log-config=log_conf.yaml"]