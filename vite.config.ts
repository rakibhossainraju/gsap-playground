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
  build: {
    rollupOptions: {
      output: {},
    },
  },
});
