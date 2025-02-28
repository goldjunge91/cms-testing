"use server";

import { auth } from "@clerk/nextjs/server";
import { createId } from "@paralleldrive/cuid2";
import { revalidatePath } from "next/cache";
import { createSupabaseServerClient } from "@/utils/supabase-server";

// Verbesserte Typdefinition
export type SiteResponse = {
	data?: any[];
	error?: {
		code?: string | number;
		message: string;
		details?: string;
	};
	message?: string;
	status?: number;
};

export const createSite = async (
	siteName: string,
	siteDescription: string,
	siteSubdomain: string,
	siteLogo?: string
): Promise<SiteResponse> => {
	try {
		// Authentifizierung prüfen
		const { userId } = auth();
		if (!userId) {
			return {
				error: {
					message: "Nicht authentifiziert. Bitte melde dich an."
				},
				status: 401
			};
		}

		// Leere Eingaben prüfen
		if (!siteName.trim() || !siteDescription.trim() || !siteSubdomain.trim()) {
			return {
				error: {
					message: "Alle Pflichtfelder müssen ausgefüllt werden."
				},
				status: 400
			};
		}

		// Subdomain validieren
		const subdomainRegex = /^[a-zA-Z0-9-]+$/;
		if (!subdomainRegex.test(siteSubdomain)) {
			return {
				error: {
					message: "Die Subdomain darf nur alphanumerische Zeichen und Bindestriche enthalten.",
					details: "Ungültige Zeichen in der Subdomain gefunden."
				},
				status: 400
			};
		}

		// Subdomain Länge prüfen
		if (siteSubdomain.length > 63) {
			return {
				error: {
					message: "Die Subdomain darf maximal 63 Zeichen enthalten.",
				},
				status: 400
			};
		}

		// Zentrale Supabase-Client-Funktion verwenden
		const supabase = createSupabaseServerClient();

		// Erstelle eindeutige Site-ID
		const siteId = createId();

		// Prüfen, ob die Subdomain bereits existiert
		const { data: existingSubdomain } = await supabase
			.from("sites")
			.select("site_subdomain")
			.eq("site_subdomain", siteSubdomain)
			.single();

		if (existingSubdomain) {
			return {
				error: {
					code: 23505,
					message: "Diese Subdomain ist bereits vergeben. Bitte wähle eine andere.",
				},
				status: 409
			};
		}

		// Site in Datenbank erstellen
		const { data, error } = await supabase
			.from("sites")
			.insert([
				{
					user_id: userId,
					site_id: siteId,
					site_name: siteName,
					site_description: siteDescription,
					site_subdomain: siteSubdomain,
					site_logo: siteLogo || null,
				},
			])
			.select();

		if (error) {
			console.error("Datenbank-Fehler:", error);
			return {
				error: {
					code: error.code,
					message: error.message,
					details: error.details
				},
				status: 500
			};
		}

		// Aktualisiere den Cache
		revalidatePath("/cms");
		revalidatePath("/cms/sites");

		return {
			data,
			message: "Site erfolgreich erstellt!",
			status: 201
		};
	} catch (error: any) {
		console.error("Unerwarteter Fehler:", error);
		return {
			error: {
				message: error?.message || "Ein unerwarteter Fehler ist aufgetreten.",
			},
			status: 500
		};
	}
};



// "use server";

// import { auth } from "@clerk/nextjs/server";
// import { createId } from "@paralleldrive/cuid2";
// import { revalidatePath } from "next/cache";
// import { createServerClient } from "@supabase/ssr";
// import { cookies } from "next/headers";

// // Verbesserte Typdefinition
// export type SiteResponse = {
// 	data?: any[];
// 	error?: {
// 		code?: string | number;
// 		message: string;
// 		details?: string;
// 	};
// 	message?: string;
// 	status?: number;
// };

