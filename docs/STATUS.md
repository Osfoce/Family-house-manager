# Project Status

This document tracks the current state of the Family House Manager project, including completed work and upcoming tasks.

---

## Infrastructure & Tooling

| Task | Status |
|------|--------|
| pnpm Workspace | ✅ Complete |
| React + Vite (Frontend) | ✅ Complete |
| Express (Backend) | ✅ Complete |
| TypeScript | ✅ Complete |
| Root Scripts | ✅ Complete |
| Concurrent Development | ✅ Complete |
| Prisma ORM | ✅ Complete |
| Supabase PostgreSQL | ✅ Complete |
| Prisma connected to Supabase | ✅ Complete |
| First migration run | ✅ Complete |
| Prisma Client generated | ✅ Complete |

---

## Database Schema

| Table / Model | Status |
|---------------|--------|
| `User` | ✅ Created |
| `MedicalInformation` | ✅ Created |
| `EmergencyContact` | ✅ Created |
| `Role` (enum) | ✅ Created |
| `_prisma_migrations` | ✅ Created |
| `Member` | ⬜ Pending |
| `Payment` | ⬜ Pending |
| `Schedule` | ⬜ Pending |
| `ScheduleAssignment` | ⬜ Pending |
| `Expense` | ⬜ Pending |
| `Announcement` | ⬜ Pending |

---

## Backend Modules

| Module | Status |
|--------|--------|
| Express Server | ✅ Complete |
| Prisma ORM | ✅ Complete |
| Supabase PostgreSQL | ✅ Complete |
| Database Schema (Initial) | ✅ Complete |
| Authentication | ⬜ Not Started |
| Authorization (RBAC) | ⬜ Not Started |
| Member Module | ⬜ Not Started |
| Payment Module | ⬜ Not Started |
| Roster Module | ⬜ Not Started |
| WhatsApp Notification Module | ⬜ Not Started |
| Dashboard | ⬜ Not Started |
| Reports | ⬜ Not Started |
| Audit Logs | ⬜ Not Started |

---

## Next Tasks (Priority Order)

### Phase 1: Foundation (Weeks 1–2)

1. [ ] Configure shared ESLint
2. [ ] Configure shared Prettier
3. [ ] Create backend architecture (folder structure, services, controllers)
4. [ ] Configure Prisma Client singleton
5. [ ] Build Authentication module (JWT, password hashing, login/signup)
6. [ ] Seed first administrator
7. [ ] Implement Role-Based Access Control
8. [ ] Build Member Registration (admin-driven)
9. [ ] Build Member CRUD interface
10. [ ] Build Manual Payment Logging (Treasurer view)
11. [ ] Build Payment History display

### Phase 2: Fair Roster Engine (Weeks 3–4)

12. [ ] Update Prisma schema with `Schedule` and `ScheduleAssignment`
13. [ ] Implement Round-Robin scheduling algorithm
14. [ ] Implement conflict resolution (no double-booking)
15. [ ] Build Roster Viewer UI (calendar table)
16. [ ] Implement manual override (drag-and-drop or dropdown)
17. [ ] Add PDF export for rosters

### Phase 3: WhatsApp Integration (Weeks 5–6)

18. [ ] Build Digital Receipt Generation service
19. [ ] Set up WhatsApp Cloud API
20. [ ] Implement `sendWhatsAppMessage()` utility
21. [ ] Auto-send payment confirmations
22. [ ] Set up node-cron scheduler
23. [ ] Implement dues reminder cron job (25th of each month)
24. [ ] Implement roster broadcast to WhatsApp
25. [ ] Build Announcements module

### Phase 4: Analytics & Deployment (Weeks 7–8)

26. [ ] Build Executive Dashboard widgets
27. [ ] Add Expense Tracker
28. [ ] Build Income vs Expense Overview
29. [ ] Build Advanced Reports section
30. [ ] Integrate Excel export (exceljs)
31. [ ] End-to-end testing
32. [ ] MVP Deployment (VPS or PaaS)

---

## Post-MVP / Future Milestones

- [ ] Multi-House Support (`House` table)
- [ ] QR Code attendance check-in
- [ ] Inventory Management with low-stock alerts
- [ ] Visitor Management
- [ ] Native Mobile App (React Native / Flutter)
- [ ] Digital Notice Board