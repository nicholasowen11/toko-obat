"use client";

import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { signOut } from "@/app/(user)/actions";

const SignOut = () => {
  const router = useRouter();

  const handleSignOut = async () => {
    try {
      await signOut();
      router.push("/auth"); // Redirect ke halaman login setelah logout
    } catch (error) {
      console.error("Error during sign out:", error);
    }
  };

  return (
    <Button
      onClick={handleSignOut}
      className="w-full bg-red-500 hover:bg-red-600 text-white mt-4"
    >
      Sign Out
    </Button>
  );
};

export default SignOut;