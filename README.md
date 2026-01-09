AI Product Card Generator
📌 Project Overview

The AI Product Card Generator is a web application that generates product card details such as title, description, and tags using an AI model.
Users provide a product name and category, and the app generates concise, marketing-friendly content that is displayed in a styled product card.

This project was built as part of Assignment 2: AI Content Generator for Product Cards.

🛠 Tech Stack
Frontend

React (Vite)

JavaScript

Basic CSS for styling

Backend

Node.js

Express.js

REST API architecture

AI

Groq API

Model: llama-3.1-8b-instant

🧱 Application Architecture
React (Frontend)
   ↓ REST API
Node.js / Express (Backend)
   ↓
Groq AI API (LLM)

Why this architecture?

Keeps the API key secure (not exposed in frontend)

Avoids CORS and browser API restrictions

Follows industry best practices

Makes the app scalable and production-ready

🤖 How AI Is Used

AI is used to generate product content dynamically.

Flow:

User enters product name and category

Frontend sends data to backend (/api/generate)

Backend sends a structured prompt to the AI model

AI returns product content in JSON format

Backend parses and sends clean JSON to frontend

Frontend renders the content as a product card

Example AI Prompt
Generate e-commerce product card content.

Return ONLY valid JSON.

Product Name: Laptop
Category: Electronics

{
  "title": "",
  "description": "",
  "tags": []
}

AI Output Example
{
  "title": "High-Performance Laptop",
  "description": "A powerful laptop designed for multitasking, productivity, and everyday computing needs.",
  "tags": ["laptop", "electronics", "performance", "portable", "technology"]
}

🎨 Design Choices

Minimal UI to keep focus on functionality

Card-based layout for clear visual presentation

Loading state to improve user experience

Simple state management using React hooks

JSON-based AI responses for reliability and easy parsing

▶️ How to Run the Project
1️⃣ Clone the Repository
git clone <your-github-repo-url>
cd ai-product-card-generator

2️⃣ Start Backend
cd server
npm install
node index.js


Backend will run at:

http://localhost:5000

3️⃣ Start Frontend
cd client
npm install
npm run dev


Frontend will run at:

http://localhost:5173

🔐 Environment Variables

Create a .env file inside the server folder:

GROQ_API_KEY=your_api_key_here


⚠️ Do not commit .env to GitHub

✅ Features Implemented

AI-powered content generation

REST-based AI integration

Clean product card UI

Loading indicator

Error handling
📌 Conclusion:
This project demonstrates how AI can be integrated into a modern web application using a clean frontend-backend separation, secure API handling, and structured AI prompts to generate reliable and reusable content.

This project demonstrates how AI can be integrated into a modern web application using a clean frontend-backend separation, secure API handling, and structured AI prompts to generate reliable and reusable content.

Secure API key handling
