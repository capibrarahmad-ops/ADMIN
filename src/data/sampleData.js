// Realistic initial sample data for Slate Admin Panel
// Designed to be easily connected to REST/GraphQL APIs in production

export const INITIAL_ADMIN_PROFILE = {
  id: "admin-001",
  name: "Alexandra Vance",
  title: "Principal Platform Administrator",
  email: "alexandra.vance@slateapp.io",
  avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=256&h=256&q=80",
  department: "Infrastructure & Security",
  role: "Super Admin",
  bio: "Overseeing Slate core infrastructure, user governance, enterprise permissions, and content distribution workflows.",
  phone: "+1 (555) 234-8901",
  location: "San Francisco, CA (PST)",
  timezone: "America/Los_Angeles",
  twoFactorEnabled: true,
  lastLogin: "Today, 09:42 AM from 192.168.1.45 (macOS Chrome)",
};

export const INITIAL_USERS = [
  {
    id: "usr-101",
    name: "Marcus Sterling",
    email: "marcus.sterling@apextech.com",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Admin",
    status: "Active",
    registrationDate: "2025-01-14",
    lastActive: "10 mins ago",
    department: "Engineering",
    documentsCount: 42,
    phone: "+1 (555) 345-6789"
  },
  {
    id: "usr-102",
    name: "Elena Rostova",
    email: "elena.rostova@designflow.co",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Editor",
    status: "Active",
    registrationDate: "2025-02-03",
    lastActive: "1 hour ago",
    department: "Content & Editorial",
    documentsCount: 128,
    phone: "+1 (555) 456-7890"
  },
  {
    id: "usr-103",
    name: "David Kim",
    email: "d.kim@synthetix.org",
    avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Contributor",
    status: "Active",
    registrationDate: "2025-02-18",
    lastActive: "3 hours ago",
    department: "Marketing",
    documentsCount: 19,
    phone: "+1 (555) 567-8901"
  },
  {
    id: "usr-104",
    name: "Amara Okonjo",
    email: "amara@globalventure.ng",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Moderator",
    status: "Active",
    registrationDate: "2025-03-01",
    lastActive: "25 mins ago",
    department: "Trust & Safety",
    documentsCount: 64,
    phone: "+234 802 345 6789"
  },
  {
    id: "usr-105",
    name: "Julian Hayes",
    email: "julian.h@novacrest.io",
    avatar: "https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Member",
    status: "Inactive",
    registrationDate: "2025-03-12",
    lastActive: "5 days ago",
    department: "Sales Operations",
    documentsCount: 8,
    phone: "+1 (555) 678-9012"
  },
  {
    id: "usr-106",
    name: "Sophia Martinez",
    email: "s.martinez@slatepartners.org",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Editor",
    status: "Active",
    registrationDate: "2025-04-05",
    lastActive: "Just now",
    department: "Product Management",
    documentsCount: 73,
    phone: "+1 (555) 789-0123"
  },
  {
    id: "usr-107",
    name: "Tariq Al-Mansoor",
    email: "tariq.mansoor@qatarfin.qa",
    avatar: "https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Member",
    status: "Suspended",
    registrationDate: "2025-04-20",
    lastActive: "2 weeks ago",
    department: "Finance",
    documentsCount: 2,
    phone: "+974 4412 3456"
  },
  {
    id: "usr-108",
    name: "Claire Dupont",
    email: "claire.dupont@lumina-paris.fr",
    avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Contributor",
    status: "Active",
    registrationDate: "2025-05-02",
    lastActive: "4 hours ago",
    department: "UX Research",
    documentsCount: 31,
    phone: "+33 1 42 68 55 00"
  },
  {
    id: "usr-109",
    name: "Liam O'Connor",
    email: "liam.oconnor@celticdata.ie",
    avatar: "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Member",
    status: "Pending",
    registrationDate: "2025-05-15",
    lastActive: "Never",
    department: "Data Science",
    documentsCount: 0,
    phone: "+353 1 496 0000"
  },
  {
    id: "usr-110",
    name: "Mei-Ling Zhou",
    email: "mei.zhou@harboranalytics.sg",
    avatar: "https://images.unsplash.com/photo-1517841905240-472988babdf9?auto=format&fit=crop&w=256&h=256&q=80",
    role: "Admin",
    status: "Active",
    registrationDate: "2025-05-28",
    lastActive: "15 mins ago",
    department: "Security",
    documentsCount: 89,
    phone: "+65 6789 0123"
  }
];

