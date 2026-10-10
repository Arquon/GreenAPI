import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig, loadEnv } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig(({ mode }) => {
   const env = loadEnv(mode, process.cwd(), "");

   return {
      plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
      resolve: {
         tsconfigPaths: true,
      },
      base: env.VITE_APP_BASE_URL,
   };
});
