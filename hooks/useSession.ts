import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

export function useSession() {
  const [adminId, setAdminId] = useState<string | null>(null);

  useEffect(() => {
    const supabase = createClient();
    async function fetchSession() {
      const { data, error } = await supabase.auth.getUser();
      if (data?.user) {
        setAdminId(data.user.id); // Set the adminId from the session
      } else {
        console.error("User session not found", error);
      }
    }
    fetchSession();
  }, []);

  return adminId;
}