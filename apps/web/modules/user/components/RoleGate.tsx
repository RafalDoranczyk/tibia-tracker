"use client";

import type { ReactNode } from "react";

import type { UserRole } from "../types";
import { useUser } from "../UserProvider";

export function RoleGate({
  allow,
  children,
  fallback = null,
}: {
  children: ReactNode;
  allow: UserRole[];
  fallback?: ReactNode;
}) {
  const user = useUser();

  if (!user) return <>{fallback}</>;
  if (!allow.includes(user.role)) return <>{fallback}</>;

  return <>{children}</>;
}

export function AdminOnly({
  children,
  fallback = null,
}: {
  children: ReactNode;
  fallback?: ReactNode;
}) {
  return (
    <RoleGate allow={["admin"]} fallback={fallback}>
      {children}
    </RoleGate>
  );
}
