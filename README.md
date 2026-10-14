# Slate Admin Panel

A modern, professional, responsive SaaS administrative dashboard and governance console built for **Slate** using React, Vite, React Router DOM, Lucide React, and pure CSS.

---

## 🎨 Visual Design & Theme
- **Color Palette**: Professional deep navy-blue (`#0f172a`, `#1e293b`), crisp white (`#ffffff`), subtle canvas gray (`#f8fafc`), and royal sapphire accents (`#2563eb`).
- **Typography**: Google Fonts [Plus Jakarta Sans](https://fonts.google.com/specimen/Plus+Jakarta+Sans) for sleek UI metrics and typography, [JetBrains Mono](https://fonts.google.com/specimen/JetBrains+Mono) for slugs and identifiers.
- **Collapsible Sidebar**: Smooth desktop collapse toggle (`260px` to `76px`) with tooltips, active route indicator pill, and live badge counts.
- **Universal Header**: Search input with keyboard shortcut (`⌘K` / `Ctrl+K`), breadcrumb navigation, and admin profile dropdown menu.

---

## 🚀 Sidebar Navigation & Routes

The left sidebar navigation includes:
1. **Dashboard** (`/admin`) — KPI stat cards, user growth trajectory, and activity feed.
2. **Users** (`/admin/users`) — User directory, search, role filters, and account controls.
3. **Content Management** (`/admin/content`) — Articles, guides, and documentation publication.
4. **Analytics** (`/admin/analytics`) — Telemetry, traffic sources, and feature adoption.
5. **Settings** (`/admin/settings`) — General preferences, security, notifications, and appearance.
6. **Admin Profile** (`/admin/profile`) — Administrator credentials and active session management.
7. **Logout** — Session termination with confirmation dialog.

---

## 🛠️ Project Structure

```
d:/admin/
├── src/
│   ├── components/
│   │   ├── common/
│   │   │   ├── Badge.jsx             # Color-coded status and role badges
│   │   │   ├── ConfirmDialog.jsx     # Reusable destructive confirmation modal
│   │   │   ├── EmptyState.jsx        # Illustrated empty states for zero results
│   │   │   ├── Modal.jsx             # Accessible backdrop & dialog component
│   │   │   └── Pagination.jsx        # Dynamic table pagination controller
│   │   ├── layout/
│   │   │   ├── Header.jsx            # Top bar with search, notifications & profile
│   │   │   └── Sidebar.jsx           # Collapsible navigation with badge counters
│   │   ├── dashboard/
│   │   │   ├── ActivityChart.jsx     # Weekly engagement bar chart
│   │   │   ├── GrowthChart.jsx       # Interactive SVG line/area user growth chart
│   │   │   ├── RecentActivityFeed.jsx# Real-time administrative audit feed
│   │   │   ├── RecentUsersTable.jsx  # New registrations table preview
│   │   │   └── StatCard.jsx          # KPI card with trend comparison badges
│   │   ├── users/
│   │   │   ├── UserDetailsModal.jsx  # Full user profile & security metadata
│   │   │   ├── UserFormModal.jsx     # Provision & edit user accounts
│   │   │   └── UserTable.jsx         # Searchable, filterable, paginated user table
│   │   ├── content/
│   │   │   ├── ContentFormModal.jsx  # Document editor modal with auto-slug
│   │   │   └── ContentTable.jsx      # Content management table with quick publish
│   │   ├── analytics/
│   │   │   ├── DeviceBreakdown.jsx   # Client device share
│   │   │   └── TrafficSourcesBreakdown.jsx # Traffic ingress attribution
│   │   ├── reports/
│   │   │   ├── ExportModal.jsx       # CSV / PDF audit report exporter
│   │   │   ├── ReportDetailsModal.jsx# Incident triage modal
│   │   │   └── ReportTable.jsx       # Abuse & system reports table
│   │   └── notifications/
│   │       └── ComposeNotificationModal.jsx # Admin broadcast composer
│   ├── context/
│   │   ├── AdminContext.jsx          # Centralized reactive state & localStorage sync
│   │   └── ToastContext.jsx          # Global interactive notification toast alerts
│   ├── data/
│   │   └── sampleData.js             # Realistic Slate data models
│   ├── layouts/
│   │   └── AdminLayout.jsx           # Shared shell wrapping Sidebar, Header & Outlet
│   ├── pages/
│   │   ├── AdminDashboard.jsx
│   │   ├── Users.jsx
│   │   ├── ContentManagement.jsx
│   │   ├── Analytics.jsx
│   │   ├── Reports.jsx
│   │   ├── Notifications.jsx
│   │   ├── Settings.jsx
│   │   ├── AdminProfile.jsx
│   │   └── NotFound.jsx
│   ├── styles/
│   │   └── admin.css                 # Navy-blue and white design system
│   ├── App.jsx                       # React Router configuration
│   ├── index.css                     # Root layout setup
│   └── main.jsx                      # Application entry point
├── index.html                        # Fonts & viewport setup
├── package.json
└── vite.config.js
```

---

## 🔒 Security & Backend Integration Points

The application is structured to decouple frontend UI presentation from backend services. To transition from local sample data to production API services:

1. **Authentication & Session Management**:
   - Replace demo session state with an `AuthProvider` managing JWT access tokens stored in `httpOnly` secure cookies.
   - Configure Axios or Fetch interceptors to attach `Authorization: Bearer <token>` on all requests.

2. **Backend API Endpoints Mapping**:
   - `GET /api/v1/users` & `POST /api/v1/users` (in `src/context/AdminContext.jsx` -> `addUser`, `updateUser`, `deleteUser`)
   - `GET /api/v1/content` & `PATCH /api/v1/content/:id/status` (in `addContent`, `updateContent`)
   - `GET /api/v1/reports` & `PATCH /api/v1/reports/:id/triage`
   - `POST /api/v1/notifications/broadcast`
   - `GET /api/v1/analytics/telemetry?range=30d`

3. **Role-Based Access Control (RBAC)**:
   - Enforce permission checks server-side for all mutation operations (`DELETE`, `PATCH`, `POST`).
   - Guard routes using `<ProtectedRoute requiredRole="Admin" />`.

---

## 💻 Running the Application

To run the application locally:

```bash
# 1. Install dependencies (already installed)
npm install

# 2. Start Vite development server
npm run dev

# 3. Build production bundle
npm run build

# 4. Preview production build
npm run preview
```

Open [http://localhost:5173/admin](http://localhost:5173/admin) in your browser.
