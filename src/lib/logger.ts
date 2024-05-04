import { captureException } from "@sentry/nextjs";

export const logError = (error: Error) => {
  captureException(error);
};
