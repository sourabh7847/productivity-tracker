import { defineConfig } from "vite";
import tsconfigPaths from "vite-tsconfig-paths";
import tailwindcss from "@tailwindcss/vite";
import { reactRouter } from "@react-router/dev/vite";

const isProd = process.env.NODE_ENV === "production";

export default defineConfig({
  base: isProd ? "/productivity-tracker/" : "/",
  plugins: [tailwindcss(), reactRouter(), tsconfigPaths()],
});
