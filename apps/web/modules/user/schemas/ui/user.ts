import { z } from "zod";

import { Email, UUID } from "@/lib/zod";

import { UserRoleEnumSchema } from "../db/user.schema";

export const AppUserSchema = z
  .object({
    id: UUID,
    email: Email.optional().nullable(),
    role: UserRoleEnumSchema,
  })
  .strict();

export type AppUser = z.infer<typeof AppUserSchema>;

export const OAuthProviderSchema = z.enum(["github", "google"]);
export type OAuthProvider = z.infer<typeof OAuthProviderSchema>;
