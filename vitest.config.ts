import { defineConfig } from "vitest/config";

export default defineConfig({
  test: {
    coverage: {
      provider: "v8", // uses @bcoe/v8-coverage behind the scenes
    },
  },
});
