import { Email, UUID, z } from "@repo/validation";
import type { Enums } from "../../types/db";

export const UserIDSchema = UUID;
export type UserID = z.infer<typeof UserIDSchema>;

export const UserRoleEnumSchema = z.enum(["user", "admin"]) satisfies z.ZodType<Enums<"user_role">>;
export type UserRole = z.infer<typeof UserRoleEnumSchema>;

export const AppUserSchema = z
  .object({
    id: UUID,
    email: Email.optional().nullable(),
    role: UserRoleEnumSchema,
  })
  .strict();

export type AppUser = z.infer<typeof AppUserSchema>;

export const OAuthProviderSchema = z.enum(["discord"]);
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;
