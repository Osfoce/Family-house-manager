# Installation & Development Guide

This document provides step-by-step instructions for setting up the development environment and running the application.

---

## Prerequisites

Ensure you have the following installed:

- **Node.js 24.x LTS** (Prisma and Vite require 20.19+, 22.12+, or 24+)
- **pnpm 10.x**
- **Git**
- **Supabase Account** with a PostgreSQL database

> **Note:** If using `nvm` to manage Node versions, remember that global packages (like pnpm) are not shared between versions. You may need to re-enable or reinstall pnpm after switching Node versions.

---

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

## Environment Configuration

Create the server environment file:

```bash
touch apps/server/.env
```

Add the following required variable:

```env
DATABASE_URL="postgresql://..."
```

### Database Connection

The project uses the **Supabase Session Pooler** connection string. Do not use the Direct Connection endpoint in development environments without public IPv6 connectivity, as it will result in a `P1001: Can't reach database server` error.

> See [TROUBLESHOOTING.md #12](TROUBLESHOOTING.md#12-supabase-direct-connection-p1001) for details.

---

## Start Development

### Run Frontend Only

```bash
pnpm client
```

### Run Backend Only

```bash
pnpm server
```

### Run Both (Concurrently)

```bash
pnpm dev
```

---

## Workspace Configuration

The monorepo is managed via pnpm workspaces. The configuration is defined in `pnpm-workspace.yaml`:

```yaml
packages:
  - apps/*
```

> **Note:** Add additional workspace packages only when they become actual packages (e.g., `packages/shared`).

---

## Prisma Workflow

All Prisma commands should be run from the project root using the workspace filter:

### Validate Schema

```bash
pnpm --filter server exec prisma validate
```

### Create Migration

```bash
pnpm --filter server exec prisma migrate dev --name migration_name
```

### Generate Prisma Client

```bash
pnpm --filter server exec prisma generate
```

### Format Prisma Schema

```bash
pnpm --filter server exec prisma format
```

---

## Useful Commands

| Command | Description |
|---------|-------------|
| `pnpm install` | Install all workspace dependencies |
| `pnpm client` | Run frontend development server |
| `pnpm server` | Run backend development server |
| `pnpm dev` | Run both frontend and backend concurrently |
| `pnpm --filter server exec tsc --noEmit` | Type-check backend without emitting files |
| `pnpm --filter server exec prisma validate` | Validate Prisma schema |
| `pnpm exec prettier --write .` | Format entire project |
| `pnpm exec prettier --check .` | Check project formatting |
| `pnpm -r list` | List all workspace packages |

---

## Server Scripts

The backend `package.json` includes the following scripts:

```json
{
  "scripts": {
    "dev": "tsx watch src/server.ts",
    "build": "tsc",
    "start": "node dist/server.js",
    "typecheck": "tsc --noEmit"
  }
}
```
