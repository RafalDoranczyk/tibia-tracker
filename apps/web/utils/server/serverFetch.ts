"use server";

import { headers } from "next/headers";

export async function serverFetch(path: string, init?: RequestInit) {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || process.env.VERCEL_URL;

  return fetch(`${baseUrl}${path}`, {
    ...init,
    headers: {
      ...init?.headers,
      Cookie: (await headers()).get("cookie") ?? "",
    },
  });
}
