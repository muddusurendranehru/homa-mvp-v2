# Run Both Servers Locally - Manual Instructions

## Updated ShareButtons Component

The ShareButtons component has been updated with the exact URL formats you specified:

- **WhatsApp**: `https://wa.me/?text=${encodeURIComponent(title + ' ' + url)}`
- **Telegram**: `https://t.me/share/url?url=${encodeURIComponent(url)}&text=${encodeURIComponent(title)}`
- **Facebook**: `https://www.facebook.com/sharer/sharer.php?u=${encodeURIComponent(url)}`
- **Twitter/X**: `https://twitter.com/intent/tweet?text=${encodeURIComponent(title)}&url=${encodeURIComponent(url)}`
- **Gmail**: `https://mail.google.com/mail/?view=cm&fs=1&to=&su=${encodeURIComponent(title)}&body=${encodeURIComponent(url)}`

## Server Paths

**Backend Server:**
- Path: `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`
- Port: Check `server.js` for port (usually 5000 or 3001)

**Frontend Server:**
- Path: `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`
- Port: 3002 (as per package.json)

## Manual Server Startup Instructions

### Option 1: PowerShell (Two Separate Windows)

**Terminal 1 - Backend Server:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm install
npm start
# OR for development with auto-reload:
npm run dev
```

**Terminal 2 - Frontend Server:**
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm install
npm run dev
```

### Option 2: Single PowerShell Window (Background Jobs)

```powershell
# Navigate to project root
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION

# Start backend server in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd server; npm start"

# Start frontend server in background
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd web; npm run dev"
```

## Local URLs to Test

Once both servers are running:

**Frontend (Next.js):**
- URL: `http://localhost:3002`
- Test share buttons on: `http://localhost:3002/conditions/diabetes`
- Or any condition page: `http://localhost:3002/conditions/[condition-name]`

**Backend API:**
- URL: Check `server/server.js` for the port (usually `http://localhost:5000` or `http://localhost:3001`)

## Testing Share Buttons Locally

1. Open browser: `http://localhost:3002/conditions/diabetes`
2. Scroll to find share buttons (below H1 heading)
3. Click each button to test:
   - **WhatsApp**: Should open WhatsApp with pre-filled message
   - **Telegram**: Should open Telegram share dialog
   - **Facebook**: Should open Facebook share dialog
   - **Twitter/X**: Should open Twitter compose window
   - **Gmail**: Should open Gmail compose window

## Verify Share URLs

The share buttons will use `window.location.href` dynamically, so:
- Local: `http://localhost:3002/conditions/diabetes`
- Production: `https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com/conditions/diabetes`

## Troubleshooting

**If backend server fails:**
- Check if port is already in use
- Verify `.env` file exists in `server/` directory
- Check database connection settings

**If frontend server fails:**
- Check if port 3002 is available
- Run `npm install` in `web/` directory
- Clear Next.js cache: `rm -rf .next` (or delete `.next` folder)

**If share buttons don't work:**
- Check browser console for errors
- Verify `ShareButtons.tsx` component is imported correctly
- Test on different browsers (Chrome, Firefox, Edge)

## Quick Start Commands

**Full path commands (copy-paste ready):**

```powershell
# Backend
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server && npm start

# Frontend (in new terminal)
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web && npm run dev
```
