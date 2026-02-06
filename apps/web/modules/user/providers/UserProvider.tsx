"use client";

import { createContext, type PropsWithChildren, useContext } from "react";

import type { AppUser } from "@/modules/user";

type UserContextType = AppUser | null;

const AuthContext = createContext<UserContextType>(null);

export function UserProvider({
  initialUser,
  children,
}: PropsWithChildren<{
  initialUser: UserContextType;
}>) {
  return <AuthContext.Provider value={initialUser}>{children}</AuthContext.Provider>;
}

export function useUser() {
  return useContext(AuthContext);
}
