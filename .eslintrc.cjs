module.exports = {
  env: { browser: true, es2020: true, node: true },
  extends: [
    "eskiu/ts-react",
    "next/core-web-vitals",
    "plugin:valtio/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: "./tsconfig.json",
    ecmaVersion: "latest",
    sourceType: "module",
  },
  plugins: [],
  rules: {
    "arrow-body-style": "off",
    "quote-props": "off",
    "no-duplicate-imports": "off",
    "react/function-component-definition": "off",
  },
};
