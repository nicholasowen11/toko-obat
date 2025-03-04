import SignOut from "./(user)/components/SignOut";
import createSupabaseServerClient from "@/lib/supabase/server";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import ProductPage from "./(user)/products/page";
import { redirect } from "next/navigation";

export default async function HomePage() {
  const supabase = await createSupabaseServerClient();

  // Ambil user dari Supabase Auth
  const { data: userData, error: userError } = await supabase.auth.getUser();

  if (userError || !userData?.user) {
    console.error("Error fetching user:", userError);
    return redirect("/auth"); // Redirect jika tidak ada user
  }

  const userId = userData.user.id;

  // Ambil role user dari tabel users
  const { data: user, error: userRoleError } = await supabase
    .from("users")
    .select("role")
    .eq("id", userId)
    .maybeSingle(); // Menghindari error jika tidak ada hasil

  if (userRoleError) {
    console.error("Error fetching user role:", userRoleError);
  }

  return (
    <div className="w-full items-center justify-between">
      <div className="flex items-center justify-between">
        <div>
          {/* <Header /> */}
        </div>
        <div className="mr-8">
          {user?.role === "user" ? (
            <SignOut />
          ) : (
            <Link href={"/auth"}>
              <Button>Login</Button>
            </Link>
          )}
        </div>
      </div>
      <div>
        {user?.role === "user" ? (
          <ProductPage />
        ) : (
          <div className="min-h-screen flex flex-col items-center justify-center">
            <h1 className="text-3xl font-bold mb-5">
              Silahkan Login untuk masuk ke Toko Magic 888
            </h1>
            <Link href={"/auth"}>
              <Button>Ayo Masuk</Button>
            </Link>
          </div>
        )}
      </div>
    </div>
  );
}