import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send, Loader2, Zap, ArrowRight, Link as LinkIcon } from "lucide-react";
import ReactMarkdown from "react-markdown";

const HOOK_STYLES = [
  { label: "Price Shock", color: "#ef4444", example: "Four bedrooms. Bondi views. Under $2M. 48 hours." },
  { label: "Lifestyle Dream", color: "#C99A2E", example: "Imagine waking up to this every morning." },
  { label: "Local Secret", color: "#8b5cf6", example: "Most people drive past this street. Locals fight to stay." },
  { label: "FOMO", color: "#f97316", example: "This went under offer in 3 days last time." },
  { label: "Story Open", color: "#22c55e", example: "In 1987, a family built their dream here. Now it's yours." },
];

export default function VideoHookAdvisor() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    let unsub;
    const init = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: "video_hook_advisor",
        metadata: { name: "Video Hook Session" },
      });
      setConversation(conv);
      setLoading(false);
      unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
        setMessages(data.messages || []);
      });
    };
    init();
    return () => { if (unsub) unsub(); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async (text) => {
    const msg = text || input.trim();
    if (!msg || sending || !conversation) return;
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: msg });
    setSending(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      <section className="pt-32 pb-8 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">AI Hook Generator</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          Paste a listing URL.<br />
          <span style={{ color: "#C99A2E", fontStyle: "italic" }}>Get 5 scroll-stopping hooks.</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto">Our AI reads your listing and writes the perfect opening lines to make buyers stop scrolling.</p>
      </section>

      {/* Hook style pills */}
      <div className="flex justify-center gap-2 flex-wrap px-6 pb-8">
        {HOOK_STYLES.map((s) => (
          <span key={s.label} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/50" style={{ borderColor: s.color + "40", color: s.color }}>
            {s.label}
          </span>
        ))}
      </div>

      <div className="max-w-2xl mx-auto px-6 pb-10">
        {/* Quick start */}
        <div className="rounded-xl border border-white/8 p-4 mb-4 flex items-start gap-3" style={{ background: "rgba(201,154,46,0.06)" }}>
          <LinkIcon className="w-4 h-4 mt-0.5 flex-shrink-0" style={{ color: "#C99A2E" }} />
          <div>
            <p className="text-sm font-medium text-white mb-0.5">Paste any listing URL to get started</p>
            <p className="text-xs text-white/40">Works with REA · Domain · Rightmove · Realestate.co.nz · Zillow and more</p>
          </div>
        </div>

        {/* Chat */}
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          <div className="h-[440px] overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-white/30" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Zap className="w-8 h-8 mx-auto mb-3 text-white/20" />
                  <p className="text-white/40 text-sm">Paste your listing URL to generate hooks</p>
                  <button
                    onClick={() => sendMessage("Hi! I'm ready to generate some video hooks for my listing.")}
                    className="mt-4 text-xs px-4 py-2 rounded-full border border-white/15 text-white/50 hover:border-white/30 hover:text-white/70 transition-all"
                  >
                    Get started →
                  </button>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 mr-2 mt-0.5 flex items-center justify-center border border-white/15" style={{ background: "rgba(201,154,46,0.15)" }}>
                      <Zap className="w-3.5 h-3.5" style={{ color: "#C99A2E" }} />
                    </div>
                  )}
                  <div
                    className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed`}
                    style={msg.role === "user"
                      ? { background: "#C99A2E", color: "#0a0e1a" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)", color: "rgba(248,250,252,0.85)" }}
                  >
                    {msg.role === "user" ? (
                      <p>{msg.content}</p>
                    ) : (
                      <ReactMarkdown className="prose prose-sm prose-invert max-w-none [&>*:first-child]:mt-0 [&>*:last-child]:mb-0">
                        {msg.content}
                      </ReactMarkdown>
                    )}
                  </div>
                </div>
              ))
            )}
            <div ref={bottomRef} />
          </div>

          {/* Input */}
          <div className="border-t border-white/8 p-4 flex gap-3 items-center">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Paste a listing URL or ask a question..."
              disabled={loading || sending}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || sending || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
              style={{ background: "#C99A2E" }}
            >
              {sending
                ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0a0e1a" }} />
                : <Send className="w-4 h-4" style={{ color: "#0a0e1a" }} />}
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/generate">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              <Zap className="w-3.5 h-3.5" /> Turn hook into a reel
            </button>
          </Link>
          <Link to="/brand-voice">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/20 text-white hover:border-white/40 transition-all">
              Find your brand voice <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}