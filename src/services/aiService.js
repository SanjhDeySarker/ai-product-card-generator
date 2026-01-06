const API_KEY = import.meta.env.VITE_GEMINI_API_KEY;

export async function generateProductDetails(productName, category) {
  const prompt = `
You are an AI assistant that generates e-commerce product card content.

Given a product name and a product category, generate concise, high-quality marketing content.

RULES:
1. Respond ONLY with valid JSON.
2. Do NOT include markdown, explanations, or extra text.
3. Keep the description under 40 words.
4. Generate 4 to 6 relevant keywords.
5. Make the title professional and suitable for an online store.

INPUT:
Product Name: ${productName}
Category: ${category}

OUTPUT FORMAT:
{
  "title": "string",
  "description": "string",
  "tags": ["string"]
}
`;

  const response = await fetch(
    `https://generativelanguage.googleapis.com/v1beta/models/gemini-pro:generateContent?key=${API_KEY}`,
    {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({
        contents: [{ parts: [{ text: prompt }] }],
      }),
    }
  );

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  return JSON.parse(text.substring(start, end));
}
