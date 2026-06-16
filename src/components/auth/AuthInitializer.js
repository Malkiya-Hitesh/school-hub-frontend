"use client";
// components/auth/AuthInitializer.js
// Runs once on app load — calls /api/auth/me to hydrate Redux user state
// Place this inside the root layout, inside Providers

import { useEffect } from "react";
import { useDispatch } from "react-redux";

import { authApi } from "@/lib/api";
import { setUser, clearUser, setAuthLoading  } from "../../../store/slices/userSlice";

export default function AuthInitializer() {
  const dispatch = useDispatch();

  useEffect(() => {
    const checkAuth = async () => {
      dispatch(setAuthLoading(true));
      try {
        const { data, ok } = await authApi.me();
        if (ok && data.success) {
          dispatch(setUser(data.user));
        } else {
          dispatch(clearUser());
        }
      } catch {
        dispatch(clearUser());
      }
    };

    checkAuth();
  }, [dispatch]);

  // Renders nothing — only handles state
  return null;
}