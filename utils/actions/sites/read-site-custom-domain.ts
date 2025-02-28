"use server";
import { createSupabaseServerClient } from "@/utils/supabase-server";

export const readSiteCustomDomain = async (domain: string) => {
	const supabase = createSupabaseServerClient();

	try {
		const { data, error } = await supabase
			.from("sites")
			.select()
			.eq("site_custom_domain", domain);

		if (error?.code) return error;

		return data;
	} catch (error: any) {
		return error;
	}
};