export const INITIAL_CONTENT = [
  {
    id: "cnt-201",
    title: "Mastering Slate 3.0: Enterprise Workspaces & Realtime Collaboration",
    category: "Guides",
    status: "Published",
    author: "Elena Rostova",
    views: 14250,
    likes: 842,
    createdAt: "2025-03-10",
    updatedAt: "2025-04-12",
    slug: "mastering-slate-3-workspaces",
    summary: "A comprehensive deep dive into setting up cross-functional team workspaces with fine-grained RBAC in Slate.",
    tags: ["Workspaces", "Collaboration", "Enterprise"]
  },
  {
    id: "cnt-202",
    title: "Quarterly Platform Security Audit: Q1 2025 Summary",
    category: "Security",
    status: "Published",
    author: "Alexandra Vance",
    views: 8930,
    likes: 410,
    createdAt: "2025-04-01",
    updatedAt: "2025-04-02",
    slug: "q1-2025-security-audit",
    summary: "SOC 2 Type II compliance renewal and pen-test mitigation report overview for Slate customers.",
    tags: ["Security", "Compliance", "SOC2"]
  },
  {
    id: "cnt-203",
    title: "Introducing Vector Search & Semantic Linking in Slate Docs",
    category: "Product Updates",
    status: "Draft",
    author: "Sophia Martinez",
    views: 0,
    likes: 0,
    createdAt: "2025-05-04",
    updatedAt: "2025-05-18",
    slug: "vector-search-semantic-linking",
    summary: "Preview of AI-powered document retrieval and automatic bidirectional entity relationships in Slate.",
    tags: ["AI", "Search", "Beta"]
  },
  {
    id: "cnt-204",
    title: "Best Practices for Slate API Webhooks and Automated Sync",
    category: "Engineering",
    status: "Published",
    author: "Marcus Sterling",
    views: 11200,
    likes: 673,
    createdAt: "2025-02-14",
    updatedAt: "2025-03-22",
    slug: "api-webhooks-automated-sync",
    summary: "Reliable webhook handling patterns with exponential backoff and idempotency keys in Slate API.",
    tags: ["API", "Webhooks", "Developers"]
  },
  {
    id: "cnt-205",
    title: "Slate Design System: Token Architecture & Fluid Typography",
    category: "Design",
    status: "Under Review",
    author: "Claire Dupont",
    views: 450,
    likes: 68,
    createdAt: "2025-05-10",
    updatedAt: "2025-05-16",
    slug: "slate-design-system-tokens",
    summary: "Documentation on Slate's scalable CSS variable architecture and accessibility compliance standards.",
    tags: ["Design System", "CSS", "UI"]
  },
  {
    id: "cnt-206",
    title: "Community Spotlight: How FinTech Leaders Scale Knowledge with Slate",
    category: "Community",
    status: "Published",
    author: "David Kim",
    views: 6780,
    likes: 312,
    createdAt: "2025-04-18",
    updatedAt: "2025-04-20",
    slug: "community-spotlight-fintech-leaders",
    summary: "Case study showcasing asynchronous team documentation across 14 timezones with zero data silos.",
    tags: ["Case Study", "Fintech", "Scale"]
  },
  {
    id: "cnt-207",
    title: "Migration Playbook: Seamless Import from Notion and Confluence",
    category: "Guides",
    status: "Scheduled",
    author: "Elena Rostova",
    views: 0,
    likes: 0,
    createdAt: "2025-05-12",
    updatedAt: "2025-05-14",
    slug: "migration-playbook-notion-confluence",
    summary: "One-click importer instructions to migrate hierarchical documents, inline databases, and permissions.",
    tags: ["Migration", "Import", "Guides"]
  }
];

