import type { StorybookConfig } from "@storybook/react-webpack5";
import path from "path";
import { fileURLToPath } from "url";

const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

const config: StorybookConfig = {
  stories: ["../src/**/*.mdx", "../src/**/*.stories.@(js|jsx|mjs|ts|tsx)"],
  addons: [
    "@storybook/addon-webpack5-compiler-swc",
    "@storybook/addon-a11y",
    "@storybook/addon-docs",
    "@storybook/addon-onboarding",
  ],
  webpackFinal: async (config) => {
    config.module = config.module || {};
    config.module.rules = config.module.rules || [];

    config.module.rules = config.module.rules.filter(
      (rule: { test?: RegExp | string | (RegExp | string)[] }) => {
        if (!rule.test) return true;
        if (rule.test instanceof RegExp && rule.test.test("test.module.css")) {
          return false;
        }
        return true;
      },
    );

    config.module.rules.unshift({
      test: /\.module\.css$/,
      sideEffects: true,
      use: [
        "style-loader",
        {
          loader: "css-loader",
          options: {
            modules: {
              mode: "local",
              localIdentName: "[name]__[local]--[hash:base64:5]",
              namedExport: false,
            },
            importLoaders: 2,
          },
        },
        "postcss-loader",
      ],
    });

    config.module.rules.unshift({
      test: /\.css$/,
      exclude: /\.module\.css$/,
      sideEffects: true,
      use: ["style-loader", "css-loader"],
    });

    // Add image support (matching webpack.common.js)
    config.module.rules.unshift({
      test: /\.(png|jpg|gif|webp)$/,
      type: "asset",
      parser: {
        dataUrlCondition: {
          maxSize: 8 * 1024,
        },
      },
      generator: {
        filename: "static/images/[hash][ext][query]",
      },
    });

    if (config.resolve) {
      config.resolve.alias = {
        ...config.resolve.alias,
        "@": path.resolve(__dirname, "../src"),
        "@assets": path.resolve(__dirname, "../src/assets"),
        "@components": path.resolve(__dirname, "../src/components"),
        "@pages": path.resolve(__dirname, "../src/pages"),
        "@services": path.resolve(__dirname, "../src/services"),
        "@utils": path.resolve(__dirname, "../src/utils"),
      };
    }
    return config;
  },
  framework: {
    name: "@storybook/react-webpack5",
    options: {
      builder: {
        useSWC: true,
      },
      dynamicAlias: true,
    },
  },
  docs: {
    autodocs: "tag",
  },
  core: {
    disableTelemetry: true,
  },
  staticDirs: [],
  previewHead: (head) => `
    ${head}
    <style>
      html, body {
        width: 100%;
        margin: 0;
        padding: 0;
        height: 100%;
        overflow: hidden;
      }

      body.sb-show-main {
        box-sizing: border-box;
        padding: 0 !important;
      }

      #storybook-root {
        box-sizing: border-box;
        width: 100%;
        height: 100%;
        padding: 0 !important;
      }
    </style>
  `,
};
export default config;
