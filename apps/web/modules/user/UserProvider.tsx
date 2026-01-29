"use client";

import { createContext, useContext } from "react";

import type { AppUser } from "@/modules/user";

const AuthContext = createContext<AppUser | null>(null);

export function UserProvider({
  initialUser,
  children,
}: {
  initialUser: AppUser | null;
  children: React.ReactNode;
}) {
  return <AuthContext.Provider value={initialUser}>{children}</AuthContext.Provider>;
}

export function useUser() {
  return useContext(AuthContext);
}
