import { createClient } from '@supabase/supabase-js';
// Zu diesen
import { execSync } from 'node:child_process';
import path from 'node:path';

import fs from 'node:fs';
// Am Anfang von checkTables() hinzufügen
console.log("ENV Vars:", {
  SUPABASE_URL: process.env.NEXT_PUBLIC_SUPABASE_URL,
  SUPABASE_KEY: process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY
});
async function setupDatabase() {
  // Supabase-Client erstellen
// Supabase-Client erstellen
const supabase = createClient(
  process.env.NEXT_PUBLIC_SUPABASE_URL || '',  // Fallback zu leerem String, wenn undefined
  process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''  // Fallback zu leerem String, wenn undefined
);
  
  console.log('Verbindung zu Supabase hergestellt...');
  
  // SQL-Datei lesen
  const sqlPath = path.join(process.cwd(), 'scripts', 'schema.sql');
  const sqlContent = fs.readFileSync(sqlPath, 'utf8');
  
  // SQL ausführen
  const { data, error } = await supabase.rpc('exec_sql', { sql: sqlContent });
  
  if (error) {
    console.error('Fehler beim Ausführen des SQL-Skripts:', error);
    return;
  }
  
  console.log('Datenbank-Schema erfolgreich erstellt!');
  return data;
}

setupDatabase().catch(console.error);
