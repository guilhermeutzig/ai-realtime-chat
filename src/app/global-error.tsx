"use client";

import { logError } from "@/lib/logger";
import ErrorComponent from "next/error";
import { useEffect } from "react";

export default function GlobalError({ error }: { error: Error }) {
  useEffect(() => {
    logError(error);
  }, [error]);

  return (
    <html>
      <body>
        <ErrorComponent statusCode={500} title="An error occurred." />
      </body>
    </html>
  );
}
