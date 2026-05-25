import { useState, useEffect } from "react";
import { Check, Loader2, Globe, FileText, Mic, Film } from "lucide-react";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/bc7de8a58_logo-lensflow-mark.png";

const PIPELINE_STEPS = [
  { id: "scrape", label: "Scraping property details", description: "Extracting images, descriptions, and listing data", icon: Globe, duration: 3000 },
  { id: "script", label: "Writing video script", description: "Mia crafts compelling narration from property highlights", icon: FileText, duration: 3500 },
  { id: "audio", label: "Generating AI audio", description: "Mia's voice — professional, warm, on-brand", icon: Mic, duration: 3000 },
  { id: "render", label: "Rendering 9:16 reel", description: "Compositing visuals, audio, and transitions into final reel", icon: Film, duration: 4000 },
];

export default function ProgressView({ listingUrl, onComplete }) {
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);

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
    <div className="min-h-screen bg-[#f5f0e8] flex flex-col">
      <header className="flex items-center px-8 py-5 border-b border-stone-200">
        <a href="https://www.lensflow.com.au" className="flex items-center gap-3">
          <img src={LOGO} alt="LensFlow" className="w-9 h-9" />
          <span className="text-lg font-bold text-stone-900 tracking-tight">LENS FLOW</span>
        </a>
      </header>

      <div className="flex-1 flex flex-col items-center justify-center px-6">
        <div className="max-w-lg w-full space-y-10 animate-fade-in-up">
          <div className="text-center space-y-3">
            <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-amber-100 border border-amber-200 mb-4 animate-pulse-glow">
              <Film className="w-8 h-8 text-amber-600" />
            </div>
            <h2 className="text-2xl md:text-3xl font-bold text-stone-900">Creating Your Video Reel</h2>
            <p className="text-sm text-stone-400 truncate max-w-sm mx-auto">{listingUrl}</p>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-stone-500">
              <span>Overall Progress</span>
              <span>{Math.round(overallProgress)}%</span>
            </div>
            <div className="h-2 rounded-full bg-stone-200 overflow-hidden">
              <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-300 ease-out" style={{ width: `${overallProgress}%` }} />
            </div>
          </div>

          <div className="space-y-3">
            {PIPELINE_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isActive = index === currentStep;
              const isComplete = index < currentStep;
              const isPending = index > currentStep;

              return (
                <div key={step.id} className={`relative rounded-xl p-4 transition-all duration-500 border ${
                  isActive ? "bg-white border-amber-200 shadow-[0_4px_20px_rgba(201,145,58,0.1)]" : isComplete ? "bg-green-50 border-green-200" : "bg-white/50 border-stone-100"
                }`}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                      isActive ? "bg-amber-100 border border-amber-300" : isComplete ? "bg-green-100 border border-green-300" : "bg-stone-100 border border-stone-200"
                    }`}>
                      {isComplete ? <Check className="w-5 h-5 text-green-600" /> : isActive ? <Loader2 className="w-5 h-5 text-amber-600 animate-spin" /> : <StepIcon className={`w-5 h-5 ${isPending ? "text-stone-300" : "text-stone-400"}`} />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-stone-900" : isComplete ? "text-green-700" : "text-stone-400"}`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? "text-stone-500" : isComplete ? "text-green-600/70" : "text-stone-300"}`}>{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isComplete && <span className="text-xs text-green-600 font-medium">Done</span>}
                      {isActive && <span className="text-xs text-amber-600 font-medium">{Math.round(stepProgress)}%</span>}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-3 h-1 rounded-full bg-stone-100 overflow-hidden">
                      <div className="h-full rounded-full bg-gradient-to-r from-amber-500 to-amber-300 transition-all duration-100" style={{ width: `${stepProgress}%` }} />
                    </div>
                  )}
                </div>
              );
            })}
          </div>

          <p className="text-center text-xs text-stone-400">This typically takes 30–60 seconds. Your reel is being crafted with care.</p>
        </div>
      </div>
    </div>
  );
}