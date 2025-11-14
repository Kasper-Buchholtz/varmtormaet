/** @type {import("eslint").Linter.Config} */
module.exports = {
  root: true,
  extends: ["@repo/eslint-config/next.js"],
  "plugins": [
    "simple-import-sort",
    "@typescript-eslint"
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  "rules": {
    "simple-import-sort/imports": "warn",
    "simple-import-sort/exports": "warn",
    "react-hooks/exhaustive-deps": "off",  // Changed from "error" to "warn"
    "@typescript-eslint/no-explicit-any": "off",  // Turned off
    "@typescript-eslint/no-unused-vars": "off",  // Added and set to "warn"
    "no-console": "off",  // Turned off
    "react/no-unescaped-entities": "off",
    "@next/next/no-page-custom-font": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off", // Disable requiring return types on functions
    "@typescript-eslint/no-non-null-assertion": "off", // Allow non-null assertions
    "@typescript-eslint/ban-ts-comment": "off", // Allow TypeScript comments (like // @ts-ignore)
    "@typescript-eslint/consistent-type-assertions": "off" // Disable warnings for type assertions
  }
};
