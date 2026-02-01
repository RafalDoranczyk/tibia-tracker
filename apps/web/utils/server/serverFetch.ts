"use server";

import { headers } from "next/headers";

import { env } from "@/env";

export async function serverFetch(path: string, init?: RequestInit) {
  return fetch(`${env.NEXT_PUBLIC_APP_URL}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: (await headers()).get("cookie") ?? "",
    },
  });
}
