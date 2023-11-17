/** @type {import("prettier").Config} */
module.exports = {
  useTabs: false,
  tabWidth: 2,
  semi: true,
  singleQuote: false,

  arrowParens: "avoid",

  plugins: ["prettier-plugin-tailwindcss"],
  tailwindFunctions: ["t", "clsx", "cn", "cva", "twMerge"],
};
