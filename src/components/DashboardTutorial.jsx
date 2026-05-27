import { useState, useEffect } from "react";
import { ChevronLeft, ChevronRight, CheckCircle, Lock, Link as LinkIcon, Sparkles, BarChart3 } from "lucide-react";

const STEPS = [
  {
    title: "Sign In or Register",
    description: "Create your free LensFlow account",
    icon: Lock,
    color: "#C99A2E",
    visual: "👤",
    image: "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/e7dd7faf3_generated_image.png",
  },
  {
    title: "Paste Your Listing URL",
    description: "Add any property listing from your site",
    icon: LinkIcon,
    color: "#C99A2E",
    visual: "🔗",
    image: "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/7a65b6aeb_generated_image.png",
  },
  {
    title: "Generate Your Reel",
    description: "AI creates script, voice, and video in 60 seconds",
    icon: Sparkles,
    color: "#C99A2E",
    visual: "✨",
    image: "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/5147b4872_generated_image.png",
  },
  {
    title: "Watch in My Reels",
    description: "Download, share, or iterate anytime",
    icon: BarChart3,
    color: "#C99A2E",
    visual: "📹",
    image: "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/cc3580a12_generated_image.png",
  },
];

export default function DashboardTutorial() {
  const [current, setCurrent] = useState(0);
  const [autoPlay, setAutoPlay] = useState(true);

  useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(() => {
      setCurrent((prev) => (prev + 1) % STEPS.length);
    }, 7500); // 7.5s per step = 30s total
    return () => clearInterval(timer);
  }, [autoPlay]);

  const step = STEPS[current];
  const Icon = step.icon;

  return (
    <section className="py-24 px-6" style={{ background: "#FAF7F2" }}>
      <div className="max-w-3xl mx-auto">
        {/* Heading */}
        <div className="text-center mb-16">
          <p className="text-xs font-mono tracking-widest text-[#0F1A2E]/30 uppercase mb-3">Inside Your Dashboard</p>
          <h2 className="text-3xl md:text-4xl font-bold text-[#0F1A2E] mb-4">
            4 Steps to Your First Reel
          </h2>
          <p className="text-[#0F1A2E]/40 max-w-lg mx-auto text-sm">
            From login to published video in under a minute
          </p>
        </div>

        {/* Carousel */}
        <div className="relative rounded-2xl overflow-hidden shadow-xl" style={{ background: "#fff" }}>
          {/* Current Step Content */}
          <div className="relative h-[400px] flex flex-col md:flex-row items-center justify-between p-8 md:p-12 transition-all duration-500">
            {/* Left: Icon & Text */}
            <div className="flex-1 space-y-6 text-center md:text-left mb-8 md:mb-0 z-10">
              <div className="inline-flex items-center justify-center md:justify-start">
                <div
                  className="w-16 h-16 rounded-2xl overflow-hidden shadow-lg"
                  >
                  <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
                </div>
              </div>
              <div>
                <h3 className="text-2xl md:text-3xl font-bold text-[#0F1A2E] mb-2">
                  Step {current + 1}: {step.title}
                </h3>
                <p className="text-[#0F1A2E]/60 text-lg">{step.description}</p>
              </div>
              {/* Progress dots */}
              <div className="flex items-center gap-2 justify-center md:justify-start pt-4">
                {STEPS.map((_, idx) => (
                  <button
                    key={idx}
                    onClick={() => {
                      setCurrent(idx);
                      setAutoPlay(false);
                    }}
                    className={`h-2 rounded-full transition-all ${
                      idx === current ? "w-8" : "w-2"
                    }`}
                    style={{
                      background: idx <= current ? "#C99A2E" : "rgba(15,26,46,0.1)",
                    }}
                  />
                ))}
              </div>
            </div>

            {/* Right: Animated Illustration */}
            <div className="flex-1 relative h-64 md:h-full flex items-center justify-center">
              <div className="w-48 h-48 rounded-3xl overflow-hidden shadow-2xl animate-scale-in border border-white/10">
                <img src={step.image} alt={step.title} className="w-full h-full object-cover" />
              </div>
            </div>
          </div>

          {/* Navigation */}
          <div className="absolute bottom-6 left-0 right-0 flex items-center justify-center gap-4">
            <button
              onClick={() => {
                setCurrent((prev) => (prev - 1 + STEPS.length) % STEPS.length);
                setAutoPlay(false);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronLeft className="w-5 h-5 text-[#0F1A2E]" />
            </button>
            <button
              onClick={() => {
                setCurrent((prev) => (prev + 1) % STEPS.length);
                setAutoPlay(false);
              }}
              className="p-2 rounded-full hover:bg-gray-100 transition-colors"
            >
              <ChevronRight className="w-5 h-5 text-[#0F1A2E]" />
            </button>
          </div>
        </div>

        {/* Bottom CTA */}
        <div className="text-center mt-12">
          <a href="/generate">
            <button
              className="inline-flex items-center gap-2 px-8 py-3.5 rounded-full text-sm font-semibold shadow-lg transition-all hover:opacity-90 hover:scale-105"
              style={{ background: "linear-gradient(135deg, #C99A2E, #e8c86d)", color: "#0a0e1a" }}
            >
              Try It Free →
            </button>
          </a>
          <p className="text-[#0F1A2E]/40 text-xs mt-3">No credit card required</p>
        </div>
      </div>
    </section>
  );
}