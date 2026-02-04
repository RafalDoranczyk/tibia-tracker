"use client";

import type { ReactNode } from "react";

import { useUser } from "../providers/UserProvider";
import type { UserRole } from "../schemas";

export function UserRoleGate({
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
    <UserRoleGate allow={["admin"]} fallback={fallback}>
      {children}
    </UserRoleGate>
  );
}
