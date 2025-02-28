import { createClient } from '@supabase/supabase-js';

async function checkTables() {
  const supabase = createClient(
    process.env.NEXT_PUBLIC_SUPABASE_URL || '',
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
  );
  
  // Liste aller Tabellen im public Schema abrufen
  const { data, error } = await supabase
    .from('information_schema.tables')
    .select('table_name')
    .eq('table_schema', 'public');
  
  if (error) {
    console.error('Fehler beim Abrufen der Tabellen:', error);
    return;
  }
  
  console.log('Gefundene Tabellen:', data);
  
  // Prüfe, ob die erforderlichen Tabellen existieren
  const requiredTables = ['sites', 'authors', 'categories', 'articles'];
  const existingTables = data.map(t => t.table_name);
  
  const missingTables = requiredTables.filter(t => !existingTables.includes(t));
  
  if (missingTables.length > 0) {
    console.log('Fehlende Tabellen:', missingTables);
  } else {
    console.log('Alle erforderlichen Tabellen sind vorhanden!');
  }
}

checkTables().catch(console.error);
