import express from "express";
import fetch from "node-fetch";
import cors from "cors";
import dotenv from "dotenv";

dotenv.config();

const app = express();
app.use(cors());
app.use(express.json());

app.post("/api/generate", async (req, res) => {
  try {
    const { productName, category } = req.body;

    if (!productName || !category) {
      return res.status(400).json({ error: "Missing input data" });
    }

    const prompt = `
Generate e-commerce product card content.

Return ONLY valid JSON.
No markdown. No explanation.

Product Name: ${productName}
Category: ${category}

{
  "title": "",
  "description": "",
  "tags": []
}
`;

    const groqResponse = await fetch(
      "https://api.groq.com/openai/v1/chat/completions",
      {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.GROQ_API_KEY}`,
        },
        body: JSON.stringify({
          model: "llama-3.1-8b-instant",   // ✅ FIXED MODEL
          messages: [{ role: "user", content: prompt }],
          temperature: 0.3,
        }),
      }
    );

    const data = await groqResponse.json();

    if (!groqResponse.ok) {
      console.error("🔴 GROQ ERROR:", data);
      return res.status(500).json(data);
    }

    const text = data.choices[0].message.content;

    const start = text.indexOf("{");
    const end = text.lastIndexOf("}") + 1;

    if (start === -1 || end === -1) {
      return res.status(500).json({
        error: "Groq did not return valid JSON",
        rawText: text,
      });
    }

    const cleanJson = JSON.parse(text.substring(start, end));
    res.json(cleanJson);
  } catch (err) {
    console.error("🔴 SERVER CRASH:", err);
    res.status(500).json({ error: "Server crashed", details: err.message });
  }
});

app.listen(5000, () => {
  console.log("✅ Backend running on http://localhost:5000");
});
