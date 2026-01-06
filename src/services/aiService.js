const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateProductDetails(productName, category) {
  const prompt = `
You are an AI assistant that generates e-commerce product card content.

RULES:
- Respond ONLY with valid JSON
- No markdown
- No explanations
- Description under 40 words
- 4 to 6 tags

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
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: [
          {
            role: "user",
            parts: [{ text: prompt }],
          },
        ],
      }),
    }
  );

  const data = await response.json();

  // 🔴 LOG FULL RESPONSE IF SOMETHING GOES WRONG
  if (!response.ok) {
    console.error("Gemini HTTP Error:", response.status, data);
    throw new Error("Gemini API request failed");
  }

  if (!data.candidates || data.candidates.length === 0) {
    console.error("Gemini API Empty Response:", data);
    throw new Error("No response from Gemini API");
  }

  const text = data.candidates[0].content.parts[0].text;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    console.error("Invalid AI output:", text);
    throw new Error("Invalid JSON returned by AI");
  }

  return JSON.parse(text.substring(start, end));
}
