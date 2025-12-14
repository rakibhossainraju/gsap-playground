import { type Alias, type AliasOptions, defineConfig } from "vite";
import react from "@vitejs/plugin-react";
import tailwindcss from "@tailwindcss/vite";
import tsConfig from "./tsconfig.app.json";
import * as path from "node:path";

const importTypeAlias = (): AliasOptions => {
  const alias: Alias[] = [];
  for (const [key, value] of Object.entries(tsConfig.compilerOptions.paths)) {
    const find = key.replace("/*", "");
    const replacement = path.resolve(value[0].replace("/*", ""));

    alias.push({ find, replacement });
  }
  return alias as AliasOptions;
};

const inputSourceMap = {
  "3d-text": "examples/3d-text-rotation/index.html",
} as const;

const input =
  inputSourceMap[process.env.PROJECT_TO_RUN as keyof typeof inputSourceMap] ||
  "index.html";

// https://vite.dev/config/
export default defineConfig({
  plugins: [
    tailwindcss(),
    react({
      babel: {
        plugins: [["babel-plugin-react-compiler"]],
      },
    }),
  ],
  resolve: {
    alias: importTypeAlias(),
  },
  server: {
    open: `/${input}`,
  },
  build: {
    rollupOptions: {
      input,
      output: {},
    },
  },
});
