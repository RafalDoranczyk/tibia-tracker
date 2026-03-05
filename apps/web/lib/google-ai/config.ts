import { GoogleGenAI } from "@google/genai";
import { env } from "@/core/env";

if (!env.GEMINI_API_KEY) {
  throw new Error("Missing GEMINI_API_KEY in environment variables");
}

export const ai = new GoogleGenAI({
  apiKey: env.GEMINI_API_KEY,
});

export const GEMINI_MODEL = "gemini-3-flash-preview";
