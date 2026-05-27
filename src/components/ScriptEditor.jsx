import { useState, useEffect } from "react";
import { Sparkles, Edit3, ArrowRight, RotateCcw, Loader2 } from "lucide-react";

export default function ScriptEditor({ script, onApprove, onRegenerate, isRegenerating }) {
  const [edited, setEdited] = useState(script);
  const [isEditing, setIsEditing] = useState(false);

  useEffect(() => {
    setEdited(script);
    setIsEditing(false);
  }, [script]);

  const handleRegenerate = () => {
    onRegenerate();
  };

  const handleApprove = () => {
    onApprove(edited);
  };

  return (
    <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
      <div className="max-w-2xl w-full animate-fade-in-up space-y-6">
        {/* Header */}
        <div className="text-center space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-[#C99A2E]/30 text-xs font-mono uppercase tracking-widest" style={{ background: "rgba(201,154,46,0.08)", color: "#C99A2E" }}>
            <Sparkles className="w-3 h-3" />
            Mia wrote your script
          </div>
          <h2 className="text-2xl font-bold text-[#0F1A2E]">Review + edit before recording</h2>
          <p className="text-sm text-[#0F1A2E]/50">Read it aloud. Adjust tone, suburb names, or add your personal touch.</p>
        </div>

        {/* Script card */}
        <div className="rounded-2xl border border-[#0F1A2E]/10 overflow-hidden shadow-[0_4px_24px_rgba(15,26,46,0.06)]">
          {/* Toolbar */}
          <div className="flex items-center justify-between px-4 py-3 bg-white border-b border-[#0F1A2E]/8">
            <div className="flex items-center gap-2">
              <div className="w-2.5 h-2.5 rounded-full bg-red-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-yellow-400/60" />
              <div className="w-2.5 h-2.5 rounded-full bg-green-400/60" />
            </div>
            <span className="text-xs font-mono text-[#0F1A2E]/30 uppercase tracking-widest">Video Script · Mia AI</span>
            <button
              onClick={() => setIsEditing(!isEditing)}
              className="inline-flex items-center gap-1.5 text-xs px-2.5 py-1 rounded-lg border transition-all"
              style={isEditing
                ? { background: "rgba(201,154,46,0.12)", borderColor: "rgba(201,154,46,0.4)", color: "#C99A2E" }
                : { background: "transparent", borderColor: "rgba(15,26,46,0.12)", color: "rgba(15,26,46,0.5)" }}
            >
              <Edit3 className="w-3 h-3" />
              {isEditing ? "Editing" : "Edit"}
            </button>
          </div>

          {/* Script content */}
          <div className="bg-white">
            {isEditing ? (
              <textarea
                value={edited}
                onChange={(e) => setEdited(e.target.value)}
                className="w-full p-6 text-[15px] leading-[1.85] text-[#0F1A2E] font-serif resize-none focus:outline-none"
                style={{ minHeight: "320px", background: "transparent" }}
                autoFocus
              />
            ) : (
              <div
                className="p-6 text-[15px] leading-[1.85] text-[#0F1A2E] font-serif whitespace-pre-wrap cursor-text"
                style={{ minHeight: "320px" }}
                onClick={() => setIsEditing(true)}
              >
                {edited}
              </div>
            )}
          </div>

          {/* Word count */}
          <div className="px-4 py-2 bg-[#FAF7F2] border-t border-[#0F1A2E]/6 flex items-center justify-between">
            <span className="text-xs text-[#0F1A2E]/30">{edited.split(/\s+/).filter(Boolean).length} words · approx {Math.round(edited.split(/\s+/).filter(Boolean).length / 2.5)}s read</span>
            <span className="text-xs text-[#0F1A2E]/30">Click to edit inline</span>
          </div>
        </div>

        {/* Actions */}
        <div className="flex gap-3">
          <button
            onClick={handleRegenerate}
            disabled={isRegenerating}
            className="flex items-center gap-2 px-4 py-2.5 rounded-xl border border-[#0F1A2E]/12 text-sm text-[#0F1A2E]/60 hover:border-[#0F1A2E]/25 hover:text-[#0F1A2E] transition-all disabled:opacity-40"
            style={{ background: "white" }}
          >
            {isRegenerating ? <Loader2 className="w-4 h-4 animate-spin" /> : <RotateCcw className="w-4 h-4" />}
            Regenerate
          </button>

          <button
            onClick={handleApprove}
            className="flex-1 flex items-center justify-center gap-2 py-2.5 rounded-xl text-sm font-semibold transition-all hover:opacity-90"
            style={{ background: "#0F1A2E", color: "white" }}
          >
            <Sparkles className="w-4 h-4" style={{ color: "#C99A2E" }} />
            Looks great — generate video
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>

        <p className="text-center text-xs text-[#0F1A2E]/25">Your edited script will be used for the voiceover and on-screen captions.</p>
      </div>
    </div>
  );
}