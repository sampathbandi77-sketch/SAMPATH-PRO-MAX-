# SAMPATH PRO MAX — Windows + Android starter

This ZIP is a fresh, responsive application foundation for Windows and Android browsers.

## What is included
- Responsive dark dashboard and installable-PWA files.
- FastAPI backend with health and broker-status endpoints.
- Separate Dhan, Upstox and CoinSwitch connection slots.
- Environment-variable configuration template.
- Windows setup and startup scripts.

## Important status
This is a runnable starter, **not a completed live broker integration**. Broker cards deliberately show `NOT CONFIGURED` until real credentials and the corresponding official authentication/feed implementations are configured and verified. No prices or connected statuses are fabricated. No real-money order endpoint is included.

## Windows setup
1. Install Python 3.11+ and Node is not required.
2. Extract this ZIP.
3. Double-click `setup_windows.bat`.
4. Then double-click `start_windows.bat`.
5. Open `http://127.0.0.1:8000` in your browser.

The backend serves the frontend directly, so there is one local server.

## Android use
For Android, deploy this project to a server with HTTPS and open its HTTPS address in Chrome. Use Chrome's menu > **Add to Home screen** / **Install app**.
For quick same-Wi-Fi testing, start the server on Windows and open `http://WINDOWS_PC_LAN_IP:8000` on Android. This is browser testing; PWA installation generally requires HTTPS (or localhost).

## Broker setup
Create your broker developer applications directly with each broker. Put credentials only in the backend environment, never in frontend JavaScript or GitHub.

1. Copy `backend/.env.example` to `backend/.env`.
2. Fill credentials only after obtaining them from the official broker portal.
3. Restart the backend.
4. Implement and verify each provider's current official OAuth/token and market-data WebSocket flow before expecting `CONNECTED`.

Do not send API secrets, access tokens, passwords or OTPs in chat. Do not commit `backend/.env`.

## Current broker adapter state
- Dhan: status/configuration slot only; official auth/feed implementation still required.
- Upstox: status/configuration slot only; official OAuth/feed implementation still required.
- CoinSwitch: status/configuration slot only; confirm current API product, eligibility and permissions with CoinSwitch before implementation.

## Safety
- This starter cannot place broker orders.
- Do not enable real-money trading without broker approval, secure credential handling, static-IP requirements where applicable, thorough testing and regulatory review.
- This is a personal software starter, not investment advice or a guarantee of returns.
