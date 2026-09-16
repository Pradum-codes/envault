# EnvVault

EnvVault is a personal, secure environment variable manager for developers.

It provides a simple place to store environment variables for different projects and retrieve them whenever you return to a project. Instead of searching through old `.env` files, credentials, or notes, you can organize everything in one private vault.

> **Project status:** Planned / In Development

---

## Features

### Authentication
- Single-user password authentication.
- Protected dashboard and project routes.
- Session-based access control.

### Project Management
- Create projects.
- View all projects from a dashboard.
- Rename or delete projects.
- Organize variables by project.

### Environment Variable Management
- Add, edit, and delete environment variables.
- Mask secret values by default.
- Reveal values when needed.
- Copy individual values to the clipboard.
- Search variables within a project.

### Environment Export
- Copy all variables as `.env` format.
- Download a `.env` file for a project.

### Security
- Passwords stored as secure hashes.
- Environment variable values encrypted before storage.
- Secrets are not stored as plaintext in the database.

---

## Example Use Case

Suppose you are working on a project called `Shortify`.

Its environment variables might look like:

```env
DATABASE_URL=postgresql://localhost:5432/shortify
JWT_SECRET=your-secret
CLOUDINARY_API_KEY=your-api-key
PORT=5000
```

After finishing the project, you can store these variables in EnvVault.

When returning to Shortify months later:

1. Log in to EnvVault.
2. Open the Shortify project.
3. Copy or export the required environment variables.
4. Continue development without searching through old files.

---

## Tech Stack

| Technology | Purpose |
|---|---|
| Next.js | Full-stack web application |
| PostgreSQL | Persistent database |
| Prisma | Database ORM |
| Authentication | Password-based single-user authentication |
| Encryption | Secure storage of environment variable values |
| Tailwind CSS | User interface styling |

The application is intentionally kept simple. It does not require microservices, Redis, Kubernetes, multi-user permissions, or enterprise secret-management features.

---

## Application Structure

```text
EnvVault
│
├── Authentication
│   └── Login
│
├── Dashboard
│   └── Project List
│
└── Project
    ├── Environment Variables
    ├── Add Variable
    ├── Edit Variable
    ├── Delete Variable
    └── Export .env
```

---

## Database Model

The initial data model contains three main entities:

```text
User
 │
 └── Projects
       │
       └── Environment Variables
```

### User

Stores the application owner's authentication information.

### Project

Represents a development project such as Shortify, Moneko, or CookClever.

### EnvironmentVariable

Stores a variable key and its encrypted value.

Example:

| Project | Key | Value |
|---|---|---|
| Shortify | DATABASE_URL | Encrypted |
| Shortify | JWT_SECRET | Encrypted |
| Moneko | API_URL | Encrypted |

---

## Security Model

EnvVault is designed for personal use, but sensitive values should still be handled responsibly.

### Environment Variable Storage

Environment variable values should be encrypted before being written to PostgreSQL.

```text
Original Secret
      │
      ▼
AES-256-GCM Encryption
      │
      ▼
Encrypted Value
      │
      ▼
Database
```

The encryption key should be kept outside the database, using a server-side environment variable.

Example:

```env
VAULT_ENCRYPTION_KEY=your-long-random-encryption-key
```

---

## Getting Started
### Prerequisites

Make sure you have the following installed:

- Node.js 20+
- npm, pnpm, or yarn
- PostgreSQL
- Git

### Clone the Repository

```bash
git clone <repository-url>
cd envvault
```

### Install Dependencies

```bash
npm install
```

### Configure Environment Variables

Create a `.env` file:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/envvault"
AUTH_SECRET="your-auth-secret"
VAULT_ENCRYPTION_KEY="your-encryption-key"
```

Do not commit this file to Git.

### Setup Database

```bash
npx prisma migrate dev
```

Generate the Prisma client:

```bash
npx prisma generate
```

### Run Development Server

```bash
npm run dev
```

Open the application at:

```text
http://localhost:3000
```
---

## Project Philosophy

EnvVault is intentionally a small project.

The goal is not to build a replacement for HashiCorp Vault or AWS Secrets Manager. The goal is to solve a personal developer workflow problem:

> Store project environment variables securely and retrieve them easily whenever needed.

The application should remain simple enough to maintain while demonstrating practical full-stack engineering concepts such as authentication, database design, CRUD operations, encryption, and secure data handling.

---
