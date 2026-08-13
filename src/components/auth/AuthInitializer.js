"use client";
// components/auth/AuthInitializer.js
// Runs once on app load — hydrates Redux user state from /api/auth/me

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { hydrateUser } from "@/lib/hydrateUser";
import { setAuthLoading } from "../../../store/slices/userSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const run = async () => {
      dispatch(setAuthLoading(true));

      let hydrated = false;
      for (let attempt = 1; attempt <= 3; attempt++) {
        try {
          hydrated = await hydrateUser(dispatch);
          if (hydrated) break;
          await new Promise((r) => setTimeout(r, 500 * attempt));
        } catch (e) {
          // ignore and retry
        }
      }

      dispatch(setAuthLoading(false)); // ensure loading flag cleared even if hydrate fails
    };

    run();
  }, [dispatch]);

  return null;
}