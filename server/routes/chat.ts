// server/routes/chat.ts
import type { RequestHandler } from "express";

// This is the local fallback reply
function localAssistantReply(message: string) {
  const templates = [
    `Aww Dhwani, that's so sweet! 💖`,
    `You're making my day brighter just by sharing — thank you! 🎀`,
    `I can't wait to celebrate with you—sending virtual confetti! 🎉`,
    `You deserve the biggest slice of cake today 🍰 and all the smiles!`,
    `That sounds amazing! Tell me more and I'll add some sparkle ✨`,
  ];
  const idx = Math.min(Math.abs(hashCode(message)) % templates.length, templates.length - 1);
  return `${templates[idx]}`;
}

function hashCode(str: string) {
  let h = 0;
  for (let i = 0; i < str.length; i++) {
    h = (h << 5) - h + str.charCodeAt(i);
    h |= 0;
  }
  return h;
}

// Helper to format history for Google Gemini
function buildGeminiMessages(history: { role: string; content: string }[], newMessage: string) {
  const systemPrompt = {
    role: "user", // Gemini uses 'user' for system prompts in the 'contents' array
    parts: [{ text: "You are Rishi talking to Dhwani on her birthday. Talk naturally like a close friend - warm, genuine, and caring. Congratulate her, share happy birthday wishes, and chat like friends do. Keep responses conversational (2-4 sentences), warm, and genuine. Use emojis occasionally like 🎉💖✨. Remember you're Rishi, her friend, not just a chatbot - be personal, kind, and celebrate her special day while keeping the friendly vibe going." }]
  };
  
  const modelPrompt = {
    role: "model",
    parts: [{ text: "Got it, I'll be Rishi, her warm and friendly chat buddy. Let's celebrate Dhwani's birthday! 💖" }]
  };

  const contents = [systemPrompt, modelPrompt];
  
  history.forEach(msg => {
    contents.push({
      role: msg.role === "assistant" ? "model" : "user",
      parts: [{ text: msg.content }]
    });
  });

  contents.push({
    role: "user",
    parts: [{ text: newMessage }]
  });

  return contents;
}


export const handleChat: RequestHandler = async (req, res) => {
  const { message, history } = req.body as { message: string; history?: { role: string; content: string }[] };
  if (!message) return res.status(400).json({ error: "Missing message" });

  // --- THIS IS THE FIX ---
  // 1. Get the GEMINI_API_KEY
  const GEMINI_API_KEY = process.env.GEMINI_API_KEY;

  // 2. If no key, use the local fallback
  if (!GEMINI_API_KEY || GEMINI_API_KEY.length < 20) {
    console.warn("GEMINI_API_KEY not set or invalid, using local fallback.");
    const reply = localAssistantReply(message);
    return res.json({ reply });
  }

  // 3. Build the correct Gemini API URL
  const API_URL = `https://generativelanguage.googleapis.com/v1beta/models/gemini-1.5-flash-latest:generateContent?key=${GEMINI_API_KEY}`;
  
  const conversationHistory = Array.isArray(history) ? history : [];
  const contents = buildGeminiMessages(conversationHistory, message);

  try {
    // 4. Call the Google Gemini API
    const resp = await fetch(API_URL, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        contents: contents, // Use the correct "contents" format
        generationConfig: {
          temperature: 0.8,
          maxOutputTokens: 200,
        },
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("Google Gemini API error:", resp.status, text);
      const reply = localAssistantReply(message);
      return res.json({ reply });
    }

    const data = await resp.json();
    const answer = data?.candidates?.[0]?.content?.parts?.[0]?.text?.trim() || localAssistantReply(message);
    
    res.json({ reply: answer });

  } catch (err: any) {
    console.error("/api/chat error", err);
    const reply = localAssistantReply(req.body.message);
    res.json({ reply });
  }
};