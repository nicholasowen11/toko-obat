import { NextResponse, type NextRequest } from "next/server";
import updateSession from "../lib/supabase/middleware";

export async function middleware(request: NextRequest) {
    const response = NextResponse.next();

    if(!request.nextUrl.pathname.startsWith('/auth')) {
        return await updateSession(request);
    }

    return response;
}

export const config = {
  matcher: [
    "/((?!_next/static|_next/image|favicon.ico|.*\\.(?:svg|png|jpg|jpeg|gif|webp)$).*)",
  ],
};