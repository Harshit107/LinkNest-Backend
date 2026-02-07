# ToolManager Backend

Production-ready Node.js/Express backend for ToolManager (LinkNest).

## Tech Stack
- **Runtime**: Node.js
- **Framework**: Express.js
- **Language**: TypeScript
- **Database**: PostgreSQL
- **ORM**: Prisma
- **Validation**: Zod
- **Security**: Helmet, CORS

## Prerequisites
- Node.js (v18+)
- PostgreSQL Database

## Setup

1. **Install Dependencies**
   ```bash
   cd Backend
   npm install
   ```

2. **Environment Variables**
   - Copy `.env` file (already created)
   - Update `DATABASE_URL` with your local PostgreSQL connection string.

3. **Database Setup**
   ```bash
   # Generate Prisma Client
   npx prisma generate

   # Run Migrations (creates tables)
   npx prisma migrate dev --name init
   ```

4. **Run Server**
   ```bash
   # Development
   npm run dev

   # Production Build
   npm run build
   npm start
   ```

## Architecture
- `src/controllers`: Request handlers
- `src/services`: Business logic
- `src/db`: Database abstraction layer (strict separation)
- `src/repositories`: Direct Prisma calls
- `src/routes`: API definitions

## API Endpoints
- `POST /api/folders` - Create folder
- `GET /api/folders` - Get user folders
- `POST /api/websites` - Add website
- `GET /api/websites/folder/:folderId` - Get websites in folder
