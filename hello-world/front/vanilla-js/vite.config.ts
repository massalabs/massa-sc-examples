import { defineConfig } from "vite";
import { nodePolyfills } from "vite-plugin-node-polyfills";

// https://vitejs.dev/config/
export default defineConfig({
  plugins: [nodePolyfills()],
  resolve: {
    alias: {
      lodash: "lodash-es",
    },
  },
  build: {
    rollupOptions: {
      external: ["lodash"],
    },
  },
});
