import { useState } from "react";
import { Upload, Loader2, Check } from "lucide-react";
import { base44 } from "@/api/base44Client";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";

const LOGO = "https://media.base44.com/images/public/6a1440ebe28bb283cc5442e2/da745320e_logo-lensflow-mark.png";

export default function Enhance() {
  const [phase, setPhase] = useState("upload"); // "upload" | "processing" | "results"
  const [uploadedImage, setUploadedImage] = useState(null);
  const [variations, setVariations] = useState([]);
  const [selected, setSelected] = useState(null);
  const [processing, setProcessing] = useState(false);

  const handleImageUpload = async (e) => {
    const file = e.target.files?.[0];
    if (!file) return;

    setUploadedImage(file);
    setProcessing(true);
    setPhase("processing");

    try {
      // Upload the image first
      const uploadRes = await base44.integrations.Core.UploadFile({ file });
      const imageUrl = uploadRes.file_url;

      // Call backend to enhance and generate variations
      const enhanceRes = await base44.functions.invoke("enhanceImage", {
        image_url: imageUrl,
      });

      setVariations(enhanceRes.data.variations || []);
      setPhase("results");
    } catch (err) {
      alert("Enhancement failed: " + err.message);
      setPhase("upload");
    } finally {
      setProcessing(false);
    }
  };

  const handleSelectVariation = async (variationUrl) => {
    setSelected(variationUrl);
    // TODO: Save enhanced image to collection or Reel
    alert("Image selected! You can now use this in your video recordings.");
  };

  return (
    <div className="min-h-screen" style={{ background: "#FAF7F2", color: "#0F1A2E" }}>
      <Navbar />

      <section className="pt-32 pb-16 px-6 text-center">
        <h1 className="text-5xl md:text-6xl font-bold mb-4 leading-tight">
          Enhance Your <span style={{ color: "#C99A2E" }}>Property Photos</span>
        </h1>
        <p className="text-lg text-[#0F1A2E]/60 max-w-2xl mx-auto">
          Transform low-quality photos into stunning, professional-grade images. Choose from 3 interior layout variations.
        </p>
      </section>

      {phase === "upload" && (
        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto">
            <div
              className="border-2 border-dashed border-[#C99A2E]/40 rounded-2xl p-12 text-center cursor-pointer hover:border-[#C99A2E]/60 transition-all"
              style={{ background: "rgba(201,154,46,0.04)" }}
            >
              <label className="flex flex-col items-center gap-4 cursor-pointer">
                <div
                  className="w-16 h-16 rounded-full flex items-center justify-center"
                  style={{ background: "rgba(201,154,46,0.12)" }}
                >
                  <Upload className="w-8 h-8" style={{ color: "#C99A2E" }} />
                </div>
                <div className="space-y-2">
                  <p className="text-lg font-semibold text-[#0F1A2E]">Upload your property photo</p>
                  <p className="text-sm text-[#0F1A2E]/60">
                    JPG, PNG, or WebP. Works best with clear, well-lit interior photos.
                  </p>
                </div>
                <input
                  type="file"
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden"
                />
              </label>
            </div>
          </div>
        </section>
      )}

      {phase === "processing" && (
        <section className="pb-24 px-6">
          <div className="max-w-2xl mx-auto flex flex-col items-center justify-center gap-6 py-16">
            <div
              className="w-16 h-16 rounded-2xl flex items-center justify-center animate-pulse-glow"
              style={{ background: "rgba(201,154,46,0.12)" }}
            >
              <Loader2 className="w-8 h-8 animate-spin" style={{ color: "#C99A2E" }} />
            </div>
            <div className="text-center space-y-2">
              <p className="text-xl font-semibold text-[#0F1A2E]">Enhancing your photo...</p>
              <p className="text-sm text-[#0F1A2E]/60">
                We're upscaling and generating 3 furniture layout variations. This usually takes 30–60 seconds.
              </p>
            </div>
          </div>
        </section>
      )}

      {phase === "results" && (
        <section className="pb-24 px-6">
          <div className="max-w-5xl mx-auto space-y-8">
            <div className="text-center space-y-2">
              <h2 className="text-3xl font-bold text-[#0F1A2E]">Choose Your Favorite Layout</h2>
              <p className="text-[#0F1A2E]/60">
                All three are enhanced to professional quality. Pick the one that best showcases the property.
              </p>
            </div>

            <div className="grid md:grid-cols-3 gap-6">
              {variations.map((variation, idx) => (
                <div
                  key={idx}
                  onClick={() => handleSelectVariation(variation)}
                  className={`rounded-2xl overflow-hidden cursor-pointer transition-all border-2 ${
                    selected === variation
                      ? "border-[#C99A2E] shadow-lg"
                      : "border-[#0F1A2E]/10 hover:border-[#0F1A2E]/20"
                  }`}
                >
                  <img
                    src={variation}
                    alt={`Layout ${idx + 1}`}
                    className="w-full aspect-square object-cover"
                  />
                  <div className="p-4 bg-white flex items-center justify-between">
                    <span className="text-sm font-medium text-[#0F1A2E]">Layout {idx + 1}</span>
                    {selected === variation && (
                      <Check className="w-5 h-5" style={{ color: "#C99A2E" }} />
                    )}
                  </div>
                </div>
              ))}
            </div>

            <div className="text-center">
              <button
                onClick={() => setPhase("upload")}
                className="inline-flex items-center gap-2 px-6 py-3 rounded-full border border-[#0F1A2E]/15 text-[#0F1A2E] hover:border-[#0F1A2E]/30 transition-all"
              >
                Enhance Another Photo
              </button>
            </div>
          </div>
        </section>
      )}

      <Footer />
    </div>
  );
}