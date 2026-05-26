import { useState, useEffect } from "react";
import { Check, Loader2, Globe, Mic, Film } from "lucide-react";
import { base44 } from "@/api/base44Client";
import ScriptEditor from "./ScriptEditor";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";

// Steps shown in the progress bar (script generation is a separate UI state)
const PIPELINE_STEPS = [
  { id: "scrape", label: "Scraping property details", description: "Extracting images, descriptions, and listing data", icon: Globe, duration: 3500 },
  { id: "audio", label: "Generating AI audio", description: "Mia's voice — professional, warm, on-brand", icon: Mic, duration: 3000 },
  { id: "render", label: "Rendering 9:16 reel", description: "Compositing visuals, audio, and transitions into final reel", icon: Film, duration: 4000 },
];

const SCRAPE_STEP_INDEX = 0;

async function generateScript(listingUrl) {
  const result = await base44.integrations.Core.InvokeLLM({
    prompt: `You are Mia, a warm, elegant AI presenter for LensFlow — Australia's #1 AI real estate media platform.

Write a 45–60 second cinematic voice-over script for a property listing video based on the following URL: ${listingUrl}

Since you cannot actually visit the URL, write a compelling, realistic prestige real estate script as if the property is a luxury home in the area suggested by the URL. Use the suburb or address clues from the URL if available.

Guidelines:
- Open with a vivid, sensory hook that sets the scene (no "Welcome to…" clichés)
- Describe the lifestyle the home enables, not just its features
- Weave in 2–3 specific, tactile details (light, texture, space, aspect)
- End with a confident, emotion-driven close that creates urgency
- Tone: warm, cinematic, editorial — like a luxury magazine come to life
- Reading pace: conversational, 2.5 words/second. Aim for 110–150 words.
- Do NOT include [MUSIC], (PAUSE), or stage directions — pure narration only.
- Do NOT include any headings or labels. Just the script text itself.`,
  });
  return typeof result === "string" ? result : result?.response || result?.content || String(result);
}

