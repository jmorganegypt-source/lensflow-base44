import { useState, useEffect } from "react";
import { Check, Loader2, Globe, FileText, Mic, Film } from "lucide-react";

const LOGO = "https://lensflow.com.au/assets/brand/lensflow-logo.svg";
const LOGO_FALLBACK = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/bc7de8a58_logo-lensflow-mark.png";

const PIPELINE_STEPS = [
  { id: "scrape", label: "Scraping property details", description: "Extracting images, descriptions, and listing data", icon: Globe, duration: 3000 },
  { id: "script", label: "Writing video script", description: "Mia crafts compelling narration from property highlights", icon: FileText, duration: 3500 },
  { id: "audio", label: "Generating AI audio", description: "Mia's voice — professional, warm, on-brand", icon: Mic, duration: 3000 },
  { id: "render", label: "Rendering 9:16 reel", description: "Compositing visuals, audio, and transitions into final reel", icon: Film, duration: 4000 },
];

export default function ProgressView({ listingUrl, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [logoSrc, setLogoSrc] = useState(LOGO);

  useEffect(() => {
    if (currentStep >= PIPELINE_STEPS.length) {
      const timeout = setTimeout(onComplete, 800);
      return () => clearTimeout(timeout);
    }

    const duration = PIPELINE_STEPS[currentStep].duration;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setCurrentStep((s) => s + 1);
            setStepProgress(0);
          }, 300);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [currentStep, onComplete]);

  const overallProgress = ((currentStep + (stepProgress / 100)) / PIPELINE_STEPS.length) * 100;

  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      <header className="flex items-center px-8 py-4 border-b border-[#0F1A2E]/8 bg-[#FAF7F2]/90 backdrop-blur-sm">
        <a href="https://www.lensflow.com.au" className="flex items-center gap-2.5">
          <img src={logoSrc} alt="LensFlow" className="h-8 w-auto" onError={() => setLogoSrc(LOGO_FALLBACK)} />
          <span className="text-sm font-semibold tracking-widest text-[#0F1A2E] uppercase">Lens Flow</span>
        </a>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-lg w-full space-y-10 animate-fade-in-up">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl border border-[#C99A2E]/30 mb-4 animate-pulse-glow" style={{ background: "rgba(201,154,46,0.08)" }}>
              <Film className="w-8 h-8 text-[#C99A2E]" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-[#0F1A2E]">Creating Your Video Reel</h2>
            <p className="text-sm text-[#0F1A2E]/40 truncate max-w-sm mx-auto">{listingUrl}</p>
          </div>

          {/* Overall progress */}
          <div className="space-y-2">
            <div className="flex justify-between text-xs text-[#0F1A2E]/40">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-1.5 rounded-full overflow-hidden" style={{ background: "rgba(15,26,46,0.08)" }}>
              <div
                className="h-full rounded-full transition-all duration-300 ease-out"
                style={{ width: `${overallProgress}%`, background: "linear-gradient(90deg, #C99A2E, #e8c86d)" }}
              />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {PIPELINE_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              const isPending = index > currentStep;

              return (
                <div key={step.id} className={`relative rounded-xl p-4 transition-all duration-500 border ${
                  isActive
                    ? "bg-white border-[#C99A2E]/30 shadow-[0_4px_20px_rgba(201,154,46,0.08)]"
                    : isComplete
                    ? "bg-white border-[#0F1A2E]/6"
                    : "border-[#0F1A2E]/6"
                }`} style={{ background: isPending ? "rgba(250,247,242,0.5)" : undefined }}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 border ${
                      isActive
                        ? "border-[#C99A2E]/40"
                        : isComplete
                        ? "border-green-200"
                        : "border-[#0F1A2E]/8"
                    }`} style={{
                      background: isActive ? "rgba(201,154,46,0.1)" : isComplete ? "rgba(34,197,94,0.08)" : "rgba(15,26,46,0.04)"
                    }}>
                      {isComplete ? (
                        <Check className="w-5 h-5 text-green-600" />
                      ) : isActive ? (
                        <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#C99A2E" }} />
                      ) : (
                        <StepIcon className="w-5 h-5 text-[#0F1A2E]/20" />
                      )}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium transition-colors duration-300 ${
                        isActive ? "text-[#0F1A2E]" : isComplete ? "text-[#0F1A2E]/70" : "text-[#0F1A2E]/30"
                      }`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 transition-colors duration-300 ${
                        isActive ? "text-[#0F1A2E]/50" : isComplete ? "text-[#0F1A2E]/40" : "text-[#0F1A2E]/20"
                      }`}>{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isComplete && <span className="text-xs text-green-600 font-medium">Done</span>}
                      {isActive && <span className="text-xs font-medium" style={{ color: "#C99A2E" }}>{Math.round(stepProgress)}%</span>}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(15,26,46,0.06)" }}>
                      <div
                        className="h-full rounded-full transition-all duration-100"
                        style={{ width: `${stepProgress}%`, background: "linear-gradient(90deg, #C99A2E, #e8c86d)" }}
                      />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-[#0F1A2E]/30">This typically takes 30–60 seconds. Your reel is being crafted with care.</p>
        </div>
      </div>
    </div>
  );
}