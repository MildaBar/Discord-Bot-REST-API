/* eslint-disable */
import path from "path";

export default {
  test: {
    reporters: ["verbose"],
    globals: true,
    coverage: {
      provider: "v8",
    },
  },
  resolve: {
    alias: {
      "@": path.resolve(__dirname, "./src"),
      "@tests": path.resolve(__dirname, "./tests"),
    },
  },
};
