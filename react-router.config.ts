import type { Config } from "@react-router/dev/config";

const isProd = process.env.NODE_ENV === "production";

export default {
  ssr: false,
  basename: isProd ? "/productivity-tracker" : "/",
} satisfies Config;