// export const createSite = async (
// 	siteName: string,
// 	siteDescription: string,
// 	siteSubdomain: string,
// 	siteLogo?: string
// ): Promise<SiteResponse> => {
// 	try {
// 		// Authentifizierung prüfen
// 		const { userId } = auth();
// 		if (!userId) {
// 			return {
// 				error: {
// 					message: "Nicht authentifiziert. Bitte melde dich an."
// 				},
// 				status: 401
// 			};
// 		}

// 		// Leere Eingaben prüfen
// 		if (!siteName.trim() || !siteDescription.trim() || !siteSubdomain.trim()) {
// 			return {
// 				error: {
// 					message: "Alle Pflichtfelder müssen ausgefüllt werden."
// 				},
// 				status: 400
// 			};
// 		}

// 		// Subdomain validieren
// 		const subdomainRegex = /^[a-zA-Z0-9-]+$/;
// 		if (!subdomainRegex.test(siteSubdomain)) {
// 			return {
// 				error: {
// 					message: "Die Subdomain darf nur alphanumerische Zeichen und Bindestriche enthalten.",
// 					details: "Ungültige Zeichen in der Subdomain gefunden."
// 				},
// 				status: 400
// 			};
// 		}

// 		// Subdomain Länge prüfen
// 		if (siteSubdomain.length > 63) {
// 			return {
// 				error: {
// 					message: "Die Subdomain darf maximal 63 Zeichen enthalten.",
// 				},
// 				status: 400
// 			};
// 		}

// 		// Erstelle Supabase-Client mit der aktuellen API
// 		const cookieStore = cookies();
// 		const supabase = createServerClient(
// 			process.env.NEXT_PUBLIC_SUPABASE_URL!,
// 			process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
// 			{
// 				cookies: {
// 					// Die neuen Methoden getAll und setAll verwenden
// 					getAll() {
// 						return cookieStore.getAll().map((cookie) => ({
// 							name: cookie.name,
// 							value: cookie.value,
// 						}));
// 					},
// 					setAll(cookies) {
// 						cookies.forEach((cookie) => {
// 							cookieStore.set(cookie.name, cookie.value, {
// 								...cookie.options,
// 							});
// 						});
// 					},
// 				},
// 			}
// 		);

// 		// Erstelle eindeutige Site-ID
// 		const siteId = createId();

// 		// Prüfen, ob die Subdomain bereits existiert
// 		const { data: existingSubdomain } = await supabase
// 			.from("sites")
// 			.select("site_subdomain")
// 			.eq("site_subdomain", siteSubdomain)
// 			.single();

// 		if (existingSubdomain) {
// 			return {
// 				error: {
// 					code: 23505,
// 					message: "Diese Subdomain ist bereits vergeben. Bitte wähle eine andere.",
// 				},
// 				status: 409
// 			};
// 		}

// 		// Site in Datenbank erstellen
// 		const { data, error } = await supabase
// 			.from("sites")
// 			.insert([
// 				{
// 					user_id: userId,
// 					site_id: siteId,
// 					site_name: siteName,
// 					site_description: siteDescription,
// 					site_subdomain: siteSubdomain,
// 					site_logo: siteLogo || null,
// 				},
// 			])
// 			.select();

// 		if (error) {
// 			console.error("Datenbank-Fehler:", error);
// 			return {
// 				error: {
// 					code: error.code,
// 					message: error.message,
// 					details: error.details
// 				},
// 				status: 500
// 			};
// 		}

// 		// Aktualisiere den Cache
// 		revalidatePath("/cms");
// 		revalidatePath("/cms/sites");

// 		return {
// 			data,
// 			message: "Site erfolgreich erstellt!",
// 			status: 201
// 		};
// 	} catch (error: any) {
// 		console.error("Unerwarteter Fehler:", error);
// 		return {
// 			error: {
// 				message: error?.message || "Ein unerwarteter Fehler ist aufgetreten.",
// 			},
// 			status: 500
// 		};
// 	}
// };
