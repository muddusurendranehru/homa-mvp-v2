/**
 * Citation and NAP (Name, Address, Phone) Monitoring Utility
 * 
 * This script helps track and verify NAP consistency across local directories
 * and citation sources for SEO and local search optimization.
 * 
 * Usage:
 * - Run: npx tsx scripts/monitor-citations.ts
 * - Or compile: npx tsc scripts/monitor-citations.ts && node scripts/monitor-citations.js
 */

// ============================================================================
// 1. CANONICAL NAP DATA
// ============================================================================

export interface ClinicNAP {
  name: string;
  nameVariations: string[];
  address: string;
  addressLine1: string;
  addressLine2: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phone: string;
  phoneFormats: string[];
  website: string;
  categories: string[];
}

export const canonicalNAP: ClinicNAP = {
  // Primary Name (Most authoritative)
  name: "Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli",
  
  // Acceptable Name Variations (for verification)
  nameVariations: [
    "Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli",
    "Dr. Muddu Surendra Nehru, MD – Best Diabetologist in Gachibowli, Hyderabad",
    "Dr. Muddu Surendra Nehru M.D.",
    "Dr. Muddu Surendra Nehru MD",
    "HOMA Clinic - Dr. Muddu Surendra Nehru MD",
    "HOMA Healthcare Center",
    "Diabetes Reversal Center Health care center Gachibowli"
  ],
  
  // Address (Canonical)
  address: "Plot No. 140, Gachibowli Road, beside Mehfill Restaurant, Rajiv Gandhi Nagar, Gachibowli, Hyderabad, Telangana 500032",
  
  // Address Components (for partial matching)
  addressLine1: "Plot No. 140, Gachibowli Road",
  addressLine2: "beside Mehfill Restaurant, Rajiv Gandhi Nagar",
  city: "Gachibowli",
  state: "Telangana",
  postalCode: "500032",
  country: "India",
  
  // Phone (Canonical)
  phone: "+919963721999",
  
  // Acceptable Phone Formats
  phoneFormats: [
    "+919963721999",
    "919963721999",
    "09963721999",
    "(09963721999)",
    "09963 721999",
    "09963-721999"
  ],
  
  // Website URL
  website: "https://dr-muddus-mvp-miracle-value-proposition-2l36.onrender.com",
  
  // Categories (Must include)
  categories: [
    "Diabetologist",
    "Endocrinologist",
    "Medical Clinic",
    "Metabolic Health Center",
    "Diabetes Reversal Center",
    "Cardiologist",
    "General Physician",
    "Professor of Medicine"
  ]
};

// ============================================================================
// 2. KEY LOCAL DIRECTORIES
// ============================================================================

export interface Directory {
  name: string;
  url: string;
  profileUrl?: string;
  editUrl?: string;
  priority: 'high' | 'medium' | 'low';
  notes: string;
}

export const localDirectories: Directory[] = [
  {
    name: "JustDial",
    url: "https://www.justdial.com/Hyderabad/HOMA-Health-Care-Center",
    profileUrl: "https://www.justdial.com/Hyderabad/HOMA-Health-Care-Center",
    priority: "high",
    notes: "Primary local directory in India. Update NAP immediately if changes detected."
  },
  {
    name: "Practo",
    url: "https://www.practo.com/hyderabad/clinic/homa-health-care-center-gachibowli",
    profileUrl: "https://www.practo.com/hyderabad/clinic/homa-health-care-center-gachibowli",
    priority: "high",
    notes: "Major healthcare directory. High patient traffic source."
  },
  {
    name: "Google Business Profile",
    url: "https://g.page/dr-muddu-surendra-nehrumd",
    profileUrl: "https://www.google.com/maps/place/Diabetes+Reversal+Center+Health+care+center+Gachibowli",
    editUrl: "https://business.google.com",
    priority: "high",
    notes: "CRITICAL: Most important for local SEO. Verify weekly. Update photos, posts, reviews."
  },
  {
    name: "Facebook",
    url: "https://www.facebook.com/homahealthcarecenter",
    profileUrl: "https://www.facebook.com/homahealthcarecenter",
    editUrl: "https://www.facebook.com/pages/manage",
    priority: "high",
    notes: "Social presence important for trust. Link to website in About section."
  },
  {
    name: "LinkedIn",
    url: "https://www.linkedin.com/company/homa-healthcare-center",
    profileUrl: "https://www.linkedin.com/company/homa-healthcare-center",
    priority: "medium",
    notes: "Professional network. Add doctor credentials and clinic address."
  },
  {
    name: "IndiaMART",
    url: "https://www.indiamart.com/homa-healthcare-center-hyderabad",
    profileUrl: "https://www.indiamart.com/homa-healthcare-center-hyderabad",
    priority: "medium",
    notes: "B2B directory. Include categories: Medical Services, Healthcare."
  },
  {
    name: "Sulekha",
    url: "https://www.sulekha.com/homa-health-care-center-hyderabad",
    profileUrl: "https://www.sulekha.com/homa-health-care-center-hyderabad",
    priority: "medium",
    notes: "Indian local business directory. Add all services offered."
  },
  {
    name: "Lybrate",
    url: "https://www.lybrate.com/hyderabad/doctor/dr-muddu-surendra-nehru-diabetologist",
    profileUrl: "https://www.lybrate.com/hyderabad/doctor/dr-muddu-surendra-nehru-diabetologist",
    priority: "medium",
    notes: "Online doctor consultation platform. Update availability, specialization."
  },
  {
    name: "99acres",
    url: "https://www.99acres.com",
    priority: "low",
    notes: "Real estate directory - verify if clinic listing exists"
  },
  {
    name: "KiviDoctor",
    url: "https://kividoctor.com/clinics/homa-health-care-center-hyderabad",
    profileUrl: "https://kividoctor.com/clinics/homa-health-care-center-hyderabad",
    priority: "medium",
    notes: "Healthcare directory. Add clinic photos and doctor credentials."
  },
  {
    name: "Medifee",
    url: "https://www.medifee.com",
    priority: "low",
    notes: "Medical cost comparison - create listing if not present"
  },
  {
    name: "Curefit",
    url: "https://www.cure.fit",
    priority: "low",
    notes: "Wellness platform - partner listing opportunity"
  }
];

