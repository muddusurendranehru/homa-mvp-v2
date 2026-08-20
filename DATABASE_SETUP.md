# 🗄️ Database Setup - HOMA Health MVP

## Neon PostgreSQL Configuration

### Connection Details

- **Database:** `drmuddusmvp1`
- **Project:** proud-sunset-82737074
- **Branch:** br-blue-wildflower-ahnf9ofw
- **Console URL:** [Neon Dashboard](https://console.neon.tech/app/projects/proud-sunset-82737074?branchId=br-blue-wildflower-ahnf9ofw&database=drmuddusmvp1)

### Environment Setup

1. The `.env.local` file contains your database connection string
2. **Never commit `.env.local` to git** - it contains sensitive credentials
3. For team members, copy `.env.example` to `.env.local` and add actual credentials

### Database Schema

#### Core Tables

```sql
-- Users table
CREATE TABLE users (
  id SERIAL PRIMARY KEY,
  full_name VARCHAR(255) NOT NULL,
  email VARCHAR(255) UNIQUE NOT NULL,
  password_hash VARCHAR(255) NOT NULL,
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Patient Assessments table
CREATE TABLE patient_assessments (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  
  -- Biomarkers
  fasting_glucose DECIMAL(5,2),
  fasting_insulin DECIMAL(5,2),
  homa_ir DECIMAL(5,2), -- Calculated
  triglycerides DECIMAL(6,2),
  hdl DECIMAL(5,2),
  tyg_index DECIMAL(5,2), -- Calculated
  hba1c DECIMAL(4,2),
  waist_circumference DECIMAL(5,2),
  
  -- Additional metrics
  weight DECIMAL(5,2),
  height DECIMAL(5,2),
  blood_pressure_systolic INTEGER,
  blood_pressure_diastolic INTEGER,
  
  -- Medications
  current_medications TEXT,
  supplements TEXT,
  
  created_at TIMESTAMP DEFAULT NOW(),
  updated_at TIMESTAMP DEFAULT NOW()
);

-- Daily Habits Tracker
CREATE TABLE daily_habits (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  date DATE NOT NULL,
  
  -- 4 core habits
  calories_consumed INTEGER, -- Target: 1800-2000
  sleep_hours DECIMAL(3,1), -- Target: 7-8h
  steps_count INTEGER, -- Target: 10,000
  medicines_taken BOOLEAN, -- Target: Yes
  
  created_at TIMESTAMP DEFAULT NOW(),
  UNIQUE(user_id, date)
);

-- Progress Tracking
CREATE TABLE progress_snapshots (
  id SERIAL PRIMARY KEY,
  user_id INTEGER REFERENCES users(id) ON DELETE CASCADE,
  assessment_id INTEGER REFERENCES patient_assessments(id),
  day_number INTEGER, -- Day 0, 30, 60, 90
  
  homa_ir DECIMAL(5,2),
  tyg_index DECIMAL(5,2),
  waist_circumference DECIMAL(5,2),
  hba1c DECIMAL(4,2),
  
  notes TEXT,
  created_at TIMESTAMP DEFAULT NOW()
);
```

### Quick Access

- **Connection String Format:** `postgresql://[user]:[password]@[host]/[database]?sslmode=require`
- **Pooler:** Uses connection pooling for better performance
- **Region:** US East 1 (AWS)
- **SSL:** Required for security

### Development Workflow

1. Use [Drizzle ORM](https://orm.drizzle.team/) or [Prisma](https://www.prisma.io/) for type-safe database queries
2. Run migrations when schema changes
3. Test locally before deploying
4. Monitor database in [Neon Console](https://console.neon.tech/app/projects/proud-sunset-82737074)

