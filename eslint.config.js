import js from "@eslint/js";
import globals from "globals";

export default [
  { ignores: ["dist/", "node_modules/"] },
  js.configs.recommended,
  {
    languageOptions: {
      ecmaVersion: "latest",
      sourceType: "module",
      globals: { ...globals.browser },
    },
    rules: {
      "no-unused-vars": "error",
      "no-unreachable": "error",
    },
  },
  {
    files: ["scripts/**", "*.config.js"],
    languageOptions: { globals: { ...globals.node } },
  },
  {
    files: ["public/js/**"],
    languageOptions: { sourceType: "script" },
  },
];
