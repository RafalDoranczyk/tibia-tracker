import { env } from "@/core/env";

export function getPublicAssetUrl(path?: string) {
  if (!path) return "/placeholder.png";

  return `${env.NEXT_PUBLIC_ASSET_BASE_URL}/${path}`;
}
