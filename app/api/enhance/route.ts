import { GoogleGenAI } from '@google/genai';

const ai = new GoogleGenAI({
  apiKey: process.env.GEMINI_API_KEY,
});

export async function POST(req: Request) {
  try {
    const { prompt, instruction, tag } = await req.json();

    const result = await ai.models.generateContent({
      model: 'gemini-2.0-flash',
      contents: [
        {
          role: 'user',
          parts: [
            {
              text: `
Given the original post:
"${prompt}"

With tags:
"${tag}"

Enhance the post using this instruction:
"${instruction}"

Return ONLY a JSON object like:
{
  "enhancedPrompt": "<short, enhanced prompt under 250 characters>",
  "tags": "<comma-separated hashtags like #tag1, #tag2, ... (total under 50 characters)>"
}

Do NOT include explanation or any other text.
`
            }
          ]
        }
      ]
    });

    const raw = result.candidates?.[0]?.content?.parts?.[0]?.text?.trim();
    console.log("Raw Gemini response:", raw);

    // Clean up markdown-style JSON
    const cleaned = raw?.replace(/```json|```/g, '').trim();

    const parsed = JSON.parse(cleaned || '');

    return Response.json(parsed);
  } catch (error) {
    console.error('Enhancement error:', error);
    return new Response(
      JSON.stringify({ error: (error as Error).message || 'Internal server error' }),
      { status: 500 }
    );
  }
}
