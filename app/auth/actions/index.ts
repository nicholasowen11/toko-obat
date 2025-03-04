"use server";

import createSupabaseServerClient from "@/lib/supabase/server";

export async function signUpWithEmailAndPassword({
    email,
    password,
    role,
}: { email: string; password: string; role: string }) {
    const supabase = await createSupabaseServerClient();

    // **🔍 Cek apakah email sudah ada di tabel `users`**
    const { data: existingUser } = await supabase
        .from("users")
        .select("id")
        .eq("email", email)
        .single();

    if (existingUser) {
        return JSON.stringify({ error: { message: "Email is already in use" } });
    }

    // **📌 Lanjutkan sign-up jika email belum terdaftar**
    const { data, error } = await supabase.auth.signUp({
        email,
        password,
    });

    if (error) {
        console.error("Error during signup:", error);
        return JSON.stringify({ error });
    }

    const userId = data.user?.id;
    if (userId) {
        // **💾 Masukkan user ke tabel `users`**
        const { error: insertError } = await supabase.from("users").insert([
            { id: userId, email, role },
        ]);

        if (insertError) {
            console.error("Error inserting user to database:", insertError);
            return JSON.stringify({ error: insertError });
        }

        console.log("User successfully inserted into users table.");
    } else {
        console.error("Signup successful but no user ID returned.");
    }

    // **🎯 Redirect ke halaman berdasarkan role**
    return JSON.stringify({ redirect: role === "admin" ? "/admin" : "/products" });
}

export async function signInWithEmailAndPassword({
    email,
    password,
}: { email: string; password: string }) {
    const supabase = await createSupabaseServerClient();

    const { data, error } = await supabase.auth.signInWithPassword({
        email,
        password,
    });

    if (error) {
        console.error("Login failed:", error);
        return JSON.stringify({
            error: { code: "invalid_credentials", message: "Invalid email or password." },
        });
    }

    const userId = data.user?.id;

    if (!userId) {
        return JSON.stringify({ error: { message: "User ID not found." } });
    }

    // **🔍 Ambil role dari database**
    const { data: user, error: userError } = await supabase
        .from("users")
        .select("role")
        .eq("id", userId)
        .single();

    if (userError || !user) {
        console.error("Error fetching user role:", userError);
        return JSON.stringify({ error: { message: "Failed to fetch user role." } });
    }

    // **🎯 Redirect ke halaman berdasarkan role**
    return JSON.stringify({ redirect: user.role === "admin" ? "/admin" : "/products" });
}