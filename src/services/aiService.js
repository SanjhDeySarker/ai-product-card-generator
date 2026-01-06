const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateProductDetails(productName, category) {
  const prompt = `
You are an AI assistant that generates e-commerce product card content.

RULES:
- Respond ONLY with valid JSON
- Do NOT include markdown
- Do NOT include explanations
- Keep the description under 40 words
- Generate 4 to 6 relevant tags

INPUT:
Product Name: ${productName}
Category: ${category}

OUTPUT FORMAT:
{
  "title": "",
  "description": "",
  "tags": []
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // 🔐 Safety check: handle API errors gracefully
  if (!data.candidates || data.candidates.length === 0) {
    console.error("Gemini API Error:", data);
    throw new Error("No response from Gemini API");
  }

  const text = data.candidates[0].content.parts[0].text;

  // 🧠 Extract JSON safely from AI output
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    throw new Error("Invalid JSON returned by AI");
  }

  return JSON.parse(text.substring(start, end));
}
