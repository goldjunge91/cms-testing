import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export function createSupabaseServerClient() {
  const cookieStore = cookies();
  
  // Hier können wir die Supabase-URL loggen, um zu prüfen
  // Debugging für URL
  const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL || '';
  console.log('Exakte NEXT_PUBLIC_SUPABASE_URL:', supabaseUrl);
  
  return createServerClient(
    supabaseUrl,
    process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
    {
      cookies: {
        getAll() {
          const allCookies = cookieStore.getAll().map((cookie) => ({
            name: cookie.name,
            value: cookie.value,
          }));
          // Protokollieren der Cookies für Debugging-Zwecke
        //   console.log("supa-server cookies:", allCookies);
          return allCookies;
        },
        setAll(cookies) {
          cookies.forEach((cookie) => {
            // Setzen jedes einzelnen Cookies mit den entsprechenden Optionen
            cookieStore.set(cookie.name, cookie.value, {
              ...cookie.options,
            });
          });
        },
      },
    }
  );
}