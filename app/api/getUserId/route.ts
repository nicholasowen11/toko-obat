import { NextResponse } from "next/server";
import createSupabaseServerClient from "@/lib/supabase/server";

export async function GET() {
    const supabase = await createSupabaseServerClient();
    
    // Dapatkan user yang sedang login
    const { data: userData, error: authError } = await supabase.auth.getUser();

    if (authError || !userData?.user) {
        return NextResponse.json({ error: "Unauthorized" }, { status: 401 });
    }

    const userId = userData.user.id;

    // Ambil role dari tabel users di Supabase
    const { data: userRoleData, error: roleError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

    if (roleError || !userRoleData) {
        return NextResponse.json({ error: "User role not found" }, { status: 403 });
    }

    return NextResponse.json({
        userId: userId,
        role: userRoleData.role, // Role diambil dari tabel users
    });
}