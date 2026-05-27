import { useState, useEffect, useRef } from "react";
import { Link } from "react-router-dom";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Send, Loader2, Mic2, ArrowRight } from "lucide-react";
import ReactMarkdown from "react-markdown";

const PRESENTERS = [
  { name: "Mia", accent: "Australian-British", img: "https://luxury-video-studio-1.emergent.host/assets/property/mia-headshot.jpg" },
  { name: "Oliver", accent: "British RP", img: "https://luxury-video-studio-1.emergent.host/assets/property/oliver-portrait.jpg" },
  { name: "Aria", accent: "American", img: "https://luxury-video-studio-1.emergent.host/assets/property/aria-portrait.jpg" },
  { name: "Marcus", accent: "Continental", img: "https://luxury-video-studio-1.emergent.host/assets/property/marcus-portrait.jpg" },
  { name: "Emma", accent: "American", img: "https://luxury-video-studio-1.emergent.host/assets/property/emma-portrait.jpg" },
];

export default function BrandVoiceAdvisor() {
  const [conversation, setConversation] = useState(null);
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const [sending, setSending] = useState(false);
  const [loading, setLoading] = useState(true);
  const bottomRef = useRef(null);

  useEffect(() => {
    const init = async () => {
      const conv = await base44.agents.createConversation({
        agent_name: "brand_voice_advisor",
        metadata: { name: "Brand Voice Session" },
      });
      setConversation(conv);
      setLoading(false);

      const unsub = base44.agents.subscribeToConversation(conv.id, (data) => {
        setMessages(data.messages || []);
      });
      return unsub;
    };

    let unsub;
    init().then((fn) => { unsub = fn; });
    return () => { if (unsub) unsub(); };
  }, []);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages]);

  const sendMessage = async () => {
    if (!input.trim() || sending || !conversation) return;
    const text = input.trim();
    setInput("");
    setSending(true);
    await base44.agents.addMessage(conversation, { role: "user", content: text });
    setSending(false);
  };

  const handleKey = (e) => {
    if (e.key === "Enter" && !e.shiftKey) { e.preventDefault(); sendMessage(); }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8fafc" }}>
      <Navbar />

      <section className="pt-32 pb-8 px-6 text-center">
        <p className="text-xs font-mono uppercase tracking-widest text-white/30 mb-4">AI Brand Advisor</p>
        <h1 className="text-4xl md:text-6xl font-bold mb-3">
          Find your perfect <span style={{ color: "#C99A2E", fontStyle: "italic" }}>brand voice.</span>
        </h1>
        <p className="text-white/50 max-w-lg mx-auto">Answer a few questions and our AI will match you with the ideal presenter for your brand and audience.</p>
      </section>

      {/* Presenter strip */}
      <div className="flex justify-center gap-4 px-6 pb-8 flex-wrap">
        {PRESENTERS.map((p) => (
          <div key={p.name} className="text-center">
            <div className="w-14 h-14 rounded-full overflow-hidden border border-white/15 mx-auto mb-1">
              <img src={p.img} alt={p.name} className="w-full h-full object-cover" />
            </div>
            <p className="text-xs text-white font-medium">{p.name}</p>
            <p className="text-xs text-white/30">{p.accent}</p>
          </div>
        ))}
      </div>

      {/* Chat */}
      <div className="max-w-2xl mx-auto px-6 pb-24">
        <div className="rounded-2xl border border-white/10 overflow-hidden" style={{ background: "rgba(255,255,255,0.03)" }}>
          {/* Messages */}
          <div className="h-[420px] overflow-y-auto p-6 space-y-4">
            {loading ? (
              <div className="flex items-center justify-center h-full">
                <Loader2 className="w-6 h-6 animate-spin text-white/30" />
              </div>
            ) : messages.length === 0 ? (
              <div className="flex items-center justify-center h-full text-center">
                <div>
                  <Mic2 className="w-8 h-8 mx-auto mb-3 text-white/20" />
                  <p className="text-white/40 text-sm">Say hello to start your voice consultation</p>
                </div>
              </div>
            ) : (
              messages.map((msg, i) => (
                <div key={i} className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}>
                  {msg.role !== "user" && (
                    <div className="w-7 h-7 rounded-full flex-shrink-0 mr-2 mt-0.5 overflow-hidden border border-white/15">
                      <img src={PRESENTERS[0].img} alt="AI" className="w-full h-full object-cover" />
                    </div>
                  )}
                  <div className={`max-w-[80%] rounded-2xl px-4 py-2.5 text-sm leading-relaxed ${msg.role === "user" ? "text-white" : "text-white/80 border border-white/10"}`}
                    style={msg.role === "user" ? { background: "#C99A2E", color: "#0a0e1a" } : { background: "rgba(255,255,255,0.05)" }}>
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
          <div className="border-t border-white/8 p-4 flex gap-3">
            <input
              value={input}
              onChange={(e) => setInput(e.target.value)}
              onKeyDown={handleKey}
              placeholder="Tell me about your brand..."
              disabled={loading || sending}
              className="flex-1 bg-transparent text-sm text-white placeholder-white/30 outline-none"
            />
            <button
              onClick={sendMessage}
              disabled={!input.trim() || sending || loading}
              className="w-9 h-9 rounded-full flex items-center justify-center flex-shrink-0 transition-all disabled:opacity-30"
              style={{ background: "#C99A2E" }}
            >
              {sending ? <Loader2 className="w-4 h-4 animate-spin" style={{ color: "#0a0e1a" }} /> : <Send className="w-4 h-4" style={{ color: "#0a0e1a" }} />}
            </button>
          </div>
        </div>

        {/* CTAs */}
        <div className="flex flex-wrap justify-center gap-3 mt-6">
          <Link to="/presenters">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm border border-white/20 text-white hover:border-white/40 transition-all">
              Browse all presenters <ArrowRight className="w-3.5 h-3.5" />
            </button>
          </Link>
          <Link to="/generate">
            <button className="inline-flex items-center gap-2 px-5 py-2.5 rounded-full text-sm font-semibold transition-all" style={{ background: "#C99A2E", color: "#0a0e1a" }}>
              Try a voice now
            </button>
          </Link>
        </div>
      </div>

      <Footer />
    </div>
  );
}