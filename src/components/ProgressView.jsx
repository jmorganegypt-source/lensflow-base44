import { useState, useEffect } from "react";
import { Check, Loader2, Globe, FileText, Mic, Film } from "lucide-react";

const PIPELINE_STEPS = [
  { id: "scrape", label: "Scraping property details", description: "Extracting images, descriptions, and listing data", icon: Globe, duration: 3000 },
  { id: "script", label: "Writing video script", description: "Crafting compelling narration from property highlights", icon: FileText, duration: 3500 },
  { id: "audio", label: "Generating AI audio", description: "Creating professional voiceover with natural intonation", icon: Mic, duration: 3000 },
  { id: "render", label: "Rendering 9:16 video", description: "Compositing visuals, audio, and transitions into final reel", icon: Film, duration: 4000 },
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
    <div className="min-h-screen flex flex-col items-center justify-center px-6">
      <div className="max-w-lg w-full space-y-10 animate-fade-in-up">
        <div className="text-center space-y-3">
          <div className="inline-flex items-center justify-center w-16 h-16 rounded-2xl bg-blue-500/10 border border-blue-500/20 mb-4 animate-pulse-glow">
            <Film className="w-8 h-8 text-blue-400" />
          </div>
          <h2 className="text-2xl md:text-3xl font-bold text-white">Creating Your Video Reel</h2>
          <p className="text-sm text-slate-500 truncate max-w-sm mx-auto">{listingUrl}</p>
        </div>

        <div className="space-y-2">
          <div className="flex justify-between text-xs text-slate-400">
            <span>Overall Progress</span>
            <span>{Math.round(overallProgress)}%</span>
          </div>
          <div className="h-2 rounded-full bg-slate-800 overflow-hidden">
            <div className="h-full rounded-full bg-gradient-to-r from-blue-600 to-cyan-400 transition-all duration-300 ease-out" style={{ width: `${overallProgress}%` }} />
          </div>
        </div>

        <div className="space-y-3">
          {PIPELINE_STEPS.map((step, index) => {
            const StepIcon = step.icon;
            const isActive = index === currentStep;
            const isComplete = index < currentStep;
            const isPending = index > currentStep;

            return (
              <div key={step.id} className={`relative rounded-xl p-4 transition-all duration-500 ${
                isActive ? "glass-card shadow-[0_0_30px_rgba(59,130,246,0.1)]" : isComplete ? "bg-green-500/5 border border-green-500/10" : "bg-slate-900/30 border border-slate-800/50"
              }`}>
                <div className="flex items-center gap-4">
                  <div className={`flex items-center justify-center w-10 h-10 rounded-lg transition-all duration-300 ${
                    isActive ? "bg-blue-500/20 border border-blue-500/30" : isComplete ? "bg-green-500/20 border border-green-500/30" : "bg-slate-800/50 border border-slate-700/30"
                  }`}>
                    {isComplete ? <Check className="w-5 h-5 text-green-400" /> : isActive ? <Loader2 className="w-5 h-5 text-blue-400 animate-spin" /> : <StepIcon className={`w-5 h-5 ${isPending ? "text-slate-600" : "text-slate-400"}`} />}
                  </div>
                  <div className="flex-1 min-w-0">
                    <p className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-white" : isComplete ? "text-green-300" : "text-slate-500"}`}>{step.label}</p>
                    <p className={`text-xs mt-0.5 transition-colors duration-300 ${isActive ? "text-slate-400" : isComplete ? "text-green-400/60" : "text-slate-600"}`}>{step.description}</p>
                  </div>
                  <div className="flex-shrink-0">
                    {isComplete && <span className="text-xs text-green-400 font-medium">Done</span>}
                    {isActive && <span className="text-xs text-blue-400 font-medium">{Math.round(stepProgress)}%</span>}
                  </div>
                </div>
                {isActive && (
                  <div className="mt-3 h-1 rounded-full bg-slate-800 overflow-hidden">
                    <div className="h-full rounded-full bg-gradient-to-r from-blue-500 to-cyan-400 transition-all duration-100" style={{ width: `${stepProgress}%` }} />
                  </div>
                )}
              </div>
            );
          })}
        </div>

        <p className="text-center text-xs text-slate-600">This typically takes 30-60 seconds. Your reel is being crafted with care.</p>
      </div>
    </div>
  );
}