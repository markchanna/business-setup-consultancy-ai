# Deploy `demo-page` on Railway

## 1) Push code to GitHub
Make sure this folder is in a GitHub repo.

## 2) Create Railway project
- In Railway, click **New Project** -> **Deploy from GitHub Repo**.
- Select your repository.
- If this is a multi-folder repo, set **Root Directory** to `demo-page` in service settings.

## 3) Add environment variables in Railway
In the Railway service, open **Variables** and add:
- `RETELL_API_KEY`
- `RETELL_AGENT_ID`

Optional:
- `PORT` (Railway sets this automatically)

If you use `update-prompt.js` in Railway or locally, also add:
- `RETELL_LLM_ID`

## 4) Build + start settings
No custom command required if Railway auto-detects Node.
- Build: `npm install`
- Start: `npm start`

Current `package.json` already has:
- `start`: `node server.js`

## 5) Verify deployment
After deploy:
- Open the generated Railway domain.
- Confirm home page loads.
- Test `POST /api/create-web-call` from UI.
- Confirm no startup error about missing env vars.

## Notes
- `server.js` now requires `RETELL_API_KEY` and `RETELL_AGENT_ID` at startup.
- Do not commit real secrets into source files.
