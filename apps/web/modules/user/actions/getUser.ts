"use server";

import { cache } from "react";

import { AppError, AppErrorCodes } from "@/core/errors";
import { createSupabase, mapSupabaseErrorToAppError } from "@/core/supabase";

import type { AppUser } from "../schemas";

async function internalGetUser(): Promise<AppUser> {
  try {
    const supabase = await createSupabase();

    const {
      data: { user },
      error,
    } = await supabase.auth.getUser();

    if (error) throw mapSupabaseErrorToAppError(error);
    if (!user) throw new AppError(AppErrorCodes.UNAUTHORIZED, "User not authenticated");

    const { data: roleData } = await supabase
      .from("user_roles")
      .select("role")
      .eq("user_id", user.id)
      .maybeSingle();

    return {
      id: user.id,
      email: user.email,
      role: roleData?.role ?? "user",
    };
  } catch (error) {
    if (error instanceof AppError) throw error;
    throw new AppError(AppErrorCodes.SERVER_ERROR, "Failed to get user");
  }
}

export const getUser = cache(internalGetUser);