// ============================================================================
// 3. VERIFICATION CHECKLIST
// ============================================================================

interface VerificationChecklist {
  directory: string;
  checks: {
    name: boolean;
    address: boolean;
    phone: boolean;
    website: boolean;
    categories: boolean;
  };
  notes?: string;
  lastVerified?: string;
  nextVerificationDue?: string;
}

function generateVerificationChecklist(): VerificationChecklist[] {
  return localDirectories.map(directory => ({
    directory: directory.name,
    checks: {
      name: false, // [ ] Name matches exactly
      address: false, // [ ] Address matches exactly (including "Gachibowli")
      phone: false, // [ ] Phone is "(09963721999)" or "+919963721999"
      website: false, // [ ] Website URL is correct
      categories: false // [ ] Category includes "Diabetologist" and "Medical Clinic"
    },
    notes: directory.notes,
    lastVerified: undefined,
    nextVerificationDue: undefined
  }));
}

// ============================================================================
// 4. CSV GENERATION FOR CITATION SOURCES
// ============================================================================

export interface CitationSource {
  directory: string;
  url: string;
  priority: string;
  name: string;
  address: string;
  phone: string;
  website: string;
  categories: string;
  status: 'active' | 'pending' | 'needs_update' | 'not_listed';
  lastChecked: string;
  notes: string;
}

function generateCitationSourcesCSV(): string {
  const headers = [
    "Directory",
    "URL",
    "Priority",
    "Name",
    "Address",
    "Phone",
    "Website",
    "Categories",
    "Status",
    "Last Checked",
    "Notes"
  ];

  const rows = localDirectories.map(directory => {
    const citation: CitationSource = {
      directory: directory.name,
      url: directory.url,
      priority: directory.priority.toUpperCase(),
      name: canonicalNAP.name,
      address: canonicalNAP.address,
      phone: canonicalNAP.phone,
      website: canonicalNAP.website,
      categories: canonicalNAP.categories.join(", "),
      status: 'pending',
      lastChecked: new Date().toISOString().split('T')[0],
      notes: directory.notes
    };

    return [
      citation.directory,
      citation.url,
      citation.priority,
      `"${citation.name}"`,
      `"${citation.address}"`,
      citation.phone,
      citation.website,
      `"${citation.categories}"`,
      citation.status,
      citation.lastChecked,
      `"${citation.notes}"`
    ].join(",");
  });

  return [headers.join(","), ...rows].join("\n");
}

// ============================================================================
// 5. PRINT REPORTS
// ============================================================================

function printNAPReport(): void {
  console.log("\n" + "=".repeat(80));
  console.log("📍 CANONICAL NAP (Name, Address, Phone) - HOMA Clinic");
  console.log("=".repeat(80));
  
  console.log("\n✅ NAME (Canonical):");
  console.log(`   ${canonicalNAP.name}`);
  
  console.log("\n✅ ADDRESS (Canonical):");
  console.log(`   ${canonicalNAP.address}`);
  
  console.log("\n✅ PHONE (Canonical):");
  console.log(`   ${canonicalNAP.phone}`);
  console.log("   Acceptable Formats:", canonicalNAP.phoneFormats.join(", "));
  
  console.log("\n✅ WEBSITE:");
  console.log(`   ${canonicalNAP.website}`);
  
  console.log("\n✅ CATEGORIES (Must Include):");
  canonicalNAP.categories.forEach(cat => console.log(`   • ${cat}`));
  
  console.log("\n" + "=".repeat(80));
}

