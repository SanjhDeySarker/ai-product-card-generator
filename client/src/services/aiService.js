export async function generateProductDetails(productName, category) {
  const response = await fetch("http://localhost:5000/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({ productName, category }),
  });

  if (!response.ok) {
    throw new Error("Backend request failed");
  }

  return await response.json();
}
