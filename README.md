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

# 🛠 Tech Stack

## Frontend

- React
- TypeScript
- Vite
- React Router
- Axios
- Tailwind CSS *(planned)*
- Shadcn UI *(planned)*

## Backend

- Node.js
- Express
- TypeScript

## Database

- PostgreSQL
- Prisma ORM

## Authentication

- JWT
- bcrypt

## Tooling

- pnpm Workspaces
- ESLint
- Prettier
- Git
- Docker *(planned)*

---

# 📁 Project Structure

```
family-house-manager/
│
├── apps/
│   ├── client/
│   └── server/
│
├── docs/
│
├── shared/
│
├── .gitignore
├── pnpm-workspace.yaml
├── package.json
└── README.md
```

---

# 🚀 Getting Started

## Prerequisites

- Node.js 22.12.0
- pnpm
- PostgreSQL

---

## Installation

Clone the repository

```bash
git clone https://github.com/Osfoce/Family-house-manager.git
```

Navigate into the project

```bash
cd Family-house-manager
```

Install dependencies

```bash
pnpm install
```

Start the frontend

```bash
pnpm --filter client dev
```

Start the backend

```bash
pnpm --filter server dev
```

---

# 🔐 Environment Variables

## Server

Create:

```
apps/server/.env
```

Example

```env
PORT=5000

DATABASE_URL=

JWT_SECRET=

JWT_REFRESH_SECRET=
```

---

## Client

Create:

```
apps/client/.env
```

Example

```env
VITE_API_URL=http://localhost:5000
```

---

# 📜 Available Commands

| Command | Description |
|----------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm dev` | Run frontend and backend together |
| `pnpm --filter client dev` | Run React app |
| `pnpm --filter server dev` | Run Express server |
| `pnpm prisma migrate dev` | Run database migrations *(after Prisma setup)* |
| `pnpm prisma studio` | Open Prisma Studio |

---

# 🗺 Roadmap

## Phase 1

- [x] Project setup
- [ ] Authentication
- [ ] User roles
- [ ] Dashboard

---

## Phase 2

- [ ] Member management
- [ ] Payment management
- [ ] Receipt generation

---

## Phase 3

- [ ] Automatic roster generation
- [ ] PDF roster export
- [ ] Manual roster editing

---

## Phase 4

- [ ] WhatsApp notifications
- [ ] Announcements
- [ ] Reminder system

---

## Phase 5

- [ ] Attendance tracking
- [ ] Expense management
- [ ] Inventory management
- [ ] Visitor management

---

## Future

- Multi-house support
- Mobile application
- QR attendance
- Analytics dashboard
- Cloud deployment
- Email notifications
- Calendar integration

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
