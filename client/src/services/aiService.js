export async function generateProductDetails(productName, category) {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify({
      productName,
      category,
    }),
  });

  // 🔴 If backend is not reachable or route is wrong
  if (!response.ok) {
    throw new Error("Backend API request failed");
  }

  const data = await response.json();

  // 🔴 Safety check
  if (
    !data.candidates ||
    !data.candidates[0] ||
    !data.candidates[0].content ||
    !data.candidates[0].content.parts ||
    !data.candidates[0].content.parts[0]
  ) {
    console.error("Invalid Gemini response:", data);
    throw new Error("Invalid response from Gemini API");
  }

  const text = data.candidates[0].content.parts[0].text;

  // 🧠 Extract JSON from AI text safely
  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  if (start === -1 || end === -1) {
    console.error("AI returned non-JSON text:", text);
    throw new Error("AI did not return valid JSON");
  }

  return JSON.parse(text.substring(start, end));
}
