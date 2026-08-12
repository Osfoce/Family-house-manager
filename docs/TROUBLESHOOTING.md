# Troubleshooting Guide

This document records common issues encountered during development and their solutions.

---

## 1. Invalid pnpm-workspace.yaml

### Problem

```text
unexpected end of stream within a double quoted scalar
```

### Cause

Missing closing quotation mark.

### Incorrect

```yaml
packages:
  - "apps/*"
  - "shared/*
```

### Correct

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

Project created inside `apps/client/apps/client` instead of `apps/client`.

### Cause

The command was run while already inside `apps/client`.

### Incorrect

```bash
cd apps/client
pnpm create vite apps/client --template react-ts
```

### Correct

Run from the project root:

```bash
pnpm create vite apps/client --template react-ts
```

---

## 3. Node Version Too Old

### Problem

Prisma/Vite refused to install.

```text
Prisma only supports Node.js versions 20.19+, 22.12+, 24+
```

### Solution

Install Node 24 using nvm:

```bash
nvm install 24
nvm use 24
nvm alias default 24
```

Verify:

```bash
node -v
```

> **Note:** The project was successfully set up using Node 22.12+.

---

## 4. pnpm Command Not Found After Switching Node Versions

### Problem

```text
Command 'pnpm' not found
```

### Cause

Global packages are not shared between Node versions managed by nvm.

### Solution

Enable Corepack:

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

Add development scripts to `apps/server/package.json`:

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

---

## 6. TypeScript Printed Help Instead of Checking Code

### Problem

Running `pnpm exec tsc --noEmit` displayed the TypeScript help page.

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

Inside server directory:

```bash
cd apps/server
pnpm exec prisma validate
```

or from the root using workspace filter:

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

Ignore. This is expected behavior.

---

## 9. ESLint Could Not Find Configuration

### Problem

```text
ESLint couldn't find eslint.config.js
```

### Cause

ESLint v9 uses the Flat Config system.

### Solution

Create `eslint.config.mjs` and configure it before running lint.

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

Create `.prettierignore` with the following suggested contents:

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

Recent Prisma versions generate folders such as:

```text
.agents/
.claude/
.windsurf/
```

These provide AI assistant integration for Prisma. They are expected. Do not delete them unless intentionally opting out of those integrations.

---

## 12. Supabase Direct Connection (P1001)

### Problem

```text
P1001: Can't reach database server even though the project had already been resumed.
```

### Cause

The Direct Connection endpoint resolved to an IPv6 address. The development machine had only a link-local IPv6 address (`fe80::`) and therefore could not reach the public IPv6 internet.
Also
On the free tier, the database and/or session pooler may take a short time to become fully available after resuming. The first connection attempts can fail even though the service is in the process of starting.

### Symptoms

```bash
ping db.<project>.supabase.co
# Network is unreachable

nc -vz db.<project>.supabase.co 5432
# Network is unreachable

nc -vz aws-0-eu-west-1.pooler.supabase.com 5432
# If the connection succeeds, the infrastructure is reachable.

```

### Solution

Use the Supabase **Session Pooler** connection string instead of the Direct Connection string:

```env
DATABASE_URL="postgresql://..."
```
Wait a few minutes after resuming the project, then retry:

```bash 
pnpm --filter server exec prisma migrate status 
```

The migration completed successfully afterwards.

## 13 Prisma could not read DATABASE_URL from the .env file.
### Cause

Prisma 7 no longer loads .env automatically through the CLI configuration.

### Solution

Import dotenv in prisma.config.ts.

```import "dotenv/config";```

Then expose the datasource:

```datasource: {
  url: process.env.DATABASE_URL,
}```


## 14 Prisma 7 Requires a Database Adapter
Problem

Property 'adapter' is missing in type ...

Cause

Prisma 7 no longer creates database connections directly for PostgreSQL when using the new prisma-client generator.

Solution

Install the PostgreSQL adapter.

```bash
pnpm add @prisma/adapter-pg```

Configure it during Prisma Client initialization.