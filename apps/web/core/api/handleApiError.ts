import { NextResponse } from "next/server";

import { AppError, type AppErrorCode } from "@/core/error";

import { mapAppErrorCodeToHttpStatus } from "./mapAppErrorCodeToHttpStatus";

export function handleApiError(e: unknown) {
  if (e instanceof AppError) {
    return NextResponse.json(
      { error: e.message },
      { status: mapAppErrorCodeToHttpStatus(e.code as AppErrorCode) }
    );
  }

  return NextResponse.json({ error: "Internal Server Error" }, { status: 500 });
}
