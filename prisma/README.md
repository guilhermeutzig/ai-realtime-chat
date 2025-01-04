## Prisma with Supabase - Quick Guide

### Initial Setup with Supabase

1. **Configure Environment**

   Set up your database connection configuration by following these steps:

   - Navigate to your Supabase project dashboard
   - Go to Project Settings > Database to find your connection strings
   - Add these connection strings to your `.env` file:

   ```
   DATABASE_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]?pgbouncer=true"
   DIRECT_URL="postgresql://[USER]:[PASSWORD]@[HOST]:[PORT]/[DB]"
   ```

   The DATABASE_URL includes pgbouncer for connection pooling, while DIRECT_URL is used for migrations.

2. **Initialize Prisma** (Only if Prisma isn't set up yet)

   This command creates the initial Prisma setup files:

   - Creates a new `prisma` directory
   - Adds a basic `schema.prisma` file
   - Creates a `.env` file template

   ```
   npx prisma init
   ```

3. **Update schema.prisma**
   Configure your database connection in schema.prisma to use both URLs:
   ```prisma
   datasource db {
     provider  = "postgresql"
     url       = env("DATABASE_URL")
     directUrl = env("DIRECT_URL")
   }
   ```
   This setup ensures proper handling of both pooled connections and direct database access.

### First Migration

1. **Create your first model** in `schema.prisma`
   Define your database schema by creating models that represent your data structure. Each model will become a table in your database.

2. **Generate & apply first migration**
   Generate the Prisma Client and create your first database migration:
   ```
   npx prisma generate
   npx prisma migrate dev --name init
   ```
   This will create the tables in your database and generate the type-safe Prisma Client.

### Adding New Migrations

1. **Make changes** to your `schema.prisma` file
   Update your models to reflect the new changes you want in your database schema, such as adding new fields or relationships.

2. **Development Environment**
   Apply changes in development with these commands:

   ```
   npx prisma generate
   npx prisma migrate dev --name what_changed
   ```

   This creates a new migration, updates the database, and regenerates the Prisma Client.

3. **Production Environment**
   Deploy changes to production safely:
   ```
   npx prisma generate
   npx prisma migrate deploy
   ```
   This applies pending migrations without modifying the schema or generating migration files.

### Common Issues

- If using Supabase with PgBouncer, always use `directUrl` for migrations
- Always commit migration files to version control
- Run `prisma generate` after pulling new migrations

This setup ensures your database schema stays in sync across all environments. Keep this README handy for future reference!
