const normalize = (path: string) => {
  if (!path) return "/";
  const cleaned = path.split("?")[0].replace(/\/+$/, "");
  return cleaned.startsWith("/") ? cleaned || "/" : `/${cleaned}`;
};

export function isPathActive(pathname: string, href: string) {
  const current = normalize(pathname);
  const target = normalize(href);

  // prefix: target MUST be parent of current
  return current === target;
}
