import { env } from "./createEnv";

export function isDevEnv() {
  return env.NODE_ENV === "development";
}
