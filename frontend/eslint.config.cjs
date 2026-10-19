const typescriptEslint = require("@typescript-eslint/eslint-plugin");
const parser = require("@typescript-eslint/parser");
const prettierPlugin = require("eslint-plugin-prettier");
const react = require("eslint-plugin-react");
const reactHooks = require("eslint-plugin-react-hooks");
const importPlugin = require("eslint-plugin-import");
const jsxA11y = require("eslint-plugin-jsx-a11y");
const eslintComments = require("eslint-plugin-eslint-comments");

const tsFlatConfig = typescriptEslint.configs['flat/recommended'];

module.exports = [
    {
        ignores: [
            "node_modules/**/*",
            "public/**/*",
            "eslint.config.cjs",
            "storybook-static/**/*",
            "build/**/*",
            "dist/**/*",
            "webpack/*.js",
            "package*.json",
            "**/*.d.ts",
            "*.cjs",
            "*.config.cjs"
        ]
    },
    ...tsFlatConfig,
    {
        files: ["./src/**/*.{js,jsx,ts,tsx,json}"],
        languageOptions: {
            parser,
            ecmaVersion: 2020,
            sourceType: 'module',
        },
        settings: {
            react: {
                version: 'detect',
            },
            "import/resolver": {
                typescript: {
                    project: "./tsconfig.json"
                }
            }
        },
        plugins: {
            "@typescript-eslint": typescriptEslint,
            prettier: prettierPlugin,
            react,
            "react-hooks": reactHooks,
            "import": importPlugin,
            "jsx-a11y": jsxA11y,
            "eslint-comments": eslintComments,
        },
        rules: {
            "no-unused-vars": "off",
            "@typescript-eslint/no-unused-vars": ["error"],
            "@typescript-eslint/no-var-requires": "off",
            "@typescript-eslint/explicit-module-boundary-types": "off",
            "react/prop-types": "off",
            "react/jsx-uses-react": "off",
            "react/react-in-jsx-scope": "off",
            "quotes": [2, "single", { avoidEscape: true }],
            "prettier/prettier": "error",
            "import/order": ["error", {
                "groups": ["builtin", "external", "internal", "parent", "sibling", "index"],
                "newlines-between": "always",
                "alphabetize": { "order": "asc" }
            }]
        },
    },
];