export const INITIAL_REPORTS = [
  {
    id: "REP-4091",
    subject: "Suspected automated spam generation in Public Workspace #14",
    reportedItem: "Workspace: 'CryptoMoon Signals'",
    category: "Spam / Abuse",
    severity: "High",
    reporter: "Amara Okonjo",
    reporterEmail: "amara@globalventure.ng",
    date: "2025-05-19 11:24",
    status: "Pending",
    description: "Account created 500+ auto-generated link-spam documents within 10 minutes violating TOS section 4.2."
  },
  {
    id: "REP-4089",
    subject: "Excessive API rate limit spikes on Webhook Dispatcher",
    reportedItem: "Endpoint: /api/v1/webhooks/deliver",
    category: "Performance / System",
    severity: "Critical",
    reporter: "System Monitor (PagerDuty)",
    reporterEmail: "alerts@monitoring.slateapp.io",
    date: "2025-05-19 09:15",
    status: "Under Review",
    description: "P99 latency surged to 2400ms following high volume batch export from Tenant #882."
  },
  {
    id: "REP-4082",
    subject: "DMCA takedown notice for proprietary brand graphics",
    reportedItem: "Document: 'Competitor Asset Library'",
    category: "Copyright Infringement",
    severity: "Medium",
    reporter: "Legal Team (Vanguard IP)",
    reporterEmail: "compliance@vanguard-legal.com",
    date: "2025-05-18 16:40",
    status: "Pending",
    description: "User uploaded unlicensed corporate brand vectors into an unlisted Slate public collection."
  },
  {
    id: "REP-4075",
    subject: "Impersonation of Slate Executive Support account",
    reportedItem: "User: 'Slate_Billing_Help_Desk'",
    category: "Security Threat",
    severity: "Critical",
    reporter: "Marcus Sterling",
    reporterEmail: "marcus.sterling@apextech.com",
    date: "2025-05-17 14:12",
    status: "Resolved",
    description: "Account suspended, credentials invalidated, audit logs exported to Security Incident Folder."
  },
  {
    id: "REP-4061",
    subject: "Broken rendering on nested code blocks in dark mode",
    reportedItem: "Editor Component: CodeBlockRenderer",
    category: "Bug Report",
    severity: "Low",
    reporter: "Julian Hayes",
    reporterEmail: "julian.h@novacrest.io",
    date: "2025-05-16 10:05",
    status: "Resolved",
    description: "Syntax highlighter css overflow issue patched in v3.1.2 hotfix."
  },
  {
    id: "REP-4050",
    subject: "Duplicate billing charges reported by Team Tier subscriber",
    reportedItem: "Subscription #SUB-9021",
    category: "Billing",
    severity: "Medium",
    reporter: "Claire Dupont",
    reporterEmail: "claire.dupont@lumina-paris.fr",
    date: "2025-05-15 13:30",
    status: "Dismissed",
    description: "User was viewing pro-rated upgrade invoice rather than double charge. Clarified via customer support."
  }
];

export const INITIAL_NOTIFICATIONS = [
  {
    id: "notif-01",
    title: "Critical Security Advisory",
    message: "Mandatory rotation of production JWT signing keys scheduled for Sunday 02:00 UTC.",
    category: "Security",
    timestamp: "12 minutes ago",
    read: false,
    priority: "high"
  },
  {
    id: "notif-02",
    title: "New Enterprise Tenant Provisioned",
    message: "Acme Corp (500 seats) completed enterprise SAML SSO setup successfully.",
    category: "System",
    timestamp: "1 hour ago",
    read: false,
    priority: "normal"
  },
  {
    id: "notif-03",
    title: "Pending Abuse Report Escalated",
    message: "Report #REP-4091 flagged for immediate moderator review by Trust & Safety.",
    category: "Alert",
    timestamp: "3 hours ago",
    read: false,
    priority: "high"
  },
  {
    id: "notif-04",
    title: "Automated Daily Backup Complete",
    message: "PostgreSQL cluster snapshot verified: 48.2 GB archived to multi-region storage.",
    category: "System",
    timestamp: "6 hours ago",
    read: true,
    priority: "low"
  },
  {
    id: "notif-05",
    title: "New Editorial Article Published",
    message: "Elena Rostova published 'Mastering Slate 3.0: Enterprise Workspaces'.",
    category: "Content",
    timestamp: "Yesterday at 4:15 PM",
    read: true,
    priority: "normal"
  },
  {
    id: "notif-06",
    title: "Weekly Performance Digest Ready",
    message: "Average response time dropped by 18ms across all European edge clusters.",
    category: "System",
    timestamp: "2 days ago",
    read: true,
    priority: "low"
  }
];

