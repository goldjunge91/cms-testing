// db/pushToSupabase.ts
import { config } from 'dotenv';
import { migrate } from 'drizzle-orm/postgres-js/migrator';
import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';

config({ path: '.env' });

async function main() {
  console.log('Connecting to database...');
  const connectionString = process.env.DATABASE_URL!;
  const sql = postgres(connectionString);
  const db = drizzle(sql);

  console.log('Running migrations...');
  await migrate(db, { migrationsFolder: './db/migrations' });
  
  console.log('Migrations completed successfully!');
  process.exit(0);
}

main().catch((err) => {
  console.error('Migration failed:', err);
  process.exit(1);
});
