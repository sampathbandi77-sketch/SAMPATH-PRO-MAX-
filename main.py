from pathlib import Path
import os
from dotenv import load_dotenv
from fastapi import FastAPI
from fastapi.responses import FileResponse
from fastapi.staticfiles import StaticFiles

BASE = Path(__file__).resolve().parents[2]
FRONTEND = BASE.parent / "frontend"
load_dotenv(BASE / ".env")

app = FastAPI(title="SAMPATH PRO MAX API", version="0.1.0")

def broker_status(name: str, required: list[str]):
    configured = all(os.getenv(key, "").strip() for key in required)
    return {
        "broker": name,
        "status": "CONFIGURED_PENDING_IMPLEMENTATION" if configured else "NOT_CONFIGURED",
        "credentials_present": configured,
        "message": (
            "Credentials detected. Official authentication and feed verification are still required."
            if configured else
            "Add credentials through the secure backend environment after creating an official broker app."
        )
    }

@app.get("/api/health")
def health():
    return {"status": "OK", "application": "SAMPATH PRO MAX", "version": "0.1.0"}

@app.get("/api/brokers")
def brokers():
    return {
        "brokers": [
            broker_status("Dhan", ["DHAN_CLIENT_ID", "DHAN_ACCESS_TOKEN"]),
            broker_status("Upstox", ["UPSTOX_CLIENT_ID", "UPSTOX_CLIENT_SECRET"]),
            broker_status("CoinSwitch", ["COINSWITCH_API_KEY", "COINSWITCH_API_SECRET"]),
        ],
        "live_data": False,
        "real_money_orders": False,
        "note": "No live feed or broker order execution is implemented in this starter."
    }

@app.get("/")
def index():
    return FileResponse(FRONTEND / "index.html")

app.mount("/assets", StaticFiles(directory=FRONTEND), name="assets")
