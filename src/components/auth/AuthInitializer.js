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
      await hydrateUser(dispatch);
      dispatch(setAuthLoading(false)); // ← ye missing tha, isi wajah se authLoading stuck rehta tha
    };

    run();
  }, [dispatch]);

  return null;
}