// ======================
// UI – public components
// ======================
export { AuthButtons } from "./components/AuthButtons";
export { AdminOnly, UserRoleGate } from "./components/UserRoleGate";

// ======================
// Providers and hooks
// ======================
export { UserProvider, useUser } from "./providers/UserProvider";

// ======================
// Shared
// ======================
export { type AppUser, AppUserSchema, UserIDSchema, type UserSetting } from "./schemas";
