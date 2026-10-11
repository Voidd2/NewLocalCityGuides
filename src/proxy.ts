import createMiddleware from "next-intl/middleware";
import { routing } from "./i18n/routing";

const intlProxy = createMiddleware(routing);

export function proxy(request: Parameters<typeof intlProxy>[0]) {
  return intlProxy(request);
}

export const config = {
  matcher: ["/((?!api|pwa|icon(?:/|$)|apple-icon(?:/|$)|opengraph-image(?:/|$)|_next|_vercel|.*\\..*).*)"],
};
