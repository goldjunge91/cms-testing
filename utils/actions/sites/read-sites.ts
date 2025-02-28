"use server"
import { auth } from "@clerk/nextjs/server";
import { createSupabaseServerClient } from "@/utils/supabase-server";

export const readSites = async () => {
	const { userId } = auth();

	if (!userId) {
		return null;
	}

	const supabase = createSupabaseServerClient();

	try {
		const { data, error } = await supabase
			.from("sites")
			.select()
			.eq("user_id", userId);

		if (error?.code) return error;

		return data;
	} catch (error: any) {
		return error;
	}
};
