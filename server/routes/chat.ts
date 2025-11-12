import type { RequestHandler } from "express";

function localAssistantReply(message: string) {
  const templates = [
    `Aww Dhwani, that's so sweet! 💖`,
    `You're making my day brighter just by sharing — thank you! 🎀`,
    `I can't wait to celebrate with you—sending virtual confetti! 🎉`,
    `You deserve the biggest slice of cake today 🍰 and all the smiles!`,
    `That sounds amazing! Tell me more and I'll add some sparkle ✨`,
  ];
  // simple echoish with warmth
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

export const handleChat: RequestHandler = async (req, res) => {
  try {
    const { message, history } = req.body as { message: string; history?: { role: string; content: string }[] };
    if (!message) return res.status(400).json({ error: "Missing message" });

   const GITHUB_TOKEN = process.env.GITHUB_TOKEN;

    // Build conversation messages for GitHub Models API
    const conversationHistory = Array.isArray(history) ? history : [];
    const messages = [
      {
        role: "system",
        content: "You are Rishi talking to Dhwani on her birthday. Talk naturally like a close friend - warm, genuine, and caring. Congratulate her, share happy birthday wishes, and chat like friends do. Keep responses conversational (2-4 sentences), warm, and genuine. Use emojis occasionally like 🎉💖✨. Remember you're Rishi, her friend, not just a chatbot - be personal, kind, and celebrate her special day while keeping the friendly vibe going."
      },
      ...conversationHistory.map(msg => ({
        role: msg.role === "assistant" ? "assistant" : "user",
        content: msg.content
      })),
      {
        role: "user",
        content: message
      }
    ];

    // Use GitHub Models API (free with GitHub account)
    const resp = await fetch("https://models.inference.ai.azure.com/chat/completions", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
        "Authorization": `Bearer ${GITHUB_TOKEN}`,
      },
      body: JSON.stringify({
        model: "gpt-4o-mini",
        messages,
        temperature: 0.8,
        max_tokens: 200,
      }),
    });

    if (!resp.ok) {
      const text = await resp.text();
      console.error("GitHub Models API error:", resp.status, text);
      const reply = localAssistantReply(message);
      return res.json({ reply });
    }

    const data = await resp.json();
    const answer = data?.choices?.[0]?.message?.content?.trim() || localAssistantReply(message);
    
    res.json({ reply: answer });
  } catch (err: any) {
    console.error("/api/chat error", err);
    const reply = localAssistantReply(req.body.message);
    res.json({ reply });
  }
};
