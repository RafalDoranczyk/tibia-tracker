import { ai, GEMINI_MODEL } from "@/lib/google-ai";

import { type AIMonsterScanResult, AIMonsterScanResultSchema } from "../schemas";

const prompt = `You are a high-precision OCR and Object Detection assistant specialized in Tibia's UI.

TARGET AREA: The grid of monster cards in the Cyclopedia.

DETECTION LOGIC FOR "HAS_SOUL":
1. The "Soul icon" is a SPECIFIC graphical badge: a golden/silver triangle with a blue square inside, overlaying the top-left corner of the monster's portrait.
2. LOOK AT THE BORDER: If the top-left corner is just a plain, dark, stone-textured 90-degree angle, HAS_SOUL is FALSE.
3. LOOK FOR THE OVERLAY: If there is a distinct, brighter, decorative element covering that corner, HAS_SOUL is TRUE.
4. VERIFICATION: Check "Toad", "Green Frog", and "Bog Frog" in this image. They are the reference for TRUE. Compare every other monster to them. If it doesn't look EXACTLY like their corner, it is FALSE.
DETECTION LOGIC FOR "STAGE":
- Locate the icon or text below the monster's name.
- Green checkmark icon = stage 3.
- "2/3" text = stage 2.
- "1/3" text = stage 1.
- "0/3" text = stage 0.

OUTPUT FORMAT:
Return ONLY a JSON array of objects:
[{"name": "string", "stage": number, "has_soul": boolean}]

Be extremely strict. If there is a badge in the corner, it MUST be true.

Ignore any other UI elements like sidebar menus, headers, or window buttons. Ensure the monster names are captured accurately as they appear.`;

export async function parseBestiaryImage(
  base64Image: string
): Promise<{ success: boolean; data?: AIMonsterScanResult; error?: string }> {
  try {
    const response = await ai.models.generateContent({
      model: GEMINI_MODEL,
      config: {
        temperature: 0.1,
        topP: 0.1,
      },
      contents: [
        {
          role: "user",
          parts: [
            { text: prompt },
            {
              inlineData: {
                data: base64Image,
                mimeType: "image/png",
              },
            },
          ],
        },
      ],
    });

    const text = response.text;
    if (!text) throw new Error("Empty response from Gemini 3");

    console.log("Gemini 3 Raw Output:", text);

    const cleanJson = text.replace(/```json|```/g, "").trim();
    const rawData = JSON.parse(cleanJson);

    const validatedData = AIMonsterScanResultSchema.parse({ monsters: rawData });

    return { success: true, data: validatedData };
  } catch (error) {
    console.error("Gemini 3 Error:", error);
    return { success: false, error: "Failed to process image with Gemini 3" };
  }
}
