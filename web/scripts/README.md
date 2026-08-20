# Citation & NAP Monitoring Scripts

## 📋 monitor-citations.ts

A utility script for tracking and verifying NAP (Name, Address, Phone) consistency across local directories and citation sources.

### Features

1. **Canonical NAP Definition**: Defines the clinic's authoritative NAP data
2. **Local Directory Tracking**: Lists key directories where NAP should be consistent
3. **Verification Checklist**: Generates a manual verification checklist for each directory
4. **CSV Export**: Generates a CSV file for citation source outreach tracking

### Usage

#### Option 1: Using npm script (Recommended)

```bash
cd web
npm run monitor-citations
```

#### Option 2: Using tsx directly

```bash
cd web
npx tsx scripts/monitor-citations.ts
```

#### Option 3: Using ts-node

```bash
cd web
npx ts-node scripts/monitor-citations.ts
```

#### Option 4: Import and use programmatically

```typescript
import { runCitationMonitor, generateCitationSourcesCSV } from '@/scripts/monitor-citations';

// Run full report
runCitationMonitor();

// Generate CSV only
const csv = generateCitationSourcesCSV();
console.log(csv);
```

### Output

The script generates:

1. **NAP Report**: Displays canonical Name, Address, Phone, Website, and Categories
2. **Directory List**: Lists all local directories with priority levels
3. **Verification Checklist**: Manual checklist for verifying each directory
4. **CSV Export**: Citation sources ready for import into Excel/Google Sheets

### Canonical NAP Data

- **Name**: "Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli"
- **Address**: "Plot No. 140, Gachibowli Road, beside Mehfill Restaurant, Rajiv Gandhi Nagar, Gachibowli, Hyderabad, Telangana 500032"
- **Phone**: "+919963721999" (Acceptable: 09963721999, (09963721999))
- **Website**: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com"
- **Categories**: Diabetologist, Endocrinologist, Medical Clinic, Metabolic Health Center, etc.

### Key Directories Tracked

**High Priority** (Verify Weekly):
- JustDial
- Practo
- Google Business Profile
- Facebook

**Medium Priority** (Verify Monthly):
- LinkedIn
- IndiaMART
- Sulekha
- Lybrate
- KiviDoctor

**Low Priority** (Verify Quarterly):
- 99acres
- Medifee
- Curefit

### Verification Checklist Items

For each directory, verify:
- [ ] Name matches exactly
- [ ] Address matches exactly (including "Gachibowli")
- [ ] Phone is "(09963721999)" or "+919963721999"
- [ ] Website URL is correct
- [ ] Category includes "Diabetologist" and "Medical Clinic"

### CSV Output Format

The CSV includes columns:
- Directory
- URL
- Priority
- Name
- Address
- Phone
- Website
- Categories
- Status
- Last Checked
- Notes

### Notes

- This is a **static monitoring template** - it does NOT connect to live APIs
- All verification must be done manually by visiting each directory
- Use the CSV output to track verification progress in Excel/Google Sheets
- Update the script's canonical NAP data if clinic information changes

### Future Enhancements

Potential additions (not implemented):
- Automated API checks (if directories provide APIs)
- Web scraping for NAP verification (with rate limiting)
- Automated discrepancy detection
- Email alerts for NAP inconsistencies
- Integration with local SEO tools

