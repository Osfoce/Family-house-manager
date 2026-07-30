# Development Setup & Troubleshooting

> This document records the project setup process, common issues encountered, and their solutions. It serves as a reference for future development and onboarding.

---

# Project Information

**Project:** Family House Manager

**Architecture:** pnpm Monorepo

**Frontend:** React + Vite + TypeScript

**Backend:** Express + TypeScript

**Database:** Supabase PostgreSQL

**ORM:** Prisma ORM

**Package Manager:** pnpm

---

# System Requirements

* Node.js **24.x LTS** (Recommended)
* pnpm **10.x**
* Supabase Account
* PostgreSQL Database (Hosted by Supabase)
* Git

---

# Project Structure

```text
family-house-manager/
│
├── apps/
│   ├── client/
│   └── server/
│
├── docs/
├── packages/
│
├── .gitignore
├── .prettierignore
├── README.md
├── pnpm-workspace.yaml
├── package.json
└── pnpm-lock.yaml
```

---

# Initial Setup

## Clone Repository

```bash
git clone https://github.com/Osfoce/Family-house-manager.git

cd Family-house-manager
```

---

## Install Dependencies

```bash
pnpm install
```

---

# Environment Variables

Create:

```text
apps/server/.env
```

Required variables

```env
DATABASE_URL="Session Pooler Connection String"
```

> The project currently uses the Supabase **Session Pooler** connection because the development environment does not have public IPv6 connectivity. The Direct Connection endpoint resolved to an IPv6 address and resulted in `P1001: Can't reach database server`.

---

## Start Development

Frontend only

```bash
pnpm client
```

Backend only

```bash
pnpm server
```

Run both

```bash
pnpm dev
```

---

# Workspace Configuration

`pnpm-workspace.yaml`

```yaml
packages:
  - apps/*
```

> **Note:** Add additional workspace packages only when they become actual packages (e.g. `packages/shared`).

---

# Prisma Workflow

Validate schema

```bash
pnpm --filter server exec prisma validate
```

Create migration

```bash
pnpm --filter server exec prisma migrate dev --name migration_name
```

Generate Prisma Client

```bash
pnpm --filter server exec prisma generate
```

Format Prisma schema

```bash
pnpm --filter server exec prisma format
```

---

# Database

Provider

- Supabase PostgreSQL

ORM

- Prisma

Current Tables

- User
- MedicalInformation
- EmergencyContact
- _prisma_migrations

Migration Location

```text
apps/server/prisma/migrations/
```

---

# Known Issues & Solutions

---

## 1. Invalid pnpm-workspace.yaml

### Problem

```text
unexpected end of stream within a double quoted scalar
```

### Cause

Missing closing quotation mark.

Incorrect

```yaml
packages:
  - "apps/*"
  - "shared/*
```

Correct

```yaml
packages:
  - apps/*
```

or

```yaml
packages:
  - "apps/*"
```

---

## 2. Vite Created Inside the Wrong Folder

### Problem

Project created inside

```text
apps/client/apps/client
```

instead of

```text
apps/client
```

### Cause

The command was run while already inside `apps/client`.

Incorrect

```bash
cd apps/client

pnpm create vite apps/client --template react-ts
```

Correct

Run from the project root.

```bash
pnpm create vite apps/client --template react-ts
```

---

## 3. Node Version Too Old

### Problem

Prisma/Vite refused to install.

```text
Prisma only supports Node.js versions
20.19+
22.12+
24+
```

### Solution

Install Node 24 using nvm.
- **Note**: I used 22.12+

```bash
nvm install 24

nvm use 24

nvm alias default 24
```

Verify

```bash
node -v
```

---

## 4. pnpm Command Not Found After Switching Node Versions

### Problem

```text
Command 'pnpm' not found
```

### Cause

Global packages are not shared between Node versions managed by nvm.

### Solution

Enable Corepack.

```bash
corepack enable

corepack prepare pnpm@latest --activate
```

or

```bash
npm install -g pnpm
```

---

## 5. Server Had No dev Script

### Problem

```text
ERR_PNPM_RECURSIVE_EXEC_FIRST_FAIL

Command "dev" not found
```

### Cause

`package.json` still contained the default test script.

### Solution

```json
"scripts": {
  "dev": "tsx watch src/server.ts",
  "build": "tsc",
  "start": "node dist/server.js",
  "typecheck": "tsc --noEmit"
}
```

---

## 6. TypeScript Printed Help Instead of Checking Code

### Problem

Running

```bash
pnpm exec tsc --noEmit
```

displayed the TypeScript help page.

### Cause

No `tsconfig.json` existed.

### Solution

```bash
pnpm exec tsc --init
```

---

## 7. Prisma Command Not Found

### Problem

```text
Command "prisma" not found
```

### Cause

