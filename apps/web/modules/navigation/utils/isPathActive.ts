export function isPathActive(
  pathname: string,
  href: string,
  strategy: "exact" | "prefix" = "exact"
) {
  const cleanPath = pathname.split("?")[0];

  if (strategy === "exact") {
    return cleanPath === href;
  }

  const pathSegments = cleanPath.split("/").filter(Boolean);
  const hrefSegments = href.split("/").filter(Boolean);

  if (hrefSegments.length === 0) return cleanPath === href;

  return hrefSegments.every((segment, index) => pathSegments[index] === segment);
}
