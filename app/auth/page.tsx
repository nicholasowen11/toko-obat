import React from "react";
import { redirect } from "next/navigation";
import { AuthForm } from "./components/AuthForm";
import createSupabaseServerClient from "@/lib/supabase/server";

export default async function Page() {
  const supabase = await createSupabaseServerClient();
  
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="w-96">
          <AuthForm />
        </div>
      </div>
    );
  }

  const userId = userData.user.id;

  // Get the role of the user
  let { data: user, error: userRoleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .maybeSingle();

  if (userRoleError) {
    console.error("Error fetching user role:", userRoleError);
  }

  // If user is an admin, redirect to admin dashboard
  if (user?.role === "admin") {
    return redirect("/admin");
  }

  return redirect("/products");
}
