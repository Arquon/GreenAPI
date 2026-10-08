import react, { reactCompilerPreset } from "@vitejs/plugin-react";
import babel from "@rolldown/plugin-babel";
import { defineConfig } from "vite";
import tailwindcss from "@tailwindcss/vite";
import svgr from "vite-plugin-svgr";

export default defineConfig({
   plugins: [tailwindcss(), react(), babel({ presets: [reactCompilerPreset()] }), svgr()],
   resolve: {
      tsconfigPaths: true,
   },
});
