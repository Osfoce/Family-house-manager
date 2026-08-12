# Database Guide

> This document explains the database architecture, design decisions, Prisma 7 configuration, and lessons learned while building the **Family House Manager** project.

---

## Table of Contents

- [Overview](#overview)
- [Why PostgreSQL?](#why-postgresql)
  - [MySQL](#mysql)
  - [MongoDB](#mongodb)
  - [PostgreSQL (Chosen)](#postgresql-chosen)
- [Why Supabase?](#why-supabase)
- [Prisma ORM](#prisma-orm)
- [Prisma 7 Architecture](#prisma-7-architecture)
- [PostgreSQL Driver](#postgresql-driver)
- [Prisma Adapter](#prisma-adapter)
- [Connection Pool](#connection-pool)
- [Why Use a Pool?](#why-use-a-pool)
- [Supabase Session Pooler](#supabase-session-pooler)
- [Prisma Singleton](#prisma-singleton)
- [Database Migrations](#database-migrations)
- [Current Database Tables](#current-database-tables)
- [Lessons Learned](#lessons-learned)
- [Future Topics](#future-topics)

---

## Overview

The Family House Manager uses **PostgreSQL** as its relational database, hosted on **Supabase**, with **Prisma ORM** as the data access layer.

The project follows a modern backend architecture:

```text
Express
   │
Prisma Client
   │
Prisma PostgreSQL Adapter
   │
pg Connection Pool
   │
Supabase Session Pooler
   │
PostgreSQL Database
```

---

## Why PostgreSQL?

Several databases were considered before development.

### MySQL

| Pros | Cons |
|------|------|
| Mature ecosystem | Fewer advanced PostgreSQL features |
| Easy to learn | Less flexible for future analytics and reporting |
| Widely supported | |

### MongoDB

| Pros | Cons |
|------|------|
| Flexible document structure | Weak relational modeling |
| Fast iteration for changing schemas | Data consistency becomes harder as relationships grow |
| | Not ideal for highly structured business applications |

### PostgreSQL (Chosen)

| Pros |
|------|
| Strong relational database |
| Excellent data integrity |
| ACID compliant |
| Powerful indexing |
| Advanced querying |
| Excellent support in Prisma |
| Highly scalable |
| Industry standard for modern SaaS applications |

Since the Family House Manager contains many related entities (Users, Payments, Rosters, Medical Records, Emergency Contacts, Audit Logs, etc.), PostgreSQL provides the best long-term foundation.

---

## Why Supabase?

Instead of hosting PostgreSQL locally or inside Docker, Supabase was selected because it provides:

- Managed PostgreSQL
- Automatic backups
- Monitoring
- Easy connection management
- Authentication services (available if needed later)
- Storage for uploaded files
- Generous free tier for development

This allows development to focus on application logic instead of database administration.

---

## Prisma ORM

Prisma acts as the bridge between the application and PostgreSQL.

Instead of writing raw SQL everywhere, the application interacts with strongly typed Prisma models.

**Example:**

```ts
await prisma.user.findMany();
```

instead of:

```sql
SELECT * FROM users;
```

**Benefits:**

- Type safety
- Auto-completion
- Schema migrations
- Cleaner code
- Easier maintenance

---

## Prisma 7 Architecture

This project uses the **new Prisma 7 client generator**.

```prisma
generator client {
  provider = "prisma-client"
  output   = "../generated/prisma"
}
```

Unlike older Prisma versions, Prisma 7 no longer bundles a PostgreSQL driver. Instead, developers explicitly choose the database driver using an adapter.

**Architecture:**

```text
Application
    ↓
Prisma Client
    ↓
Prisma Adapter
    ↓
Database Driver
    ↓
Database
```

This makes Prisma more modular and supports additional runtimes in the future.

---

## PostgreSQL Driver

The project uses the official PostgreSQL driver:

```text
pg
```

The driver is responsible for communicating with PostgreSQL. Prisma itself does not communicate directly with the database.

---

## Prisma Adapter

**Package:** `@prisma/adapter-pg`

The adapter connects Prisma Client to the PostgreSQL driver. Without the adapter, Prisma Client cannot communicate with PostgreSQL when using the new Prisma 7 generator.

---

## Connection Pool

The project creates a PostgreSQL connection pool.

**Example:**

```ts
import { Pool } from "pg";

const pool = new Pool({
  connectionString: process.env.DATABASE_URL,
});
```

Instead of opening and closing a new database connection for every request, the application reuses existing connections.

**Benefits:**

- Faster queries
- Lower latency
- Better scalability
- Reduced database overhead

---

## Why Use a Pool?

### Without Pooling

```text
Request
    ↓
Open connection
    ↓
Run query
    ↓
Close connection
```

This happens for every request.

### With Pooling

```text
Request
    ↓
Borrow connection
    ↓
Run query
    ↓
Return connection
```

Connections are reused instead of recreated.

---

## Supabase Session Pooler

The application connects to the **Supabase Session Pooler**, not the direct database endpoint.

### Reason

The development machine does not currently have public IPv6 connectivity. The direct Supabase endpoint resolved only to an IPv6 address, causing:

```text
P1001
Can't reach database server
```

Using the Session Pooler solved the problem because it provides an IPv4-compatible endpoint.

**Current connection:**

```env
DATABASE_URL="postgresql://..."
```

---

## Prisma Singleton

The project uses the Singleton pattern for Prisma Client.

### Purpose

Only one Prisma Client instance should exist throughout the application.

### Without a Singleton

```text
Auth Module
    ↓
New Prisma Client

Member Module
    ↓
New Prisma Client

Payment Module
    ↓
New Prisma Client
```

This creates unnecessary database connections.

### With a Singleton

```text
Auth Module ──┐
              │
Member Module ─┼──→ Prisma Client ──→ PostgreSQL
              │
Payment Module ─┘
```

Every module shares the same client instance.

**Benefits:**

- Fewer database connections
- Better performance
- Lower memory usage
- Prevents connection exhaustion during development

---

## Database Migrations

Schema changes are version-controlled using Prisma Migrations.

### Create a Migration

```bash
pnpm --filter server exec prisma migrate dev --name migration_name
```

### Generate Prisma Client

```bash
pnpm --filter server exec prisma generate
```

### Validate Schema

```bash
pnpm --filter server exec prisma validate
```

### Migration Files Location

```text
apps/server/prisma/migrations/
```

---

## Current Database Tables

### Current Models

| Model | Description |
|-------|-------------|
| `User` | Core identity and authentication |
| `MedicalInformation` | Health-related data |
| `EmergencyContact` | Contact persons for emergencies |

### System Table

| Table | Description |
|-------|-------------|
| `_prisma_migrations` | Prisma migration history |

More tables will be added as development progresses.

---

## Lessons Learned

- PostgreSQL was chosen because the application contains many relational entities.
- Prisma simplifies database access while maintaining type safety.
- Prisma 7 separates the ORM from the database driver through adapters.
- The `pg` package is responsible for communicating with PostgreSQL.
- `@prisma/adapter-pg` connects Prisma Client to the PostgreSQL driver.
- A connection pool improves performance by reusing database connections.
- Supabase Session Pooler provides a reliable development connection when direct IPv6 access is unavailable.
- A Prisma Singleton ensures only one database client exists throughout the application.

---

## Future Topics

This document will expand as the project grows. Planned additions include:

- [ ] Database indexing
- [ ] Transactions
- [ ] Optimistic locking
- [ ] Soft deletes
- [ ] Query optimization
- [ ] Performance profiling
- [ ] Full-text search
- [ ] Database seeding
- [ ] Backup and restore strategy
- [ ] Production deployment considerations
- [ ] Read replicas
- [ ] Audit logging
- [ ] Multi-tenancy (if ever required)
