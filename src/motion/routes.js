// Which motion code each route runs. Kept apart from boot.js so site-motion can start this download
// at the same time as boot's, instead of one after the other.
export function loadRoute(pathname)
{
  if (pathname === "/") {
    return import("./home");
  }
  if (pathname.startsWith("/start")) {
    return import("./funnel");
  }
  if (pathname === "/products") {
    return import("./shelf");
  }
  if (pathname === "/how-it-works") {
    return import("./how");
  }
  return import("./inner");
}
