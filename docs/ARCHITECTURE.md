# Architecture & Design Decisions

This document records the architectural patterns, key decisions, and lessons learned during the development of Family House Manager.

---

## Architectural Overview

- **Monorepo:** Managed with pnpm workspaces.
- **Frontend & Backend:** Maintained as separate applications (`apps/client`, `apps/server`).
- **Database:** PostgreSQL hosted on Supabase.
- **ORM:** Prisma is the sole ORM for database access.

---

## Key Decisions

### 1. Monorepo Structure

**Decision:** Use pnpm workspaces to manage frontend and backend in a single repository.

**Rationale:** Simplifies dependency management, shared tooling configuration, and atomic commits across the stack.

**Structure:**

```text
apps/client/     # React + Vite frontend
apps/server/     # Express + TypeScript backend
packages/        # Reserved for shared code (e.g., shared types, utilities)
```

> **Note:** Add additional workspace packages only when they become actual packages (e.g., `packages/shared`).

---

### 2. Database & ORM

**Decision:** Use Supabase PostgreSQL with Prisma ORM.

**Rationale:**
- Supabase provides managed PostgreSQL with generous free tier.
- Prisma offers type-safe database access and excellent migration tooling.

**Connection Strategy:**
- **Development:** Use Supabase **Session Pooler** connection string.
- **Production:** Evaluate Direct Connection vs. Session Pooler based on environment capabilities.

> **Context:** The development environment lacks public IPv6 connectivity. The Direct Connection endpoint resolves to an IPv6 address, causing `P1001: Can't reach database server`. The Session Pooler works around this limitation.

---

### 3. Data Modeling

**Decision:** Separate medical and emergency contact data into dedicated tables.

**Rationale:**
- Keeps the `User` table focused on authentication and core identity.
- Allows for flexible schema evolution (e.g., multiple emergency contacts, detailed medical history).
- Improves query performance for common user lookups.

**Current Schema:**
- `User` — Core identity and authentication
- `MedicalInformation` — Health-related data
- `EmergencyContact` — Contact persons for emergencies

---

### 4. Image Storage

**Decision:** Store images externally; persist only URLs in the database.

**Rationale:**
- Avoids database bloat from binary large objects (BLOBs).
- Leverages CDN capabilities of external storage providers (e.g., Cloudinary, Supabase Storage).
- Simplifies backups and reduces database size.

---

### 5. Authentication Model

**Decision:** Administrator-driven registration with mandatory password change on first login.

**Rationale:**
- Prevents unauthorized self-registration in a closed community system.
- Ensures the admin maintains control over who has access.
- Mandatory password change improves security by ensuring users set their own credentials.

**Flow:**
1. Admin creates user account (system generates temporary password).
2. User receives login credentials.
3. User logs in and is forced to change password before accessing the system.

---

### 6. Role-Based Access Control (RBAC)

**Decision:** Represent user roles with Prisma enums.

**Roles:**
- `SUPER_ADMIN` — Full system access, user management
- `TREASURER` — Financial operations, payment logging, expense tracking
- `MEMBER` — View personal data, payment history, roster assignments

**Rationale:**
- Enums provide type safety at the database level.
- Simple three-tier model covers all MVP use cases without over-engineering.

---

### 7. Password Security

**Decision:** Store passwords as hashes only (bcrypt/argon2).

**Rationale:**
- Never store plain-text passwords.
- Hashing ensures that even database breaches do not expose user credentials.

---

## Lessons Learned

### Development Workflow

1. **Execute workspace commands from the project root** unless intentionally targeting a specific package. This prevents path-related errors and ensures workspace resolution works correctly.

2. **Verify the current working directory (`pwd`)** before scaffolding new projects. Running `pnpm create vite apps/client` from inside `apps/client` creates nested directories (`apps/client/apps/client`).

3. **Upgrade Node.js before installing modern tooling.** Prisma and Vite have strict version requirements (20.19+, 22.12+, or 24+). Attempting to install on older versions results in cryptic errors.

4. **Changing Node versions with `nvm` may require re-enabling or reinstalling `pnpm`.** Global packages are not shared between Node versions managed by nvm. Use `corepack enable` or `npm install -g pnpm` after switching versions.

5. **Configure development tools (TypeScript, ESLint, Prettier) before building features.** Retrofitting tooling onto an existing codebase is significantly more work than starting with it configured.

### Tooling Specifics

6. **ESLint v9 uses the Flat Config system.** If `eslint.config.js` is missing, ESLint will not run and may display a help page instead. Create `eslint.config.mjs` to configure rules.

7. **Prisma commands require workspace filtering.** When running from the monorepo root, use `pnpm --filter server exec prisma <command>` instead of `pnpm exec prisma <command>`.

8. **SIGINT errors when stopping the dev server are expected.** Using `Ctrl + C` to terminate `pnpm dev` may display `ERR_PNPM_RECURSIVE_RUN_FIRST_FAIL SIGINT`. This is normal and can be safely ignored.

### Database

9. **Always test database connectivity before running migrations.** Use `ping` and `nc -vz` to verify network reachability. If the Direct Connection endpoint is unreachable, switch to the Session Pooler.

10. **Document infrastructure workarounds immediately.** The IPv6 connectivity issue and Session Pooler solution were documented during setup. Future developers (or your future self) will thank you for this context.

---

## Future Architectural Considerations

- **Multi-House Support:** Introduce a `House` table to partition members, rosters, and finances by physical location.
- **API Rate Limiting:** Implement rate limiting before WhatsApp integration to prevent abuse and manage costs.
- **Caching Layer:** Consider Redis for session storage and frequently accessed data (rosters, member lists) as the user base grows.
- **File Uploads:** Evaluate Supabase Storage vs. Cloudinary for receipt and roster image hosting.