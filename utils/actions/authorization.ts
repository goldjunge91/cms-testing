"use server";
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/utils/supabase-server";

export const Authorization = async (site_id: string) => {
	const { userId } = auth();

	if (!userId) {
		return null;
	}

	// Zentrale Supabase-Client-Funktion verwenden
	const supabase = createSupabaseServerClient();

	try {
		const { data, error } = await supabase
			.from("sites")
			.select()
			.eq("user_id", userId)
			.eq("site_id", site_id);

		if (error?.code) return error;

		return data;
	} catch (error: any) {
		return error;
	}
};
