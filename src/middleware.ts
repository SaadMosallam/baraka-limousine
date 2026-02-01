import createMiddleware from "next-intl/middleware";
import { locales } from "@/i18n/config";

export default createMiddleware({
  locales: locales,
  defaultLocale: "ar",
  localePrefix: "always", // 🔴 VERY IMPORTANT
});

export const config = {
  matcher: ["/((?!_next|_vercel|.*\\..*).*)"],
};