export default function ProgressView({ listingUrl, onComplete }) {
  const [phase, setPhase] = useState("progress"); // "progress" | "script" | "post_script"
  const [currentStep, setCurrentStep] = useState(0);
  const [stepProgress, setStepProgress] = useState(0);
  const [generatedScript, setGeneratedScript] = useState("");
  const [isGeneratingScript, setIsGeneratingScript] = useState(false);
  const [isRegenerating, setIsRegenerating] = useState(false);
  // When in post_script phase, we continue from step index 1 (audio)
  const [postScriptStep, setPostScriptStep] = useState(1);
  const [postScriptProgress, setPostScriptProgress] = useState(0);

  // Phase 1: run scrape step only
  useEffect(() => {
    if (phase !== "progress") return;

    const step = PIPELINE_STEPS[SCRAPE_STEP_INDEX];
    const duration = step.duration;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setStepProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          // Scrape done — now generate script
          setTimeout(async () => {
            setPhase("script");
            setIsGeneratingScript(true);
            const script = await generateScript(listingUrl);
            setGeneratedScript(script);
            setIsGeneratingScript(false);
          }, 400);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase, listingUrl]);

  // Phase 3: run audio + render after script approved
  useEffect(() => {
    if (phase !== "post_script") return;

    if (postScriptStep >= PIPELINE_STEPS.length) {
      const timeout = setTimeout(() => onComplete(generatedScript), 800);
      return () => clearTimeout(timeout);
    }

    const step = PIPELINE_STEPS[postScriptStep];
    const duration = step.duration;
    const interval = 50;
    const increment = (interval / duration) * 100;

    const timer = setInterval(() => {
      setPostScriptProgress((prev) => {
        if (prev >= 100) {
          clearInterval(timer);
          setTimeout(() => {
            setPostScriptStep((s) => s + 1);
            setPostScriptProgress(0);
          }, 300);
          return 100;
        }
        return prev + increment;
      });
    }, interval);

    return () => clearInterval(timer);
  }, [phase, postScriptStep, onComplete]);

  const handleApproveScript = (approvedScript) => {
    setGeneratedScript(approvedScript);
    setPhase("post_script");
    setPostScriptStep(1);
    setPostScriptProgress(0);
  };

  const handleRegenerate = async () => {
    setIsRegenerating(true);
    const script = await generateScript(listingUrl);
    setGeneratedScript(script);
    setIsRegenerating(false);
  };

  // Compute overall progress bar across all 3 steps
  const getOverallProgress = () => {
    if (phase === "progress") return (SCRAPE_STEP_INDEX + stepProgress / 100) / PIPELINE_STEPS.length * 100;
    if (phase === "script") return (1 / PIPELINE_STEPS.length) * 100; // scrape done
    // post_script: steps 1 + 2
    return ((postScriptStep + (postScriptProgress / 100)) / PIPELINE_STEPS.length) * 100;
  };

  const overallProgress = getOverallProgress();

  // Which step to highlight in the step list
  const activeStep = phase === "progress" ? 0 : phase === "script" ? -1 : postScriptStep;
  const completedUpTo = phase === "progress" ? -1 : phase === "script" ? 0 : postScriptStep;

  // Script loading screen
  if (phase === "script" && isGeneratingScript) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
        <Header />
        <div className="flex-1 flex flex-col items-center justify-center gap-5">
          <div className="w-12 h-12 rounded-xl border border-[#C99A2E]/30 flex items-center justify-center animate-pulse-glow" style={{ background: "rgba(201,154,46,0.08)" }}>
            <Loader2 className="w-6 h-6 animate-spin" style={{ color: "#C99A2E" }} />
          </div>
          <div className="text-center">
            <p className="font-semibold text-[#0F1A2E]">Mia is writing your script…</p>
            <p className="text-sm text-[#0F1A2E]/40 mt-1">Crafting a cinematic narrative from your listing</p>
          </div>
        </div>
      </div>
    );
  }

  // Script review screen
  if (phase === "script" && !isGeneratingScript) {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
        <Header />
        <ScriptEditor
          script={generatedScript}
          onApprove={handleApproveScript}
          onRegenerate={handleRegenerate}
          isRegenerating={isRegenerating}
        />
      </div>
    );
  }

  // Progress bars (scrape + audio + render)
  return (
    <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      <Header />
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
              <div className="h-full rounded-full transition-all duration-300 ease-out" style={{ width: `${overallProgress}%`, background: "linear-gradient(90deg, #C99A2E, #e8c86d)" }} />
            </div>
          </div>

          {/* Steps */}
          <div className="space-y-3">
            {PIPELINE_STEPS.map((step, index) => {
              const StepIcon = step.icon;
              const isComplete = index < completedUpTo || (phase === "post_script" && index < postScriptStep);
              const isActive = (phase === "progress" && index === 0) || (phase === "post_script" && index === postScriptStep);
              const isPending = !isComplete && !isActive;
              const progress = isActive ? (phase === "progress" ? stepProgress : postScriptProgress) : 0;

              return (
                <div key={step.id} className={`relative rounded-xl p-4 transition-all duration-500 border ${
                  isActive ? "bg-white border-[#C99A2E]/30 shadow-[0_4px_20px_rgba(201,154,46,0.08)]"
                  : isComplete ? "bg-white border-[#0F1A2E]/6"
                  : "border-[#0F1A2E]/6"
                }`} style={{ background: isPending ? "rgba(250,247,242,0.5)" : undefined }}>
                  <div className="flex items-center gap-4">
                    <div className={`flex items-center justify-center w-10 h-10 rounded-lg border transition-all duration-300 ${
                      isActive ? "border-[#C99A2E]/40" : isComplete ? "border-green-200" : "border-[#0F1A2E]/8"
                    }`} style={{
                      background: isActive ? "rgba(201,154,46,0.1)" : isComplete ? "rgba(34,197,94,0.08)" : "rgba(15,26,46,0.04)"
                    }}>
                      {isComplete ? <Check className="w-5 h-5 text-green-600" />
                        : isActive ? <Loader2 className="w-5 h-5 animate-spin" style={{ color: "#C99A2E" }} />
                        : <StepIcon className="w-5 h-5 text-[#0F1A2E]/20" />}
                    </div>
                    <div className="flex-1 min-w-0">
                      <p className={`text-sm font-medium transition-colors duration-300 ${isActive ? "text-[#0F1A2E]" : isComplete ? "text-[#0F1A2E]/70" : "text-[#0F1A2E]/30"}`}>{step.label}</p>
                      <p className={`text-xs mt-0.5 ${isActive ? "text-[#0F1A2E]/50" : isComplete ? "text-[#0F1A2E]/40" : "text-[#0F1A2E]/20"}`}>{step.description}</p>
                    </div>
                    <div className="flex-shrink-0">
                      {isComplete && <span className="text-xs text-green-600 font-medium">Done</span>}
                      {isActive && <span className="text-xs font-medium" style={{ color: "#C99A2E" }}>{Math.round(progress)}%</span>}
                    </div>
                  </div>
                  {isActive && (
                    <div className="mt-3 h-1 rounded-full overflow-hidden" style={{ background: "rgba(15,26,46,0.06)" }}>
                      <div className="h-full rounded-full transition-all duration-100" style={{ width: `${progress}%`, background: "linear-gradient(90deg, #C99A2E, #e8c86d)" }} />
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

function Header() {
  return (
    <header className="flex items-center px-8 py-4 border-b border-[#0F1A2E]/8 bg-[#FAF7F2]/90 backdrop-blur-sm">
      <a href="https://www.lensflow.com.au" className="flex items-center gap-2.5">
        <img src="https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png" alt="LensFlow" className="h-9 w-auto" />
      </a>
    </header>
  );
}