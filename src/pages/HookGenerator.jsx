import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send, Loader2, Zap, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const STARTERS = [
  "https://www.realestate.com.au/property-house-...",
  "Try: paste any REA, Domain or Rightmove URL",
];

export default function HookGenerator() {
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
        agent_name: "hook_generator",
        metadata: { name: "Hook Session" },
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
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full border border-white/10 text-xs text-white/40 mb-5">
          <Zap className="w-3 h-3" style={{ color: "#C99A2E" }} />
          AI Hook Generator
        </div>
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          Turn any listing into a<br />
          <span style={{ color: "#C99A2E", fontStyle: "italic" }}>scroll-stopping hook.</span>
        </h1>
        <p className="text-white/50 max-w-md mx-auto mb-8">Paste a listing URL and get 5 creative video hooks — with presenter recommendations and platform fit.</p>

        {/* Quick start prompts */}
        <div className="flex flex-wrap justify-center gap-2 mb-8">
          {["Paste a listing URL to begin →", "Works with REA, Domain, Rightmove & more"].map((t) => (
            <span key={t} className="text-xs px-3 py-1.5 rounded-full border border-white/10 text-white/30">{t}</span>
          ))}
        </div>
      </section>

      <div className="max-w-2xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* Messages */}
          <div className="h-[460px] overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-white/30" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <div className="w-12 h-12 rounded-full mx-auto mb-3 flex items-center justify-center" style={{ background: "rgba(201,154,46,0.15)" }}>
                    <Zap className="w-5 h-5" style={{ color: "#C99A2E" }} />
                  </div>
                  <p className="text-white/50 text-sm font-medium mb-1">Ready to generate hooks</p>
                  <p className="text-white/30 text-xs">Paste a listing URL below to get started</p>
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
                  <div className={`max-w-[82%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed`}
                    style={msg.role === "user"
                      ? { background: "#C99A2E", color: "#0a0e1a" }
                      : { background: "rgba(255,255,255,0.05)", border: "1px solid rgba(255,255,255,0.08)" }}>
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
              placeholder="Paste listing URL or describe your property..."
              disabled={loading || sending}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/25 outline-none"
            />
            <button
              onClick={() => sendMessage()}
              disabled={!input.trim() || sending || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
              style={{ background: "#C99A2E" }}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0a0e1a" }} /> : <Send className="w-4 h-4" style={{ color: "#0a0e1a" }} />}
            </button>
          </div>
        </div>

        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/generate">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              Generate a reel now <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link to="/presenters">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/20 text-white hover:border-white/40 transition-all">
              Browse presenters
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}