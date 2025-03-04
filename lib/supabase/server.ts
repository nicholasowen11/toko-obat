"use server";

import { createServerClient } from "@supabase/ssr";
import { cookies } from "next/headers";

export default async function createSupabaseServerClient() {
    const cookieStore = await cookies();

    return createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
            cookies: {
                getAll: () => cookieStore.getAll(), // ✅ Tidak menggunakan instance class
                setAll: (cookiesToSet) => {
                    try {
                        cookiesToSet.forEach(({ name, value, options }) =>
                            cookieStore.set(name, value, options)
                        );
                    } catch (error) {
                        console.error("Cookie Set Error:", error);
                    }
                },
            },
        }
    );
}