The command was executed from the workspace root while Prisma was installed only in the server package.

### Correct Commands

Inside server

```bash
cd apps/server

pnpm exec prisma validate
```

or from the root

```bash
pnpm --filter server exec prisma validate
```

---

## 8. SIGINT Errors

### Problem

```text
ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL

SIGINT
```

### Cause

The development server was stopped using **Ctrl + C**.

### Solution

Ignore.

This is expected behaviour.

---

## 9. ESLint Could Not Find Configuration

### Problem

```text
ESLint couldn't find eslint.config.js
```

### Cause

ESLint v9 uses the Flat Config system.

### Solution

Create

```text
eslint.config.mjs
```

Configure it before running lint.

---

## 10. Prettier Reporting Dozens of Files

### Problem

```text
Code style issues found in 75 files.
```

### Cause

Generated files and project files were not formatted.

### Solution

```bash
pnpm exec prettier --write .
```

Create `.prettierignore`.

Suggested contents

```text
node_modules
dist
coverage

pnpm-lock.yaml

.agents
.claude
.windsurf

generated
build
```

---

## 11. Prisma Generated AI Folders

### Observation

Recent Prisma versions generate folders such as

```text
.agents/
.claude/
.windsurf/
```

These provide AI assistant integration for Prisma.

They are expected.

Do not delete them unless intentionally opting out of those integrations.

---

## 12. Supabase Direct Connection (P1001)

### Problem

```text
P1001: Can't reach database server
```

### Cause

The Direct Connection endpoint resolved to an IPv6 address.

The development machine had only a link-local IPv6 address (`fe80::`) and therefore could not reach the public IPv6 internet.

### Symptoms

```text
ping db.<project>.supabase.co

Network is unreachable
```

```text
nc -vz db.<project>.supabase.co 5432

Network is unreachable
```

### Solution

Use the Supabase **Session Pooler** connection string instead of the Direct Connection string.

```env
DATABASE_URL="postgresql://..."
```

The migration completed successfully afterwards.

---

# Useful Commands

Install dependencies

```bash
pnpm install
```

Run frontend

```bash
pnpm client
```

Run backend

```bash
pnpm server
```

Run everything

```bash
pnpm dev
```

Type check backend

```bash
pnpm --filter server exec tsc --noEmit
```

Validate Prisma schema

```bash
pnpm --filter server exec prisma validate
```

Format project

```bash
pnpm exec prettier --write .
```

Check formatting

```bash
pnpm exec prettier --check .
```

List workspace packages

```bash
pnpm -r list
```

---



# Current Project Status

* ✅ pnpm Workspace
* ✅ React + Vite
* ✅ Express
* ✅ TypeScript
* ✅ Root Scripts
* ✅ Concurrent Development
* ✅ Prisma Installed
* ✅ Configure Supabase PostgreSQL
* ✅ Configure Prisma
* ✅ Connect Prisma to Supabase
* ✅ Create User schema
* ✅ Create MedicalInformation schema
* ✅ Create EmergencyContact schema
* ✅ Create enums
* ✅ Run first migration
* ✅ Generate Prisma Client

### Next Tasks

* Configure shared ESLint
* Configure shared Prettier
* Create backend architecture
* Configure Prisma Client singleton
* Build Authentication module
* Seed first administrator
* JWT Authentication
* Role-Based Access Control
* Member Registration

---

# Backend Progress

✅ Express Server

✅ Prisma ORM

✅ Supabase PostgreSQL

✅ Database Schema

⬜ Authentication

⬜ Authorization

⬜ Member Module

⬜ Payment Module

⬜ Roster Module

⬜ WhatsApp Notification Module

⬜ Dashboard

⬜ Reports

⬜ Audit Logs

---

# Architectural Decisions

- Monorepo managed with pnpm workspaces.
- React and Express are maintained as separate applications.
- PostgreSQL is hosted on Supabase.
- Prisma is the sole ORM for database access.
- Medical information is stored in a separate table.
- Emergency contacts are stored in a separate table.
- Images are stored externally; only their URLs are persisted.
- User roles are represented with Prisma enums.
- Authentication is administrator-driven; users cannot self-register.
- Passwords are stored as hashes only.
- Members are required to change their generated password on first login.
- The Session Pooler is used for development because the current environment lacks public IPv6 connectivity for the direct database endpoint.

---

# Lessons Learned

* Always execute workspace commands from the project root unless intentionally targeting a specific package.
* Verify the current working directory (`pwd`) before scaffolding a new project.
* Upgrade Node.js before installing modern tooling such as Prisma or Vite.
* Remember that changing Node versions with `nvm` may require re-enabling or reinstalling `pnpm`.
* Configure development tools (TypeScript, ESLint, Prettier) before building features.
* Keep setup notes up to date—future maintenance becomes much easier when troubleshooting steps are documented.
