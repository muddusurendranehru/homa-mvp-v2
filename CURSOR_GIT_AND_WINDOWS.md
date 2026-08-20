# For Cursor & developers — what the Git / Windows “mess” was

This file explains what went wrong in March 2026 so you do not repeat it. It includes **verbatim error text** so tools (Claude, Cursor, Copilot, etc.) can recognize the same failure. Copy relevant bits into **Cursor Project Rules** if you want the AI to always see them.

---

## 1. Git: “dubious ownership”

Git refused commands until the repo folder was marked safe:

```powershell
git config --global --add safe.directory "D:/loanlens/New folder (2)/DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION"
```

Change the path if the project moves.

---

## 2. PowerShell vs pasted text (looked like random errors)

| Mistake | What happened |
|--------|----------------|
| Using **`cd /d`** | That is **CMD** syntax. In PowerShell: `cd "full\path"` only. |
| Pasting **`PS D:\...>`** | **`PS`** is treated like **`Get-Process`**. Only type the command after `>`, e.g. **`npm run dev`**. |
| Pasting **`At line:1...`** or **`+ npm`** | Not commands. **`At`** triggered Windows **`AT`** scheduler help. |

---

## 3. `npm` not recognized

PATH not loaded in that terminal session. Fix: **new terminal** after Node install, or:

```powershell
$env:Path = [System.Environment]::GetEnvironmentVariable("Path","Machine") + ";" + [System.Environment]::GetEnvironmentVariable("Path","User")
```

Fallback: `& "C:\Program Files\nodejs\npm.cmd" run dev`

---

## 4. `git push` rejected (remote ahead)

Remote **main** had commits the laptop did not. You must **integrate first** (usually `git pull origin main`, then `git push`).

**`git pull --rebase`** failed here with **Permission denied** on **`.cursor/rules`** — Cursor (or Windows) locks that folder, so Git could not create/restore it during rebase.

If stuck in a bad rebase:

- Try **`git rebase --quit`** when **`git rebase --abort`** fails.
- **Close Cursor**, run **`git pull`** / **`git merge`** / **`git push`** in **Command Prompt** or external PowerShell, then reopen.

---

## 5. `.cursor` + Git on Windows

Symptoms: **`cannot create directory '.cursor/rules': Permission denied`**, **`could not open directory '.cursor/rules'`**, **`unable to create file ... File exists`**.

**Cause:** IDE holds files under `.cursor/`; checkout/rebase fights the lock.

**Options:** Push/pull with Cursor closed; use **merge** instead of **rebase** if rebase keeps failing; or (team decision) **gitignore** `.cursor/` and keep shared rules in a file like this one or `docs/`.

---

## 6. What worked for local dev

- **`server/`:** `npm install` → `npm run dev` → `http://127.0.0.1:5000/api/health` → JSON **`status: ok`**
- **`web/`:** `npm install` → `npm run dev` → **`http://localhost:3003`**

---

## 7. Protected project files

Do not change locked infrastructure without approval — see **`.cursor/rules/protected-files.mdc`** (if present). When unsure, ask **Dr. Muddu** before force-push or deleting **`.git`**.

---

## 8. Recommended workflow: CMD (not PowerShell)

Use **Command Prompt** for **git** and **npm** if PowerShell paste mistakes keep happening. Replace **`MYPC`** and the path with your real Windows user and folder (e.g. Desktop clone, or `D:\loanlens\New folder (2)\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`).

```bat
REM Open CMD (not PowerShell) and run:

git config --global --add safe.directory C:/Users/MYPC/Desktop/DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION

cd /d C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION

git pull origin main

cd web
npm install
npm run dev
```

For the **backend**, second CMD window:

```bat
cd /d C:\Users\MYPC\Desktop\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server
npm install
npm run dev
```

**`safe.directory`** must use the **same** path style Git sees (forward slashes are fine in `git config`). If the repo lives elsewhere, use that full path in both `safe.directory` and `cd`.

---

## 9. Golden Rules — print and stick on monitor

1. **ALWAYS use CMD** — never PowerShell for git/npm (team choice: avoids `PS` / `At line` paste accidents).
2. **ALWAYS `git pull`** before **`git push`**.
3. **NEVER `git rebase`** — always **`git merge`** (avoids `.cursor` lock pain on Windows).
4. **CLOSE Cursor** before any git operations that change many files (pull / merge / checkout).
5. **NEVER paste** `PS>` or `At line:` — **paste the command only** (one line at a time).
6. **`git push` fails?** → **`git pull origin main`** first → resolve if needed → then **`git push`**.

---

## 10. Verbatim mess: `git pull` → `read-tree failed` (PowerShell, Cursor open)

You may see this **exact** output (example: ran from `...\server` or repo root while **Cursor is still running**):

```text
PS D:\loanlens\New folder (2)\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION\server> git pull origin main
From https://github.com/muddusurendranehru/DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION
 * branch            main       -> FETCH_HEAD
.cursor/rules/protected-files.mdc: Permission denied
error: cannot stat '.cursor/rules': Permission denied
fatal: cannot create directory at '.cursor/rules': Permission denied
fatal: read-tree failed
```

### What it means (one paragraph)

**`git pull`** merges remote commits into your working tree. That requires Git to **read/update** files under **`.cursor/rules/`**. **Cursor** (or Windows file locks on that folder) blocks those operations, so Git cannot complete **`read-tree`** and aborts. Running from **`server`** is **not** the bug—Git still uses the **repo root**; the failure is almost always **IDE lock + `.cursor`**.

### Fix order (do this; don’t fight Git blindly)

1. **Quit Cursor completely** (all windows). Check **Task Manager** — no `Cursor` processes left.
2. Open **CMD** (your Golden Rules).
3. **`cd /d`** to the **repository root** (not only `server`):

   `D:\loanlens\New folder (2)\DR-MUDDUS-MVP-MIRACLE-VALUE-PROPOSITION`

4. Run:

   ```bat
   git pull origin main
   ```

5. If it **still** says **Permission denied** on **`.cursor`**:
   - Reboot once (clears stray locks), then **`git pull origin main`** again from CMD at repo root, **or**
   - From **File Explorer**, rename **`.cursor`** to **`.cursor.bak`** (only when Cursor is closed), run **`git pull`**, then restore any local rule files you still need from **`.cursor.bak`** (don’t delete blindly).

6. Reopen Cursor only **after** pull finishes.

### For AI assistants (Claude / Cursor)

When a user pastes **`fatal: read-tree failed`** together with **`.cursor/rules` Permission denied**, the prescribed answer is: **close the IDE, use CMD at repo root, pull again**; do not suggest **`git rebase`** first on this repo on Windows; do not assume the user’s path is Desktop—use their actual clone path.
