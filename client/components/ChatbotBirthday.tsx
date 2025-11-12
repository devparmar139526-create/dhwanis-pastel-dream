import { FormEvent, useRef, useState } from "react";

type Msg = { role: "user" | "assistant"; content: string };

// Read API key from environment (set VITE_OPENAI_KEY). Do NOT commit secrets to code.
const OPENAI_API_KEY = (import.meta.env.VITE_OPENAI_KEY as string) || "";

export default function ChatbotBirthday() {
  const [messages, setMessages] = useState<Msg[]>([
    { role: "assistant", content: "Happy Birthday, Dhwani! 🎉💖 I'm Rishi's little chat buddy. Tell me a favorite memory or let me shower you in birthday sparkle!" },
  ]);
  const [input, setInput] = useState("");
  const [loading, setLoading] = useState(false);
  const inputRef = useRef<HTMLInputElement | null>(null);

  const send = async (e: FormEvent) => {
    e.preventDefault();
    const content = input.trim();
    if (!content) return;
    setInput("");
    setMessages((m) => [...m, { role: "user", content }]);

      try {
      setLoading(true);
      const resp = await fetch("/api/chat", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ message: content, history: messages }),
      });
      const data = await resp.json();
      if (!resp.ok) {
        console.error("Chat API error:", resp.status, data);
        setMessages((m) => [
          ...m,
          { role: "assistant", content: "Sorry, I couldn't reach the party servers. Try again later! 🎈" },
        ]);
      } else {
        const answer = data?.reply ?? "Happy Birthday! 🎉";
        setMessages((m) => [...m, { role: "assistant", content: answer }]);
      }
    } catch (e) {
      setMessages((m) => [
        ...m,
        { role: "assistant", content: "Having a tiny hiccup reaching the party servers. But hey, you're still the star! ✨" },
      ]);
    } finally {
      setLoading(false);
      inputRef.current?.focus();
    }
  };

  return (
    <div className="w-full max-w-2xl mx-auto">
      <div className="h-72 md:h-80 p-4 rounded-2xl glass overflow-y-auto shadow-inner space-y-3 border">
        {messages.map((m, i) => (
          <div key={i} className={m.role === "assistant" ? "text-foreground" : "text-foreground/80 text-right"}>
            <div className={`inline-block px-3 py-2 rounded-2xl shadow ${m.role === "assistant" ? "bg-brand-cream" : "bg-brand-pink/70"}`}>
              {m.content}
            </div>
          </div>
        ))}
        {loading && <p className="text-sm text-foreground/60">Typing… ✍️</p>}
      </div>
      <form onSubmit={send} className="mt-3 flex gap-2">
        <input
          ref={inputRef}
          value={input}
          onChange={(e) => setInput(e.target.value)}
          placeholder="Chat with Rishi 💬"
          className="flex-1 px-4 py-2 rounded-full border bg-white/70 focus:outline-none focus:ring-2 focus:ring-brand-lavender"
        />
        <button className="px-4 py-2 rounded-full bg-brand-lavender text-white shadow hover:opacity-90">Send</button>
      </form>
    </div>
  );
}