function printDirectoryList(): void {
  console.log("\n" + "=".repeat(80));
  console.log("📋 KEY LOCAL DIRECTORIES FOR NAP VERIFICATION");
  console.log("=".repeat(80));
  
  const highPriority = localDirectories.filter(d => d.priority === 'high');
  const mediumPriority = localDirectories.filter(d => d.priority === 'medium');
  const lowPriority = localDirectories.filter(d => d.priority === 'low');
  
  console.log("\n🔴 HIGH PRIORITY (Verify Weekly):");
  highPriority.forEach(dir => {
    console.log(`   [ ] ${dir.name}`);
    console.log(`       URL: ${dir.url}`);
    console.log(`       Notes: ${dir.notes}\n`);
  });
  
  console.log("\n🟡 MEDIUM PRIORITY (Verify Monthly):");
  mediumPriority.forEach(dir => {
    console.log(`   [ ] ${dir.name}`);
    console.log(`       URL: ${dir.url}`);
    console.log(`       Notes: ${dir.notes}\n`);
  });
  
  console.log("\n🟢 LOW PRIORITY (Verify Quarterly):");
  lowPriority.forEach(dir => {
    console.log(`   [ ] ${dir.name}`);
    console.log(`       URL: ${dir.url}`);
    console.log(`       Notes: ${dir.notes}\n`);
  });
  
  console.log("=".repeat(80));
}

function printVerificationChecklist(): void {
  console.log("\n" + "=".repeat(80));
  console.log("✅ NAP VERIFICATION CHECKLIST");
  console.log("=".repeat(80));
  console.log("\nFor EACH directory, verify:\n");
  
  const checklist = generateVerificationChecklist();
  checklist.forEach((item, index) => {
    console.log(`${index + 1}. ${item.directory}`);
    console.log(`   [ ] Name matches exactly: "${canonicalNAP.name}"`);
    console.log(`   [ ] Address matches exactly (including "Gachibowli")`);
    console.log(`   [ ] Phone is "(09963721999)" or "+919963721999"`);
    console.log(`   [ ] Website URL is correct: ${canonicalNAP.website}`);
    console.log(`   [ ] Category includes "Diabetologist" and "Medical Clinic"`);
    if (item.notes) {
      console.log(`   📝 Notes: ${item.notes}`);
    }
    console.log("");
  });
  
  console.log("=".repeat(80));
}

function printCSVReport(): void {
  console.log("\n" + "=".repeat(80));
  console.log("📊 CITATION SOURCES CSV (For Outreach)");
  console.log("=".repeat(80));
  console.log("\nCopy this CSV to Excel/Google Sheets for tracking:\n");
  console.log(generateCitationSourcesCSV());
  console.log("\n" + "=".repeat(80));
}

// ============================================================================
// 6. MAIN EXECUTION
// ============================================================================

function runCitationMonitor(): void {
  console.log("\n🩺 HOMA CLINIC - NAP & Citation Monitoring Tool");
  console.log("=" .repeat(80));
  
  printNAPReport();
  printDirectoryList();
  printVerificationChecklist();
  printCSVReport();
  
  console.log("\n✅ Report Generated Successfully!");
  console.log("\n📝 Next Steps:");
  console.log("   1. Save CSV output to 'citation-sources.csv'");
  console.log("   2. Manually verify each directory using the checklist");
  console.log("   3. Update any incorrect NAP information");
  console.log("   4. Schedule monthly verification reminders");
  console.log("   5. Submit updated listings to Google Business Profile\n");
}

// ============================================================================
// 7. EXPORT FOR USE IN OTHER SCRIPTS
// ============================================================================

// All exports are already defined above where they're declared:
// - Interfaces: export interface (already exported)
// - Functions: export function (already exported)  
// - Constants: export const (already exported)
// No additional exports needed - can be imported directly:
// import { runCitationMonitor, canonicalNAP, localDirectories } from '@/scripts/monitor-citations';

// Run the monitor if this script is executed directly
// Usage: npm run monitor-citations
// Or: npx tsx scripts/monitor-citations.ts
// Or: npx ts-node scripts/monitor-citations.ts

// Execute immediately when run as a script
// This avoids hanging issues by running directly instead of checking require.main
// Usage: npm run monitor-citations
// Or: npx tsx scripts/monitor-citations.ts

// Execute when run as a script (not when imported)
// Check if script is being run directly (via tsx, ts-node, or node)
if (typeof process !== 'undefined' && process.argv && process.argv.length > 0) {
  // Check if any argument contains the script name
  // Works with: tsx, ts-node, or direct node execution
  const scriptNameInArgs = process.argv.some(arg => 
    typeof arg === 'string' && (
      arg.includes('monitor-citations.ts') ||
      arg.includes('monitor-citations.js') ||
      arg.includes('monitor-citations')
    )
  );
  
  // Also check if we're in a script execution context (not imported module)
  const isModuleImport = process.argv[1]?.includes('.next') || 
                         process.argv[1]?.includes('node_modules') ||
                         process.argv[1]?.includes('next-server');
  
  if (scriptNameInArgs && !isModuleImport) {
    runCitationMonitor();
    // Exit immediately to prevent hanging
    process.exit(0);
  }
}

