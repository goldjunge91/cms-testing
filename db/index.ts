import 'dotenv/config';
import { neon } from '@neondatabase/serverless';
import { drizzle } from 'drizzle-orm/neon-http';
import { eq } from 'drizzle-orm';
import * as schema from './schema';

// Neon HTTP Client für die Datenbankverbindung
const sql = neon(process.env.DATABASE_URL!);
// Drizzle-Instanz mit unserem Schema
export const db = drizzle(sql, { schema });

// Beispielfunktion zum Testen der Datenbankverbindung
async function testDatabaseConnection() {
	try {
		// Erstellen eines neuen Benutzers
		const newUser = {
			userId: 'user123',
			email: 'test@example.com',
			firstName: 'Max',
			lastName: 'Mustermann',
			profileImageUrl: 'https://example.com/profile.jpg'
		};

		// Benutzer einfügen	
		await db.insert(schema.users).values(newUser);
		console.log('Neuer Benutzer erstellt!');

		// Alle Benutzer abrufen
		const allUsers = await db.select().from(schema.users);
		console.log('Alle Benutzer aus der Datenbank:', allUsers);

		// Benutzer aktualisieren
		await db
			.update(schema.users)
			.set({
				firstName: 'Maximilian',
				lastName: 'Musterfrau'
			})
			.where(eq(schema.users.userId, newUser.userId));
		console.log('Benutzerinformationen aktualisiert!');

		const deleteUser = {
			id: 1, // Änderung: String zu Number
		};
		await db.delete(schema.users).where(eq(schema.users.userId, newUser.userId));
		console.log('Benutzer gelöscht!');
	} catch (error) {
		console.error('Fehler bei der Datenbankverbindung:', error);
	}
}
// Nur ausführen, wenn diese Datei direkt gestartet wird
if (require.main === module) {
	testDatabaseConnection();
}
