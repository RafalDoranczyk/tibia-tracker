export type OAuthProvider = "github" | "google";
export type UserRole = "user" | "admin";

export type AppUser = {
  id: string;
  email?: string | null;
  role: UserRole;
};