export const INITIAL_RECENT_ACTIVITY = [
  {
    id: "act-1",
    user: "Alexandra Vance",
    avatar: "https://images.unsplash.com/photo-1534528741775-53994a69daeb?auto=format&fit=crop&w=128&h=128&q=80",
    action: "Updated enterprise firewall whitelist & API rate limits",
    time: "8 mins ago",
    badge: "Security",
    badgeType: "primary"
  },
  {
    id: "act-2",
    user: "Elena Rostova",
    avatar: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?auto=format&fit=crop&w=128&h=128&q=80",
    action: "Published article 'Mastering Slate 3.0: Enterprise Workspaces'",
    time: "35 mins ago",
    badge: "Content",
    badgeType: "success"
  },
  {
    id: "act-3",
    user: "Amara Okonjo",
    avatar: "https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?auto=format&fit=crop&w=128&h=128&q=80",
    action: "Flagged Report #REP-4091 (Spam / Abuse) for review",
    time: "2 hours ago",
    badge: "Moderation",
    badgeType: "warning"
  },
  {
    id: "act-4",
    user: "Marcus Sterling",
    avatar: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?auto=format&fit=crop&w=128&h=128&q=80",
    action: "Provisioned new database replication shard us-east-2b",
    time: "4 hours ago",
    badge: "Infrastructure",
    badgeType: "neutral"
  },
  {
    id: "act-5",
    user: "Sophia Martinez",
    avatar: "https://images.unsplash.com/photo-1580489944761-15a19d654956?auto=format&fit=crop&w=128&h=128&q=80",
    action: "Created draft 'Introducing Vector Search & Semantic Linking'",
    time: "6 hours ago",
    badge: "Content",
    badgeType: "info"
  }
];

export const INITIAL_SETTINGS = {
  general: {
    appName: "Slate",
    tagline: "Collaborative Knowledge & Enterprise Workspaces",
    supportEmail: "support@slateapp.io",
    organization: "Slate Technologies Inc.",
    timezone: "America/New_York (UTC-5)",
    defaultLanguage: "English (US)",
    maintenanceMode: false,
    allowPublicRegistrations: true
  },
  security: {
    enforce2FA: true,
    sessionTimeoutMinutes: 60,
    passwordMinLength: 12,
    requireSpecialChars: true,
    maxLoginAttempts: 5,
    ipWhitelistEnabled: false,
    auditLogging: true
  },
  notifications: {
    emailAlerts: true,
    systemDigestFrequency: "Daily",
    newUserAlert: true,
    securityIncidentAlert: true,
    slackWebhookSync: true,
    marketingUpdates: false
  },
  appearance: {
    theme: "Slate Navy",
    primaryAccent: "#2563eb",
    density: "comfortable",
    sidebarDefaultCollapsed: false,
    enableGlassmorphism: true
  }
};

export const ANALYTICS_DATA = {
  overview: {
    pageViews: { value: "3,842,910", change: "+18.4%", trend: "up" },
    uniqueVisitors: { value: "924,180", change: "+12.1%", trend: "up" },
    avgSessionDuration: { value: "6m 42s", change: "+9.5%", trend: "up" },
    bounceRate: { value: "24.8%", change: "-3.2%", trend: "down" },
    documentsCreated: { value: "48,920", change: "+28.7%", trend: "up" },
    sharesGenerated: { value: "114,350", change: "+15.9%", trend: "up" }
  },
  trafficSources: [
    { source: "Direct App Sessions", percentage: 48, visitors: "443,600", color: "#1e3a8a" },
    { source: "Organic Search", percentage: 28, visitors: "258,770", color: "#2563eb" },
    { source: "Team Referral Links", percentage: 16, visitors: "147,860", color: "#38bdf8" },
    { source: "Social & Community", percentage: 8, visitors: "73,950", color: "#94a3b8" }
  ],
  devices: [
    { device: "Desktop (macOS / Windows)", percentage: 68, color: "#1e3a8a" },
    { device: "Mobile (iOS / Android)", percentage: 24, color: "#2563eb" },
    { device: "Tablet & iPad", percentage: 8, color: "#60a5fa" }
  ],
  monthlyGrowth: [
    { month: "Dec", users: 14200, active: 11100, documents: 28000 },
    { month: "Jan", users: 16800, active: 13400, documents: 32400 },
    { month: "Feb", users: 18900, active: 15200, documents: 37900 },
    { month: "Mar", users: 21400, active: 16900, documents: 41200 },
    { month: "Apr", users: 23100, active: 17800, documents: 45600 },
    { month: "May", users: 24582, active: 18290, documents: 48920 }
  ],
  weeklyActivity: [
    { day: "Mon", activeUsers: 14200, edits: 8900, shares: 3200 },
    { day: "Tue", activeUsers: 16800, edits: 11200, shares: 4100 },
    { day: "Wed", activeUsers: 18100, edits: 12400, shares: 4800 },
    { day: "Thu", activeUsers: 17900, edits: 11800, shares: 4400 },
    { day: "Fri", activeUsers: 16400, edits: 10500, shares: 3900 },
    { day: "Sat", activeUsers: 8200, edits: 4100, shares: 1600 },
    { day: "Sun", activeUsers: 9400, edits: 4900, shares: 1900 }
  ]
};
