export { default } from "next-auth/middleware";

export const config = {
  matcher: ["/dashboard/:path*", "/studio/:path*", "/insights/:path*", "/account/:path*"],
};
