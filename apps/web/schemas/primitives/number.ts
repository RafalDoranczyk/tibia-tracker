import { z } from "zod";

export const PositiveNumber = z.number().min(0);
export const PositiveNumberNonZero = z.number().min(1);
