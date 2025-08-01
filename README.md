# 📱 Promptly — AI-Enhanced Social Prompt Sharing App

Promptly is a full-stack social web app where users can create, enhance, and share meaningful text prompts with AI assistance and hashtag tagging. Built using **Next.js**, **Tailwind CSS**, **NextAuth**, and **Gemini AI**, the app features real-time prompt enhancement, tag validation, and user profile management.

## ✨ Features

- 🔐 **Authentication** — Secure login using NextAuth (e.g., Google Sign-In)
- 🧠 **AI-Powered Enhancer** — Uses Gemini AI to refine and enhance user prompts
- 🏷️ **Smart Tagging** — Validates hashtag formats (`#tag1, #tag2`) with character limits
- 📤 **Prompt Sharing** — Share thoughts, ideas, or content in a card-based layout
- 👤 **Profile Pages** — View all posts by a user in a clean, minimal UI
- 📋 **Copy to Clipboard** — One-click copy for sharing prompts

---

## 🛠️ Tech Stack

- **Frontend**: Next.js 14, Tailwind CSS
- **Auth**: NextAuth.js
- **AI**: Google Gemini API (via `@google/genai`)
- **Storage**: MongoDB with Mongoose
- **Styling**: Tailwind CSS, Gradient Text

---

## 🔧 Setup Instructions

1. **Clone the repo**
   ```bash
   git clone https://github.com/abhishekmaniy/prompt-ai.git
   cd promptly-app

2. **Install dependencies**
npm install

3. **Set up environment variables**

Create a .env.local file in the root:
GOOGLE_CLIENT_ID=your_google_client_id
GOOGLE_CLIENT_SECRET=your_google_client_secret
NEXTAUTH_SECRET=your_nextauth_secret
MONGODB_URI=your_mongo_connection_uri
GEMINI_API_KEY=your_google_gemini_api_key


4. **Run the app**
npm run dev

🤖 AI Prompt Enhancement
Using Google Gemini API:

Sends original prompt, tags, and user instruction

Returns JSON with enhancedPrompt and tags

JSON is parsed and shown immediately in the UI


🧑‍💻 Author
Made with ❤️ by Abhishek Maniyar
