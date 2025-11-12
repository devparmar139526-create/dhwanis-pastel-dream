import { useEffect, useRef } from "react";

export default function MessageFromRishi() {
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("animate-fade-in");
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  const scrollToChatbot = () => {
    const chatbotSection = document.getElementById("chatbot-section");
    if (chatbotSection) {
      chatbotSection.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  };

  return (
    <section
      ref={sectionRef}
      className="relative py-16 md:py-24 px-4 opacity-0 transition-all duration-1000"
      style={{
        background: "linear-gradient(135deg, #fce4ec 0%, #f8bbd0 50%, #fce4ec 100%)",
      }}
    >
      {/* Floating hearts background animation */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(8)].map((_, i) => (
          <div
            key={i}
            className="absolute animate-float-slow"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.5}s`,
              opacity: 0.15,
            }}
          >
            💖
          </div>
        ))}
      </div>

      {/* Sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(15)].map((_, i) => (
          <div
            key={i}
            className="absolute text-2xl animate-sparkle"
            style={{
              left: `${Math.random() * 100}%`,
              top: `${Math.random() * 100}%`,
              animationDelay: `${i * 0.3}s`,
            }}
          >
            ✨
          </div>
        ))}
      </div>

      <div className="max-w-4xl mx-auto relative z-10">
        {/* Header */}
        <h2
          className="text-4xl md:text-5xl text-center mb-8 md:mb-12"
          style={{
            fontFamily: "'Dancing Script', cursive",
            color: "#d81b60",
            textShadow: "2px 2px 4px rgba(0,0,0,0.1)",
          }}
        >
          Message from Rishi 💌
        </h2>

        {/* Message Card */}
        <div className="bg-white rounded-3xl shadow-2xl p-8 md:p-12 transform hover:scale-[1.02] transition-transform duration-300">
          <div className="space-y-6 text-gray-800 leading-relaxed">
            <h3
              className="text-3xl md:text-4xl mb-6 text-center"
              style={{
                fontFamily: "'Dancing Script', cursive",
                color: "#d81b60",
              }}
            >
              Happy Birthday, Dhwani 💖
            </h3>

            <p className="text-lg md:text-xl">
              I honestly don't even know where to start you have brought so much light laughter 
              and warmth into my life☺ that just saying Happy Birthday🎂doesn't feel enough.
            </p>

            <p className="text-lg md:text-xl">
              You have this beautiful way of making everything around you better the moments 
              the people even the silence✨.
            </p>

            <p className="text-lg md:text-xl">
              I hope today brings you the kind of happiness you always give to everyone else 
              genuine effortless and full of love🤌.
            </p>

            <p className="text-lg md:text-xl">
              You deserve every bit of joy the world can offer and I just want u to remember 
              how loved appreciated the cherished u r ❤.
            </p>

            <p className="text-lg md:text-xl">
              Here's to more smiles, louder laughs, and memories that never fade 🥹.
            </p>

            <p className="text-lg md:text-xl">
              You'll always be someone I am thankful for not just today but every day 💫
            </p>

            <div className="mt-8 text-right">
              <p className="text-xl md:text-2xl italic text-gray-600">
                With all my heart,
              </p>
              <p
                className="text-2xl md:text-3xl mt-2 font-bold"
                style={{
                  fontFamily: "'Dancing Script', cursive",
                  color: "#d81b60",
                }}
              >
                Rishi 💐
              </p>
            </div>
          </div>

          {/* Scroll to Chatbot Button */}
          <div className="mt-10 text-center">
            <button
              onClick={scrollToChatbot}
              className="px-8 py-4 rounded-full text-white text-lg font-semibold shadow-lg hover:shadow-xl transform hover:scale-105 transition-all duration-300"
              style={{
                background: "linear-gradient(135deg, #ec407a 0%, #d81b60 100%)",
              }}
            >
              💬 Talk to Rishi
            </button>
          </div>
        </div>
      </div>

      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Dancing+Script:wght@400;700&display=swap');
        
        @keyframes fade-in {
          from {
            opacity: 0;
            transform: translateY(30px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .animate-fade-in {
          animation: fade-in 1s ease-out forwards;
        }

        @keyframes float-slow {
          0%, 100% {
            transform: translateY(0) rotate(0deg);
          }
          50% {
            transform: translateY(-20px) rotate(10deg);
          }
        }

        .animate-float-slow {
          animation: float-slow 6s ease-in-out infinite;
        }

        @keyframes sparkle {
          0%, 100% {
            opacity: 0;
            transform: scale(0.5);
          }
          50% {
            opacity: 0.3;
            transform: scale(1.2);
          }
        }

        .animate-sparkle {
          animation: sparkle 3s ease-in-out infinite;
        }
      `}</style>
    </section>
  );
}
