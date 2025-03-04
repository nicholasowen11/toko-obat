"use server";

import createSupabaseServerClient from "../supabase/server";

export default async function readUserSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();
  
  if (error || !data.user) {
    return null; // Kembalikan null jika tidak ada user
  }

  return data.user; // Langsung kembalikan user object
}