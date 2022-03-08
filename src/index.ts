import * as md from "eslint-plugin-md";
import rules from "./rules";
import typescriptEslint from "./rules/typescript-eslint.json";

module.exports = {
    extends: [
        // https://github.com/airbnb/javascript/tree/master/packages/eslint-config-airbnb
        "airbnb",
        "airbnb/hooks",
        // https://www.npmjs.com/package/eslint-plugin-jsx-a11y
        "plugin:jsx-a11y/recommended",
        // https://www.npmjs.com/package/eslint-plugin-import
        "plugin:import/errors",
        "plugin:import/warnings",
        "plugin:mocha/recommended",
        // https://www.npmjs.com/package/eslint-plugin-react
        "plugin:react/recommended",
        // https://www.npmjs.com/package/eslint-plugin-react-hooks
        "plugin:react-hooks/recommended",
        "plugin:sonarjs/recommended",
        // https://github.com/azeemba/eslint-plugin-json
        "plugin:json/recommended",
        // https://github.com/leo-buneev/eslint-plugin-md
        "plugin:md/recommended",
        // doit être en dernier
        "plugin:prettier/recommended",
    ],
    plugins: ["mocha-no-only"],
    globals: {
        __DEV__: true,
    },
    env: {
        browser: true,
        es6: true,
        node: true,
        "shared-node-browser": true,
    },
    parserOptions: {
        ecmaVersion: 6,
        sourceType: "module",
        ecmaFeatures: {
            defaultParams: true,
            spread: true,
            jsx: true,
        },
    },
    overrides: [
        {
            files: "**/*.+(ts|tsx)",
            parser: "@typescript-eslint/parser",
            parserOptions: {
                project: "./tsconfig.json",
            },
            plugins: ["@typescript-eslint/eslint-plugin"],
            extends: [
                "airbnb-typescript",
                "plugin:@typescript-eslint/recommended",
                "plugin:@typescript-eslint/recommended-requiring-type-checking",
                "plugin:prettier/recommended",
            ],
            rules: typescriptEslint,
        },
        {
            files: ["*.md"],
            parser: "markdown-eslint-parser",
            parserOptions: {
                project: "./tsconfig.json",
            },
            rules: {
                "lint-maximum-line-length": 0,
                "prettier/prettier": ["error", { parser: "markdown" }],
                "md/remark": [
                    "error",
                    {
                        plugins: [
                            // eslint-disable-next-line ,@typescript-eslint/no-unsafe-assignment,@typescript-eslint/no-unsafe-member-access
                            ...md.configs.prettier.rules["md/remark"][1].plugins,
                            ["lint-maximum-line-length", false],
                        ],
                    },
                ],
            },
        },
    ],
    rules: {
        ...rules.importplugin,
        ...rules.javascript,
        ...rules.json,
        ...rules.mocha,
        ...rules.prettier,
        ...rules.reacthooks,
        ...rules.react,
    },
    settings: {
        "import/resolver": {
            node: {
                extensions: [".js", ".jsx", ".ts", ".tsx", ".d.ts"],
            },
        },
        react: {
            version: "detect",
        },
    },
};
