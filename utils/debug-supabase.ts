import { createClient } from '@supabase/supabase-js';

export async function debugSupabase() {
  console.log('NEXT_PUBLIC_SUPABASE_URL:', process.env.NEXT_PUBLIC_SUPABASE_URL);
  
  try {
    const supabase = createClient(
      process.env.NEXT_PUBLIC_SUPABASE_URL || '',
      process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY || ''
    );
    
    // Versuche eine einfache Abfrage
    const { data, error } = await supabase.from('sites').select('*').limit(1);
    
    if (error) {
      console.error('Supabase Abfragefehler:', error);
      
      // Details zum URL-Format prüfen
      if (error.message.includes('schema')) {
        console.error('Schema-Fehler erkannt! Überprüfe, ob deine NEXT_PUBLIC_SUPABASE_URL korrekt ist.');
        console.error('Format sollte sein: https://dein-projekt-id.supabase.co');
      }
      
      return { success: false, error };
    }
    
    console.log('Supabase-Verbindung erfolgreich!');
    console.log('Abfrageergebnis:', data);
    
    return { success: true, data };
  } catch (e) {
    console.error('Unerwarteter Fehler beim Verbinden mit Supabase:', e);
    return { success: false, error: e };
  }
}
