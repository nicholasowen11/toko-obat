import { NextResponse } from "next/server";
import createSupabaseServerClient from "./server";

export default async function updateSession() {
  const supabase = await createSupabaseServerClient();
  const { data, error } = await supabase.auth.getUser();

  console.log("updateSession triggered:", data?.user?.id);

  if (error) {
    console.error("Error fetching user session:", error);
  }

  return NextResponse.next();
}