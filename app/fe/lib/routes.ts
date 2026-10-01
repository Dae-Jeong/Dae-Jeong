export const ROUTES = {
  home: "/",
  resume: "/resume",
  career: "/career",
  cv: "/cv",
  admin: {
    dashboard: "/admin",
    map: "/admin/map",
  },
} as const;

/** Visitor menu shared by the desktop TopBar and MobileNav; the footer keeps its own external-link set. */
export const PRIMARY_NAV = [
  { label: "Home", href: ROUTES.home },
  { label: "Resume", href: ROUTES.resume },
  { label: "Career", href: ROUTES.career },
  { label: "CV", href: ROUTES.cv },
] as const;

/** Old admin addresses only redirect; all private screens live under /admin. */
export const ADMIN_REDIRECTS = [
  {
    source: "/dashboard",
    destination: ROUTES.admin.dashboard,
    permanent: true,
  },
  {
    source: "/applications",
    destination: ROUTES.admin.dashboard,
    permanent: true,
  },
  { source: "/_map", destination: ROUTES.admin.map, permanent: true },
  { source: "/%5Fmap", destination: ROUTES.admin.map, permanent: true },
];

export function isAdminPath(pathname: string) {
  let decoded: string;
  try {
    decoded = decodeURIComponent(pathname).toLowerCase();
  } catch {
    return true;
  }
  return ["/admin", "/api/admin/data"].some(
    (prefix) => decoded === prefix || decoded.startsWith(`${prefix}/`),
  );
}
