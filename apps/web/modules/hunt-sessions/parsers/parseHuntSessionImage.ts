import { ai, GEMINI_MODEL } from "@/lib/google-ai";

import { type AIHuntSessionScan, AIHuntSessionScanSchema } from "../schemas";

const getAiBlueprint = () => {
  return {
    skills_window: {
      level: 0,
      xp: 0,
      armor: 0,
      defense: 0,
      mitigation: 0.0,
      skills: { magic: 0, sword: 0, etc: 0 },
      resistances: { physical: 0.0, fire: 0.0, etc: 0.0 },
    },
    hunt_analyser: {
      session: "00:00h",
      raw_xp_gain: 0,
      xp_gain: 0,
      raw_xp_h: 0,
      xp_h: 0,
      loot: 0,
      supplies: 0,
      balance: 0,
      damage: 0,
      damage_h: 0,
      healing: 0,
      healing_h: 0,
      killed_monsters: [{ name: "string", amount: 0 }],
    },
  };
};

const prompt = `
Role: Tibia UI Specialist & OCR Expert.
Task: Extract data from "Skills" and "Hunt Analyser" windows.

### DATA PROCESSING RULES:
- Numbers: Remove "gp", "x", commas, and "%".
- Values with 'k': Convert to thousands (e.g., 500k -> 500000).
- Values with 'kk': Convert to millions (e.g., 1.5kk -> 1500000).
- Percentages: Return as floats (e.g., 12.34% -> 12.34).
- Missing Data: If a window is missing, return null for its key. If an icon/skill is missing, return null.

### 1. SKILLS WINDOW
Extract directly into "skills_window":
- Numeric values for: level, xp, armor, defense, mitigation.
- Object "skills": all combat skills (magic, fist, club, sword, axe, distance, shielding, fishing).
- Object "resistances": all elemental icons (physical, fire, earth, energy, ice, holy, death, mana_drain, life_drain).

### 2. HUNT ANALYSER WINDOW
Extract directly into "hunt_analyser" (STRICTLY FLAT STRUCTURE, NO SUB-OBJECTS):
- Fields: session, raw_xp_gain, xp_gain, raw_xp_h, xp_h, loot, supplies, balance, damage, damage_h, healing, healing_h.
- List "killed_monsters": array of { name: string, amount: number }.

### OUTPUT FORMAT:
Return ONLY a valid JSON object matching this exact structure:
${JSON.stringify(getAiBlueprint(), null, 2)}
`;

export async function parseHuntSessionImage(
  base64Image: string
): Promise<{ success: boolean; data?: AIHuntSessionScan; error?: string }> {
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
    if (!text) throw new Error("Empty response from AI service");

    console.log("AI Service Raw Output:", text);

    const cleanJson = text.replace(/```json|```/g, "").trim();
    const rawData = JSON.parse(cleanJson);

    const validatedData = AIHuntSessionScanSchema.parse(rawData);

    return { success: true, data: validatedData };
  } catch (error) {
    console.error("AI Service Error:", error);
    return { success: false, error: "Failed to process image" };
  }
}
