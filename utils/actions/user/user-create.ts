"use server";
import { createSupabaseServerClient } from "@/utils/supabase-server";

export const userCreate = async ({
	email,
	first_name,
	last_name,
	profile_image_url,
	user_id,
}: {
	email: string;
	first_name: string;
	last_name: string;
	profile_image_url: string;
	user_id: string;
}) => {
	const supabase = createSupabaseServerClient();

	try {
		const { data, error } = await supabase
			.from("user")
			.insert([{ email, first_name, last_name, profile_image_url, user_id }])
			.select();

		if (error?.code) return error;

		return data;
	} catch (error: any) {
		return error;
	}
};
