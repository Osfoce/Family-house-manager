# 🏠 Family House Manager

A modern, full-stack web application designed to simplify the day-to-day administration of (The Apostolic) church family house.

Family House Manager digitises and automates common administrative tasks such as member management, monthly subscriptions, payment receipts, duty rosters, announcements, and notifications. The goal is to eliminate repetitive manual work so house leaders can focus more on building community than managing spreadsheets.

Although built initially for a single church family house, the system is designed with scalability in mind and can be extended to support multiple family houses, churches, or similar community organisations.

---

## ✨ Features

### Authentication

- Secure JWT authentication
- Role-based access control
- Protected routes
- Password hashing with bcrypt

### Member Management

- Register members
- Manage member profiles
- Track active/inactive members

### Payment Management

- Record monthly subscriptions
- Automatic receipt generation
- Payment history
- Outstanding payment tracking

### Roster Management

- Automatic cooking roster generation
- Worship leader scheduling
- Prayer leader scheduling
- Word sharing schedule
- Fair rotation algorithm
- Manual schedule adjustment

### Announcements

- Create announcements
- Notify members
- Future WhatsApp integration

### Reports

- Monthly financial reports
- Member participation reports
- Attendance reports (planned)

---

## Architecture

| Layer | Technology |
|-------|------------|
| **Frontend** | React + Vite + TypeScript |
| **Backend** | Express + TypeScript |
| **Package Manager** | pnpm (monorepo workspace) |
| **Database** | Supabase PostgreSQL |
| **ORM** | Prisma |
| **UI Library** | Shadcn UI |
| **PDF Generation** | pdfkit / puppeteer / react-pdf |
| **WhatsApp** | WhatsApp Business Cloud API |
| **Scheduling** | node-cron |


---

## System Requirements

- Node.js **24.x LTS** (Recommended)
- pnpm **10.x**
- Supabase Account
- PostgreSQL Database (Hosted by Supabase)
- Git

---

# 📁 Project Structure

```text
family-house-manager/
│
├── apps/
│   ├── client/          # React + Vite frontend
│   └── server/          # Express + TypeScript backend
│
├── docs/                # Documentation
├── packages/            # Shared workspace packages (reserved)
│
├── .gitignore
├── .prettierignore
├── README.md
├── pnpm-workspace.yaml
├── package.json
└── pnpm-lock.yaml
```

---

## Quick Start

```bash
# Clone repository
git clone https://github.com/Osfoce/Family-house-manager.git
cd Family-house-manager

# Install dependencies
pnpm install

# Configure environment (see INSTALL.md)
cp apps/server/.env.example apps/server/.env
# Edit apps/server/.env and add your DATABASE_URL

# Run both frontend and backend
pnpm dev
```

---

## Documentation

| File | Purpose |
|------|---------|
| [`INSTALL.md`](INSTALL.md) | Detailed setup, environment configuration, and development commands |
| [`TROUBLESHOOTING.md`](TROUBLESHOOTING.md) | Common issues encountered during setup and development |
| [`STATUS.md`](STATUS.md) | Current project progress and module completion tracker |
| [`ARCHITECTURE.md`](ARCHITECTURE.md) | Architectural decisions, patterns, and lessons learned |


---

# 🤝 Contributing

Contributions, feature requests, and suggestions are welcome. Feel free to open an issue or submit a pull request.

---

# 📄 License

This project is licensed under the MIT License.

---

## 👨‍💻 Author

**Oselu Fortunatus**

Blockchain Developer • Full Stack Developer

Built with ❤️ to serve and simplify church administration.
