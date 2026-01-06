export async function generateProductDetails(productName, category) {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName, category }),
  });

  const data = await response.json();
  const text = data.candidates[0].content.parts[0].text;

  const start = text.indexOf("{");
  const end = text.lastIndexOf("}") + 1;

  return JSON.parse(text.substring(start, end));
}
