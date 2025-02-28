"use server";

import { createSupabaseServerClient } from '@/utils/supabase-server';

// import { createSupabaseServerClient } from "@/utils/supabase-server";

export const readSiteDomain = async (domain: string) => {
	const supabase = createSupabaseServerClient();

	// middleware
	try {
		const { data, error } = await supabase
			.from("sites")
			.select()
			.eq("site_subdomain", domain);

		if (error?.code) return error;

		return data;
	} catch (error: any) {
		return error;
	}
};
