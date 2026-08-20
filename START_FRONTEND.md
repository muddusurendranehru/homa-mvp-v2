# 🚀 PowerShell Commands to Start Frontend

## Step 1: Create .env.local File

```powershell
cd web
```

```powershell
@"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
"@ | Out-File -FilePath .env.local -Encoding utf8
```

---

## Step 2: Install Dependencies (First Time Only)

```powershell
npm install
```

**Expected output:**
```
added 350 packages in 45s
```

---

## Step 3: Start Frontend Dev Server

```powershell
npm run dev
```

**Expected output:**
```
> web@0.1.0 dev
> next dev

  ▲ Next.js 14.2.0
  - Local:        http://localhost:3000

 ✓ Ready in 2.5s
```

---

## 📋 Full Copy-Paste Commands

### If .env.local doesn't exist yet:

```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
@"
NEXT_PUBLIC_API_URL=http://localhost:5000/api
"@ | Out-File -FilePath .env.local -Encoding utf8
npm install
npm run dev
```

### If you already ran npm install:

```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```

---

## ✅ Verify It's Running

1. **Check terminal output:**
   ```
   ✓ Ready in 2.5s
   - Local: http://localhost:3000
   ```

2. **Open browser:**
   ```
   http://localhost:3000
   ```

3. **Should see:**
   - Landing page with "HOMA Clinic" title
   - "Get Started" button

---

## 🔧 Troubleshooting

### If port 3000 is already in use:

```powershell
# Kill process on port 3000
Stop-Process -Id (Get-NetTCPConnection -LocalPort 3000).OwningProcess -Force

# Then start again
npm run dev
```

### If npm command not found:

```powershell
# Check Node.js installation
node --version
npm --version
```

### If dependency errors:

```powershell
# Clean install
Remove-Item -Recurse -Force node_modules
Remove-Item package-lock.json
npm install
```

---

## 📊 Two Terminal Setup

### Terminal 1: Backend
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm run dev
```
**Port:** 5000

### Terminal 2: Frontend
```powershell
cd C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web
npm run dev
```
**Port:** 3000

---

## ✅ Success Indicators

- ✅ Backend running on http://localhost:5000
- ✅ Frontend running on http://localhost:3000
- ✅ No errors in terminal
- ✅ Browser shows landing page
- ✅ "Get Started" button works

---

## 🧪 Quick Test

1. Click "Get Started"
2. Go to "Create Account" tab
3. Fill form and submit
4. Should redirect to `/assessment` page

**Backend must be running on port 5000 for this to work!**

---

**Dr. Muddu Surendra Nehru**  
📱 09963721999

