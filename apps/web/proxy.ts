import { type NextRequest, NextResponse } from "next/server";

import { createSupabaseProxy } from "./core/supabase/proxy";

const PUBLIC_ROUTES = ["/", "/auth", "/auth/callback"];

export async function proxy(request: NextRequest) {
  const { supabase, response } = createSupabaseProxy(request);
  const {
    data: { user },
  } = await supabase.auth.getUser();

  const isPublicRoute = PUBLIC_ROUTES.includes(request.nextUrl.pathname);

  if (!(user || isPublicRoute)) {
    return NextResponse.redirect(new URL("/", request.url));
  }

  return response;
}
