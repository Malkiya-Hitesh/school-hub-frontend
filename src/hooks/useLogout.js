"use client";
// lib/hooks/useLogout.js
// Reusable logout hook — call this from any component (navbar, dashboard, etc.)

import { useDispatch }  from "react-redux";
import { useRouter }    from "next/navigation";
// import { clearUser }    from "@/store/slices/userSlice";
import { authApi }      from "@/lib/api";
import { useState }     from "react";
import { clearUser } from "../../store/slices/userSlice";

export function useLogout() {
  const dispatch  = useDispatch();
  const router    = useRouter();
  const [loading, setLoading] = useState(false);

  const logout = async () => {
    setLoading(true);
    try {
      // Tell backend to clear the HTTP-only cookie
      await authApi.logout();
    } catch {
      // Even if backend call fails, clear frontend state
    } finally {
      // Clear Redux state
      dispatch(clearUser());
      // Redirect to login
      router.push("/auth/login");
      setLoading(false);
    }
  };

  return { logout, loading };
}