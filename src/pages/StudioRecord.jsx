import { useState, useRef, useEffect } from "react";
import { Play, Square, RotateCcw, Loader2 } from "lucide-react";
import { base44 } from "@/api/base44Client";
import { useNavigate } from "react-router-dom";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";

export default function StudioRecord() {
  const [phase, setPhase] = useState("input"); // "input" | "recording" | "review" | "uploading"
  const [script, setScript] = useState("");
  const [isRecording, setIsRecording] = useState(false);
  const [recordedBlob, setRecordedBlob] = useState(null);
  const [uploading, setUploading] = useState(false);
  const videoRef = useRef(null);
  const mediaRecorderRef = useRef(null);
  const streamRef = useRef(null);
  const chunksRef = useRef([]);
  const navigate = useNavigate();

  const handleStartCamera = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({
        video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
        audio: true,
      });
      streamRef.current = stream;
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      setPhase("recording");
      startRecording(stream);
    } catch (err) {
      alert("Camera access denied. Please enable camera permissions.");
    }
  };

  const startRecording = (stream) => {
    chunksRef.current = [];
    const recorder = new MediaRecorder(stream, { mimeType: "video/webm" });
    recorder.ondataavailable = (e) => chunksRef.current.push(e.data);
    recorder.onstop = () => {
      const blob = new Blob(chunksRef.current, { type: "video/webm" });
      setRecordedBlob(blob);
      setPhase("review");
      stream.getTracks().forEach((t) => t.stop());
    };
    mediaRecorderRef.current = recorder;
    recorder.start();
    setIsRecording(true);
  };

  const handleStopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setIsRecording(false);
    }
  };

  const handleRetry = async () => {
    setRecordedBlob(null);
    setPhase("recording");
    chunksRef.current = [];
    const stream = await navigator.mediaDevices.getUserMedia({
      video: { facingMode: "user", width: { ideal: 1920 }, height: { ideal: 1080 } },
      audio: true,
    });
    streamRef.current = stream;
    if (videoRef.current) {
      videoRef.current.srcObject = stream;
    }
    startRecording(stream);
  };

  const handleUpload = async () => {
    if (!recordedBlob || !script.trim()) {
      alert("Please record a video and add a script.");
      return;
    }
    setUploading(true);
    try {
      const fileRes = await base44.integrations.Core.UploadFile({ file: recordedBlob });
      const reel = await base44.entities.Reel.create({
        script: script,
        status: "ready",
        video_url: fileRes.file_url,
        property_address: "Self-recorded",
      });
      navigate("/dashboard/reels");
    } catch (err) {
      alert("Upload failed: " + err.message);
    } finally {
      setUploading(false);
    }
  };

  // Input screen
  if (phase === "input") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#0F1A2E]/8 bg-[#FAF7F2]/90 backdrop-blur-sm">
          <a href="/" className="flex items-center gap-2.5">
            <img src={LOGO} alt="LensFlow" className="h-9 w-auto" />
          </a>
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6">
          <div className="max-w-2xl w-full space-y-8 animate-fade-in-up">
            <div className="text-center space-y-3">
              <h1 className="text-4xl font-bold text-[#0F1A2E]">Record Your Property Video</h1>
              <p className="text-lg text-[#0F1A2E]/60">Paste your script below, then we'll guide you through recording with our teleprompter.</p>
            </div>
            <div className="space-y-4">
              <label className="block text-sm font-medium text-[#0F1A2E]">Your Script</label>
              <textarea
                value={script}
                onChange={(e) => setScript(e.target.value)}
                placeholder="Paste or write your property script here..."
                className="w-full p-4 rounded-xl border border-[#0F1A2E]/15 text-[#0F1A2E] placeholder:text-[#0F1A2E]/30 focus:outline-none focus:border-[#C99A2E]/50 focus:ring-1 focus:ring-[#C99A2E]/30"
                style={{ minHeight: "240px" }}
              />
              <p className="text-xs text-[#0F1A2E]/40">{script.length} characters · Aim for 45–90 seconds at natural pace</p>
            </div>
            <button
              onClick={handleStartCamera}
              disabled={!script.trim()}
              className="w-full h-12 rounded-full bg-[#0F1A2E] hover:bg-[#1A2944] text-white font-semibold disabled:opacity-40 transition-all"
            >
              Start Recording
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Recording screen
  if (phase === "recording") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#000", color: "#fff" }}>
        <header className="flex items-center justify-between px-8 py-4 border-b border-white/10">
          <img src={LOGO} alt="LensFlow" className="h-9 w-auto" />
          <button
            onClick={() => {
              if (streamRef.current) streamRef.current.getTracks().forEach((t) => t.stop());
              setPhase("input");
              setScript("");
            }}
            className="text-sm px-3 py-1 rounded text-white/60 hover:text-white"
          >
            Back
          </button>
        </header>
        <div className="flex-1 flex flex-col relative overflow-hidden">
          <video
            ref={videoRef}
            autoPlay
            muted
            playsInline
            className="absolute inset-0 w-full h-full object-cover"
            style={{ transform: "scaleX(-1)" }}
          />
          {/* Focus zone */}
          <div className="absolute top-1/4 left-0 right-0 h-32 border-t-2 border-b-2 border-green-400/50 z-10" style={{ boxShadow: "inset 0 0 30px rgba(0,255,0,0.1)" }} />
          {/* Script overlay */}
          <div className="absolute bottom-32 left-0 right-0 z-10 text-center px-6">
            <p className="text-2xl md:text-3xl text-white leading-relaxed font-medium drop-shadow-lg">{script}</p>
          </div>
          {/* Controls */}
          <div className="absolute bottom-0 left-0 right-0 flex items-center justify-center gap-4 pb-8 z-20">
            {isRecording && (
              <div className="flex items-center gap-2 px-4 py-2 rounded-full bg-red-500/80 text-white text-sm font-medium">
                <div className="w-2 h-2 rounded-full bg-white animate-pulse" /> Recording
              </div>
            )}
            <button
              onClick={handleStopRecording}
              disabled={!isRecording}
              className="w-16 h-16 rounded-full bg-red-500 hover:bg-red-600 flex items-center justify-center text-white disabled:opacity-50 transition-all"
            >
              <Square className="w-6 h-6" />
            </button>
          </div>
        </div>
      </div>
    );
  }

  // Review screen
  if (phase === "review") {
    return (
      <div className="min-h-screen flex flex-col" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
        <header className="flex items-center justify-between px-8 py-4 border-b border-[#0F1A2E]/8 bg-[#FAF7F2]/90">
          <img src={LOGO} alt="LensFlow" className="h-9 w-auto" />
        </header>
        <div className="flex-1 flex flex-col items-center justify-center px-6 py-12">
          <div className="max-w-2xl w-full space-y-8 animate-fade-in-up">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold">Review Your Recording</h2>
              <p className="text-[#0F1A2E]/60">Watch your video and make sure it looks good before uploading.</p>
            </div>
            {recordedBlob && (
              <div className="rounded-2xl overflow-hidden shadow-lg border border-[#0F1A2E]/10">
                <video
                  src={URL.createObjectURL(recordedBlob)}
                  controls
                  playsInline
                  className="w-full bg-black"
                  style={{ aspectRatio: "16/9" }}
                />
              </div>
            )}
            <div className="flex gap-3">
              <button
                onClick={handleRetry}
                className="flex-1 h-12 rounded-full border border-[#0F1A2E]/15 hover:border-[#0F1A2E]/30 text-[#0F1A2E] font-semibold transition-all"
              >
                <RotateCcw className="w-4 h-4 inline mr-2" /> Retake
              </button>
              <button
                onClick={handleUpload}
                disabled={uploading}
                className="flex-1 h-12 rounded-full bg-[#0F1A2E] hover:bg-[#1A2944] text-white font-semibold disabled:opacity-40 transition-all"
              >
                {uploading ? <Loader2 className="w-4 h-4 inline animate-spin mr-2" /> : null}
                {uploading ? "Uploading..." : "Upload to Dashboard"}
              </button>
            </div>
          </div>
        </div>
      </div>
    );
  }
}