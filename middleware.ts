// export { default } from "next-auth/middleware";

import { withAuth } from "next-auth/middleware";
import { NextResponse } from "next/server";

export default withAuth(
  // `withAuth` augments your `Request` with the user's token.
  function middleware(req) {
    return NextResponse.rewrite(new URL("/dashboard", req.url));
  },
  {
    callbacks: {
      authorized: ({ token }) =>
        token?.role === "admin" || token?.role === "seller",
    },
  }
);
export const config = { matcher: ["/dashboard/:path*"] };
