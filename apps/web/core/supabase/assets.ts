import { env } from "@/env";

export function getImageUrl(path?: string) {
  if (!path) return "/placeholder.png";

  return `${env.NEXT_PUBLIC_ASSET_BASE_URL}/${path}`;
}
