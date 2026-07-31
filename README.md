# IT-PMO Engine

Enterprise delivery lifecycle command center built with Next.js, TypeScript, Prisma, PostgreSQL, Tailwind CSS, and Zod.

## Local setup

1. Copy `.env.example` to `.env` and set `DATABASE_URL`.
2. Run `npm install`.
3. Run `npx prisma generate` and then `npx prisma migrate dev` when a PostgreSQL database is available.
4. Start the application with `npm run dev`.

The `data/` folder is reserved for safe local fixtures. Do not place production data or credentials in this project.
