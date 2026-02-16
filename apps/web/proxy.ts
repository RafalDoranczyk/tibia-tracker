import { type NextRequest, NextResponse } from "next/server";

import { createSupabaseProxy } from "./core/supabase/auth/proxy";

const PUBLIC_ROUTES = ["/", "/auth", "/auth/callback"];

export async function proxy(request: NextRequest) {
  const { supabase, response } = createSupabaseProxy(request);
  console.log("proxy");
  // IMPORTANT: DO NOT REMOVE auth.getUser()
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const pathname = request.nextUrl.pathname;
  const isPublicRoute = PUBLIC_ROUTES.includes(pathname);

  // ========== AUTH LOGIC ==========
  if (!(isPublicRoute || user)) {
    const url = request.nextUrl.clone();
    url.pathname = "/";
    return NextResponse.redirect(url);
  }

  // IMPORTANT: You *must* return the supabaseResponse object as it is.
  return response;
}

export const config = {
  matcher: ["/dashboard/:path*", "/api/:path*"],
};
