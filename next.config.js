/** @type {import("next").NextConfig} */
import { withSentryConfig } from "@sentry/nextjs";

const nextConfig = {
  images: {
    domains: ["lh3.googleusercontent.com"],
  },
};

const sentryConfig = withSentryConfig(
  nextConfig,
  {
    // Sentry configuration options
    silent: true,
    org: "guilherme-utzig",
    project: "ai-realtime-chat",
  },
  {
    // Additional Sentry options
    widenClientFileUpload: true,
    transpileClientSDK: true,
    hideSourceMaps: true,
    disableLogger: true,
    automaticVercelMonitors: true,
  },
);

export default sentryConfig;
