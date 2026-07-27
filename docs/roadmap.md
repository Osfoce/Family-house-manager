# Development Roadmap

This roadmap outlines the exact weekly deliverables for the Church Family House Management System. We are building this iteratively to ensure a stable, working product is delivered as early as possible. 

---

## Phase 1: The Foundation (Weeks 1–2)
**Goal:** Establish the core database and authentication, moving the "Excel Sheet" into a structured web app.

### Week 1: Project Foundation & Authentication
- [ ] **Setup:** Finalize Docker configuration for development (PostgreSQL + Node.js).
- [ ] **Boilerplate:** Ensure React (Vite) + Express (TypeScript) are communicating perfectly.
- [ ] **Prisma Schema (MVP):** Define the initial `User`, `Role`, `Member`, and `Payment` models.
- [ ] **Authentication:** Implement secure JWT-based authentication (Login/Signup) with password hashing.
- [ ] **Role-Based Access Control:** Seed the database with three roles (`SUPER_ADMIN`, `TREASURER`, `MEMBER`) and enforce view restrictions on the frontend routes.
**Note**: Admin handles user registration and the system generates user login details

### Week 2: Member & Payment CRUD
- [ ] **Member Dashboard UI:** Build the main layout using Shadcn UI (Sidebar, Header, Main content area).
- [ ] **Member Management:** Build the full CRUD interface for Members (Add, Edit, Delete, List). Include fields: Name, Phone, Room, Gender, Status (Active/Inactive), Join Date.
- [ ] **Manual Payment Logging:** Build the Treasurer's view to manually log a payment for a specific Member (select Member, choose Month/Year, input amount).
- [ ] **Payment History:** Display a table on the Member's profile showing their past payment records.

---

## Phase 2: The "Fair Roster" Engine (Weeks 3–4)
**Goal:** Eliminate manual schedule writing by building the algorithmic assignment engine.

### Week 3: Roster Algorithm (Backend)
- [ ] **Prisma Schema Update:** Add `Schedule` and `ScheduleAssignment` models linked to Members.
- [ ] **The Round-Robin Service:** Write a backend service function that:
  - Fetches all **Active** members.
  - Analyzes *last month's* assignments to track service frequency.
  - Generates a new monthly roster ensuring no Member is assigned more than once per day and that duties are distributed evenly.
- [ ] **Conflict Resolution:** Implement a hard check that prevents the system from assigning a single Member to both "Cooking" and "Worship" on the same date.

### Week 4: Roster UI & Interaction
- [ ] **Roster Viewer:** Build a visual "Monthly Calendar" table (Duty Type x Days of the Week) to display the generated roster beautifully.
- [ ] **Manual Override:** Implement drag-and-drop or dropdown selectors to allow the House Leader to manually swap two people on the roster (this is a critical MVP feature).
- [ ] **PDF Export:** Add a "Download Roster as PDF" button using `pdfkit` or `puppeteer` so it can be printed or saved.

---

## Phase 3: The "Killer Feature" (Weeks 5–6)
**Goal:** Integrate with WhatsApp to automate all repetitive communication.

### Week 5: Receipts & WhatsApp Onboarding
- [ ] **Digital Receipt Generation:** Build a service that takes a `Payment` record and renders a professional PDF receipt (using `react-pdf` or `puppeteer`).
- [ ] **WhatsApp Cloud API Setup:** Register the phone number with Meta's WhatsApp Business API. Set up the webhook verification and obtain the permanent access token.
- [ ] **Send Text API:** Write a reusable `sendWhatsAppMessage(phone, text)` function.
- [ ] **Auto Payment Confirmation:** Trigger a WhatsApp message to the House WhatsApp Group whenever the Treasurer logs a payment: *"✅ Payment received from [Member Name] for [Month]."*

### Week 6: Automated Workflows & Reminders
- [ ] **node-cron Scheduler:** Set up scheduled jobs.
- [ ] **Dues Reminder Cron:** Schedule a job for the 25th of every month to fetch all Members with pending payments for that month and send them a personalized text reminder via WhatsApp.
- [ ] **Roster Broadcast:** Add a button on the Roster Viewer page labeled "Publish to WhatsApp". When clicked, the system generates the Roster PNG/PDF, uploads it to Cloudinary, and posts the public URL to the group with a caption.
- [ ] **Announcements Module:** Build a simple text box for the Admin to create an announcement and instantly broadcast it to all Members' WhatsApp contacts.

---

## Phase 4: Analytics & Insights (Weeks 7–8)
**Goal:** Make the data actionable for the House Leader and Treasurer.

### Week 7: Executive Dashboard & Expense Tracking
- [ ] **Admin Dashboard:** Build the home page widgets showing:
  - Total Active Members count.
  - Outstanding Subscriptions (Total sum due).
  - Today's Duty Roster (Who is cooking/worshipping today).
  - Recent 5 payment logs.
- [ ] **Expense Tracker:** Add an `Expenses` table. Allow the Treasurer to log expenses (Gas refill, Water, Electricity, Repairs) with attached receipts.
- [ ] **Income vs Expense Overview:** On the dashboard, compare total subscription income for the month vs total expenses.

### Week 8: Reporting & Deployment
- [ ] **Advanced Reports:** Build a "Reports" section where admins can generate:
  - Monthly Payment Report (Aggregated by member).
  - Service Participation Report (Who served how many times).
- [ ] **Excel Export:** Integrate `exceljs` to allow download of all reports as `.xlsx` files.
- [ ] **Testing & Debugging:** Perform thorough end-to-end testing on all core workflows. Fix edge cases (e.g., what if a member is inactive when the roster is generated?).
- [ ] **MVP Deployment:** Deploy the application to a VPS (DigitalOcean/Linode) or a PaaS (Render/Railway) with the production PostgreSQL database.

---

## Future Milestones (Post-MVP / Phase 5)
*To be implemented after the core system is stable and gathering user feedback.*

- **Multi-House Support:** Add a `House` table to separate members, rosters, and finances by different physical houses.
- **Attendance:** QR Code check-in for house meetings and Sunday services.
- **Inventory Management:** Track supplies (Rice, Gas, Cleaning materials) with low-stock alerts.
- **Visitor Management:** Log temporary guests staying at the house.
- **Native Mobile App:** Wrap the system in React Native or Flutter for deeper device integration.
- **Digital Notice Board:** A dedicated home screen for "Today's Schedule" so members don't have to open WhatsApp to see who is leading.