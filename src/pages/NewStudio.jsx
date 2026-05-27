import { useState, useRef } from 'react';
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import { Upload, Play, Square } from "lucide-react";

export default function NewStudio() {
  const [avatar, setAvatar] = useState(null);
  const [recording, setRecording] = useState(false);
  const videoRef = useRef(null);
  const fileInputRef = useRef(null);
  const mediaRecorderRef = useRef(null);

  const handleAvatarUpload = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = (evt) => setAvatar(evt.target.result);
      reader.readAsDataURL(file);
    }
  };

  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ video: true });
      if (videoRef.current) {
        videoRef.current.srcObject = stream;
      }
      const recorder = new MediaRecorder(stream);
      mediaRecorderRef.current = recorder;
      recorder.start();
      setRecording(true);
    } catch (err) {
      console.error('Failed to start recording:', err);
      alert('Camera access denied. Please allow camera permissions.');
    }
  };

  const stopRecording = () => {
    if (mediaRecorderRef.current) {
      mediaRecorderRef.current.stop();
      setRecording(false);
      mediaRecorderRef.current.onstop = () => {
        if (videoRef.current && videoRef.current.srcObject) {
          const stream = videoRef.current.srcObject;
          stream.getTracks().forEach((track) => track.stop());
        }
      };
    }
  };

  return (
    <div className="min-h-screen" style={{ background: "#0a0e1a", color: "#f8f3ea" }}>
      <Navbar />

      <section style={{ paddingTop: "80px", paddingBottom: "100px", paddingLeft: "24px", paddingRight: "24px" }}>
        <div className="max-w-2xl mx-auto">
          <h1 style={{ textAlign: "center", color: "#C99A2E", fontSize: "42px", marginBottom: "12px" }}>LENSFLOW Studio</h1>
          <p style={{ textAlign: "center", color: "#aaa", marginBottom: "60px" }}>Create studio-quality videos with AI presenters</p>

          {/* Avatar Upload */}
          <div className="rounded-2xl p-8 border border-white/10 mb-8" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h3 className="text-xl font-bold mb-6">1. Generate Custom AI Avatar</h3>
            <div
              onClick={() => fileInputRef.current.click()}
              className="border-2 border-dashed rounded-2xl p-16 text-center cursor-pointer hover:border-yellow-600 transition-colors"
              style={{ borderColor: "#555" }}
            >
              <Upload className="w-12 h-12 mx-auto mb-4 text-[#C99A2E]" />
              <p className="text-white/60">📸 Upload your face photo to create your digital twin</p>
              <input type="file" ref={fileInputRef} accept="image/*" onChange={handleAvatarUpload} className="hidden" />
            </div>
            {avatar && (
              <div style={{ textAlign: "center", marginTop: "20px" }}>
                <img src={avatar} style={{ width: "180px", height: "180px", borderRadius: "50%", border: "4px solid #C99A2E" }} alt="Avatar" />
                <button className="mt-4 px-6 py-2 rounded-xl font-semibold" style={{ background: "#C99A2E", color: "#0a0a0a" }}>
                  Use This Avatar
                </button>
              </div>
            )}
          </div>

          {/* Recorder */}
          <div className="rounded-2xl p-8 border border-white/10" style={{ background: "rgba(255,255,255,0.02)" }}>
            <h3 className="text-xl font-bold mb-6">2. Record with Lip Sync</h3>
            <div className="relative rounded-2xl overflow-hidden bg-black mb-6" style={{ height: "420px" }}>
              <video ref={videoRef} autoPlay playsInline style={{ width: "100%", height: "100%", objectFit: "cover" }} />
            </div>
            <div style={{ display: "flex", gap: "12px" }}>
              <button
                onClick={startRecording}
                disabled={recording}
                className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: recording ? "#999" : "#C99A2E", color: "#0a0a0a" }}
              >
                <Play className="w-4 h-4" /> Start Recording
              </button>
              <button
                onClick={stopRecording}
                disabled={!recording}
                className="flex-1 py-3 rounded-xl font-semibold flex items-center justify-center gap-2 transition-all"
                style={{ background: recording ? "#ef4444" : "#999", color: "white" }}
              >
                <Square className="w-4 h-4" /> Stop Recording
              </button>
            </div>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
}