"use client";

import type { ReactNode } from "react";

import { useUser } from "../providers/UserProvider";
import type { UserRole } from "../schemas/user.schema";

// Component that conditionally renders its children based on the user's role.
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

// Convenience component for admin-only access.
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
