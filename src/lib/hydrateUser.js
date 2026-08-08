// lib/hydrateUser.js
// Single source of truth for hydrating Redux user state.
// Used by AuthInitializer (on app load) AND after login/register,
// so the user object shape is always identical everywhere.

import { authApi } from "@/lib/api";
import { setUser ,clearUser} from "../../store/slices/userSlice";
// import { setUser, clearUser } from "../store/slices/userSlice";

export async function hydrateUser(dispatch) {
  try {
    const { data, ok } = await authApi.me();

    if (ok && data.success) {
      dispatch(setUser(data.data));
      return true;
    }

    dispatch(clearUser());
    return false;
  } catch {
    dispatch(clearUser());
    return false;
  }
}