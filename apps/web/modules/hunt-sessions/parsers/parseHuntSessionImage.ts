import { ai, GEMINI_MODEL } from "@/lib/google-ai";

import { type AIHuntSessionScan, AIHuntSessionScanSchema } from "../schemas";

const getAiBlueprint = (obj: any) => {
  const blueprint: any = {};
  for (const key in obj) {
    // Proste mapowanie dla czytelności AI
    blueprint[key] = "value";
  }
  return blueprint;
};

const prompt = `.
Role: Professional Tibia Game Data Analyst specialized in UI OCR.
Task: Extract all character and session data from the provided screenshot.
Context: Focus on two main floating containers: "Skills" and "Hunt Analyser". These can be anywhere on the screen.

1. Window: "Skills" (Character Stats)
Locate the container with the header "Skills" and extract data with high precision:
Base Stats:
Level: Extract the numeric value at the very top of the Skills window.
XP: Extract the total experience points (long integer).
Armor, Defense: Extract as integers.
Mitigation: Extract the value next to "Mitigation". If it shows a decimal (e.g., 1.52%), return as float: 1.52.
Skill Levels:
Find the list of combat skills and extract only the numeric values for these specific keys in this exact order: magic, fist, club, sword, axe, distance, shielding, fishing.
Resistances (Elemental Icons):
Identify small icons (circles/squares) with percentage values. Use these keys: physical, fire, earth, energy, ice, holy, death, mana_drain, life_drain.
Precision Requirement: Extract the exact numeric value. Values frequently contain decimals (e.g., 12.34%). Always return the value as a float (e.g., 12.34).
OCR Correction Logic: If the OCR detects a large integer like 1234 or 509 where a percentage is expected, and the visual context shows a decimal should be there, treat it as 12.34 or 5.09.
Constraints:
Maximum allowed value is 100.00.
If an icon is missing or the value is completely unreadable, return null for that specific key.
Do not assume 0 if the icon is not present; use null.

2. Window: "Hunt Analyser" (Session Stats)
- Identification: Locate the container titled "Hunt Analyser".
- Performance Data: Extract "Session" (as string), "Raw XP Gain", "XP Gain", "Raw XP/h", "XP/h", "Loot", "Supplies", "Balance".
- Combat Data: Extract "Damage", "Damage/h", "Healing", "Healing/h".
- Killed Monsters: In the bottom part of this window, find the list of monsters. 
  Format each entry as: {"name": "Monster Name", "amount": number}. 
  Example: "1,234x Demon" becomes {"name": "Demon", "amount": 1234}.

Data Formatting Rules (CRITICAL):
- Numbers: Remove currency symbols (gp), commas (,), dots (.), and percent signs (%).
- Scaling: Convert "k" to thousands (500k = 500000) and "kk" to millions (1.2kk = 1200000).
- Empty states: If a window is not present on the screen, return null for that entire window object.

Output: Return ONLY a valid JSON object matching this structure:
${JSON.stringify(getAiBlueprint(AIHuntSessionScanSchema.shape), null, 2)}
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
