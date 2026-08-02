import { NextResponse, type NextRequest } from "next/server";
import { getCloudflareContext } from "@opennextjs/cloudflare";

function addAdminPrivacyHeaders(response: NextResponse) {
  response.headers.set("X-Robots-Tag", "noindex, nofollow, noarchive, nosnippet");
  response.headers.set("Cache-Control", "private, no-store, max-age=0, must-revalidate");
  return response;
}

function getEnvValue(key: string) {
  try {
    const env = getCloudflareContext().env as Record<string, string | undefined> | undefined;
    return env?.[key] ?? process.env[key] ?? "";
  } catch {
    return process.env[key] ?? "";
  }
}

function parseBasicAuth(header: string) {
  if (!header.startsWith("Basic ")) return null;
  try {
    const decoded = atob(header.slice(6));
    const separator = decoded.indexOf(":");
    if (separator < 0) return null;
    return {
      username: decoded.slice(0, separator).trim().toLowerCase(),
      password: decoded.slice(separator + 1),
    };
  } catch {
    return null;
  }
}

function isValidAdminAuth(req: NextRequest) {
  const auth = parseBasicAuth(req.headers.get("authorization") ?? "");
  if (!auth) return false;

  const expectedUsername = (getEnvValue("ADMIN_USERNAME") || "Rick").trim().toLowerCase();
  const expectedPassword = getEnvValue("ADMIN_PASSWORD");

  return Boolean(expectedPassword) && auth.username === expectedUsername && auth.password === expectedPassword;
}

function adminPasswordRequiredResponse() {
  const response = new NextResponse("Admin password required.", { status: 401 });
  response.headers.set("WWW-Authenticate", 'Basic realm="Ketovore Canada Admin", charset="UTF-8"');
  return addAdminPrivacyHeaders(response);
}

export function middleware(req: NextRequest) {
  const pathname = req.nextUrl.pathname;

  if (pathname === "/admin" || pathname.startsWith("/admin/") || pathname.startsWith("/api/admin/")) {
    if (!isValidAdminAuth(req)) {
      return adminPasswordRequiredResponse();
    }
    return addAdminPrivacyHeaders(NextResponse.next());
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/admin", "/admin/:path*", "/api/admin/:path*"],
};
