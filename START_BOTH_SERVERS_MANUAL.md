# 🚀 Manual Server Start Commands - Complete Paths

## Start Backend Server (Port 5000)

**Option 1: Single Command**
```powershell
cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server"; npm start
```

**Option 2: New PowerShell Window**
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm start"
```

---

## Start Frontend Server (Port 3002)

**Option 1: Single Command**
```powershell
cd "C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web"; npm run dev
```

**Option 2: New PowerShell Window**
```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"
```

---

## Start Both Servers at Once (2 Separate Windows)

```powershell
Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server'; npm start"; Start-Process powershell -ArgumentList "-NoExit", "-Command", "cd 'C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web'; npm run dev"
```

---

## Test URLs After Starting

- **Frontend:** http://localhost:3002
- **Backend Health:** http://localhost:5000/api/health
- **Sitemap:** http://localhost:3002/sitemap.xml

---

## Complete Directory Paths

- **Backend Directory:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server`
- **Frontend Directory:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\web`
- **Project Root:** `C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`
