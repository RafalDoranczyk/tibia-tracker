import { z } from "zod";

import { Email, UUID } from "@/schemas";

/**
 * OAuth Provider
 */
export const OAuthProvider = z.enum(["github", "google"]);

export type OAuthProvider = z.infer<typeof OAuthProvider>;

/**
 * User Role
 */
export const UserRole = z.enum(["user", "admin"]);

export type UserRole = z.infer<typeof UserRole>;

/**
 * App User
 */
export const AppUserSchema = z
  .object({
    id: UUID,
    email: Email.optional().nullable(),
    role: UserRole,
  })
  .strict();

export type AppUser = z.infer<typeof AppUserSchema>;

export const UserSettingSchema = z.object({
  user_id: UUID,
  last_active_character_id: UUID.optional().nullable(),
});
export type UserSetting = z.infer<typeof UserSettingSchema>;
