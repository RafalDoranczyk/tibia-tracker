"use client";

import { isDevEnv } from "@/core/env";
import { AppErrorCode, isAppError } from "@/core/error";
import { ErrorPage } from "@/layout/page/ErrorPage";

export default function GlobalError({
  error,
  reset,
}: {
  error: Error & { digest?: string };
  reset: () => void;
}) {
  const errorDetails = getErrorDetails(error);

  return (
    <ErrorPage
      title={errorDetails.title}
      description={errorDetails.description}
      technicalDetails={errorDetails.technicalDetails}
      suggestions={errorDetails.suggestions}
      reset={reset}
      showDetails={isDevEnv()}
      errorCode={isAppError(error) ? error.code : undefined}
      digest={isAppError(error) ? undefined : error.digest}
    />
  );
}

function serializeCause(cause: unknown) {
  if (!cause) return undefined;

  if (cause instanceof Error) {
    return {
      name: cause.name,
      message: cause.message,
      stack: cause.stack,
    };
  }

  return cause;
}

function getErrorDetails(error: Error & { digest?: string }) {
  if (isAppError(error)) {
    return {
      title: getTitleForErrorCode(error.code as AppErrorCode),
      description: error.message,
      technicalDetails: {
        errorCode: error.code,
        timestamp: new Date().toISOString(),
        cause: isDevEnv() ? serializeCause(error.cause) : undefined,
      },
      suggestions: getSuggestionsForErrorCode(error.code as AppErrorCode),
    };
  }

  // fallback
  return {
    title: "Something Went Wrong",
    description: "An unexpected error occurred while processing your request.",
    technicalDetails: {
      errorType: "UnexpectedError",
      timestamp: new Date().toISOString(),
      digest: error.digest,
      message: error.message,
    },
    suggestions: ["Try refreshing the page", "If the problem persists, contact support"],
  };
}

function getTitleForErrorCode(code: AppErrorCode): string {
  const errorTitles: Record<AppErrorCode, string> = {
    [AppErrorCode.NOT_FOUND]: "Not Found",
    [AppErrorCode.UNAUTHORIZED]: "Access Denied",
    [AppErrorCode.PERMISSION_DENIED]: "Permission Denied",
    [AppErrorCode.SERVER_ERROR]: "Server Error",
    [AppErrorCode.VALIDATION_ERROR]: "Validation Error",
    [AppErrorCode.INVALID_PAYLOAD]: "Invalid Data",
    [AppErrorCode.INVALID_QUERY_PARAMS]: "Invalid Request",
    [AppErrorCode.FOREIGN_KEY_VIOLATION]: "Data Conflict",
    [AppErrorCode.UNIQUE_VIOLATION]: "Duplicate Entry",
  };

  return errorTitles[code] || "Error";
}

function getSuggestionsForErrorCode(code: AppErrorCode): string[] {
  const suggestions: Record<AppErrorCode, string[]> = {
    [AppErrorCode.NOT_FOUND]: [
      "Check the URL for typos",
      "Navigate back to the previous page",
      "Contact support if you believe this resource should exist",
    ],
    [AppErrorCode.UNAUTHORIZED]: ["Sign in to your account", "Check if your session has expired"],
    [AppErrorCode.PERMISSION_DENIED]: [
      "You may not have permission to access this resource",
      "Contact your administrator for access",
    ],
    [AppErrorCode.SERVER_ERROR]: [
      "Try refreshing the page",
      "Wait a few minutes and try again",
      "Contact support if the problem persists",
    ],
    [AppErrorCode.VALIDATION_ERROR]: [
      "Check your input data for errors",
      "Ensure all required fields are filled correctly",
    ],
    [AppErrorCode.INVALID_PAYLOAD]: [
      "Check your input data",
      "Ensure all fields are in the correct format",
    ],
    [AppErrorCode.INVALID_QUERY_PARAMS]: [
      "Check the URL parameters",
      "Try using the navigation menu instead",
    ],
    [AppErrorCode.FOREIGN_KEY_VIOLATION]: [
      "The referenced item may no longer exist",
      "Try refreshing the page",
      "Contact support if this continues",
    ],
    [AppErrorCode.UNIQUE_VIOLATION]: [
      "This entry already exists",
      "Try using different values",
      "Check for duplicates",
    ],
  };

  return (
    suggestions[code] || ["Try refreshing the page", "Contact support if the problem persists"]
  );
}
