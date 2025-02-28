import { execSync } from 'node:child_process';
import * as path from 'node:path';

// Deno-Ersatz für __dirname
const currentDir = new URL('.', import.meta.url).pathname.replace(/^\//, '');

console.log('🔧 Starte Datenbank-Setup...');
console.log('🔧 Starte Datenbank-Setup...');
// Führe Tabellenerstellung aus
try {
  console.log('📊 Erstelle Tabellen...');
  execSync('deno run --allow-all ' + path.join(currentDir, 'create-tables.ts'), { stdio: 'inherit' });
  console.log('✅ Tabellen erfolgreich erstellt!');
} catch (error) {
  console.error('❌ Fehler beim Erstellen der Tabellen:', error);
  process.exit(1); // Beende den Prozess mit einem Fehlercode
}

// Überprüfe, ob alle Tabellen vorhanden sind
try {
  console.log('🔍 Überprüfe Tabellen...');
  execSync('deno run --allow-all ' + path.join(currentDir, 'check-tables.ts'), { stdio: 'inherit' });
  console.log('✅ Tabellen-Check erfolgreich!');
} catch (error) {
  console.error('❌ Fehler beim Überprüfen der Tabellen:', error);
  process.exit(1); // Beende den Prozess mit einem Fehlercode
}

console.log('🎉 Datenbank-Setup abgeschlossen!');
