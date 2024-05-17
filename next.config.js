/* eslint-disable */
/** @type {import("next").NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  webpack(config) {
    const fileLoaderRule = config.module.rules.find((rule) =>
      rule.test?.test?.(".svg"),
    );

    config.module.rules.push(
      {
        ...fileLoaderRule,
        test: /\.svg$/i,
        resourceQuery: /url/,
      },
      {
        test: /\.svg$/i,
        issuer: fileLoaderRule.issuer,
        resourceQuery: { not: [...fileLoaderRule.resourceQuery.not, /url/] },
        use: ["@svgr/webpack"],
      },
    );

    fileLoaderRule.exclude = /\.svg$/i;

    return config;
  },
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

const sentryConfig = withSentryConfig(
  nextConfig,
  {
    silent: true,
    org: "guilherme-utzig",
    project: "ai-realtime-chat",
  },
  {
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);

export default sentryConfig;
