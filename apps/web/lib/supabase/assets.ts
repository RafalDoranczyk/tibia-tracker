export function getImageUrl(path?: string) {
  if (!path) return "/placeholder.png";

  return `${process.env.NEXT_PUBLIC_ASSET_BASE_URL}/${path}`;
}
