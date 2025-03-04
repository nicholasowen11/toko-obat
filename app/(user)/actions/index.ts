'use server';

import createSupabaseServerClient from "@/lib/supabase/server";

export async function signOut() {
    const supabase = await createSupabaseServerClient();
    const { error } = await supabase.auth.signOut();

    if(error) {
        console.error("Error signing out:", error);
        throw new Error("Failed to sign out");
    }
}