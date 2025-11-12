import { useEffect } from "react";
import {
  LoaderOverlay,
  MusicPlayer,
  ConfettiBackground,
  FloatingElements,
  CustomCursor,
  Compliment,
  ChatbotBirthday,
  EmojiReactions,
  Surprise,
  Footer,
  EndFireworks,
  SafeLottie,
} from "@/components";
import MessageFromRishi from "@/components/MessageFromRishi";

export default function Index() {
  useEffect(() => {
    document.title = "Happy Birthday, Dhwani 💖";
  }, []);

  return (
    <div className="min-h-screen">
      <LoaderOverlay />
      <CustomCursor />
      <ConfettiBackground />
      <FloatingElements />
      <EndFireworks />

      <main className="relative">
        {/* Hero */}
        <section className="pt-20 md:pt-28 pb-12 md:pb-20 container">
          <div className="text-center">
            <div className="mx-auto max-w-3xl">
              <h1 className="heading-script text-5xl md:text-7xl text-foreground drop-shadow-[0_10px_30px_hsla(var(--brand-pink)/0.5)]">
                Happy Birthday
                <br />
                <span className="text-transparent bg-clip-text bg-gradient-to-r from-brand-pink to-brand-lavender">Dhwani Patel 💕</span>
              </h1>
              <p className="mt-3 text-foreground/70">Made with love by <span className="font-semibold">Rishi Sagar</span>.</p>
              <div className="mt-5 flex items-center justify-center">
                <MusicPlayer />
              </div>
            </div>
            <div className="mt-6">
              <div className="mx-auto max-w-xl h-40">
                <SafeLottie
                  src="https://lottie.host/df9fa9cf-8d71-4bcb-8d2e-44bd7f3d8939/0r7mZ6yQKQ.json"
                  style={{ width: "100%", height: "100%" }}
                  autoplay
                  loop
                  speed={0.7}
                />
              </div>
            </div>
          </div>
        </section>

        {/* Compliment */}
        <section className="container py-10">
          <Compliment />
        </section>

        {/* Emoji reactions */}
        <section className="container py-10 text-center">
          <h2 className="text-2xl md:text-3xl font-semibold mb-3">Send your love 🎈</h2>
          <EmojiReactions />
        </section>

        {/* Surprise */}
        <section className="container py-12">
          <Surprise />
        </section>

        {/* Message from Rishi */}
        <MessageFromRishi />

        {/* Chatbot */}
        <section id="chatbot-section" className="container py-12">
          <h2 className="text-2xl md:text-3xl font-semibold text-center mb-4">Chat with Rishi 💬</h2>
          <p className="text-center text-foreground/70 mb-6">Share a memory, ask for a birthday wish, or tell how your day is going!</p>
          <ChatbotBirthday />
        </section>

        <Footer />
      </main>
    </div>
  );
}
