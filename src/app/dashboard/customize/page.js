"use client";
import { useState, useEffect, Suspense } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
import Image from "next/image";
import {
  Check,
  ExternalLink,
  Loader2,
  Globe,
  Sparkles,
  ArrowLeft,
} from "lucide-react";
import { Bounce, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const TEMPLATES = [
  {
    id: "modern",
    name: "Modern Dark",
    description:
      "Clean white layout, generous spacing, elegant typography. Timeless and professional.",
    tags: ["Dark", "Sidebar", "Minimal"],
  },
  {
    id: "editorial",
    name: "Editorial",
    description:
      "Magazine-inspired layout with serif typography, warm cream tones, and bold section numbers. Stands out from every dark-theme portfolio.",
    tags: ["Light", "Serif", "Magazine"],
  },
  {
    id: "terminal",
    name: "Terminal",
    description:
      "Your portfolio as a VS Code editor. Syntax-highlighted files, openable tabs, typewriter effect. The most memorable template for tech roles.",
    tags: ["Dark", "IDE", "Interactive"],
  },
];

// Main Page

function CustomizeContent() {
  const { data: session } = useSession();
  const searchParams = useSearchParams();
  const router = useRouter();

  const portfolioId = searchParams.get("portfolioId");
  const username = session?.user?.name;

  const [selected, setSelected] = useState("modern");
  const [saving, setSaving] = useState(false);

  const handlePublish = async () => {
    // Read the details saved by the review page
    const stored = sessionStorage.getItem("portfolioDetails");
    if (!stored) {
      toast.error("No portfolio data found. Please go back and try again.", {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
      return;
    }

    setSaving(true);
    try {
      // One single API call with everything
      const res = await fetch("/api/update-portfolio", {
        method: "PATCH",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          id: portfolioId,
          details: JSON.parse(stored),
          selectedTemplate: selected,
          username: username,
        }),
      });
      const data = await res.json();
      if (!res.ok) throw new Error(data.error);

      // Clean up sessionStorage
      sessionStorage.removeItem("portfolioDetails");

      toast.success("Portfolio published!", {
        position: "top-right",
        autoClose: 2000,
        theme: "dark",
        transition: Bounce,
      });
      router.push("/dashboard");
    } catch (err) {
      toast.error(err.message || "Failed to publish", {
        position: "top-right",
        theme: "dark",
        transition: Bounce,
      });
    } finally {
      setSaving(false);
    }
  };

  return (
    <div className="max-w-4xl mx-auto space-y-8 py-2">
      {/* ── Header ── */}
      <div className="flex items-start justify-between">
        <div>
          <button
            onClick={() => router.back()}
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-300 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Review
          </button>
          <h2 className="text-2xl font-bold text-gray-200">
            Choose a Template
          </h2>
          <p className="text-gray-400 mt-1">
            Pick how your portfolio looks to the world
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60 mt-8"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {saving ? "Publishing..." : "Publish Portfolio"}
        </button>
      </div>

      {/* ── Public URL banner ── */}
      <div className="flex items-center gap-3 px-5 py-3.5 bg-[#111111] rounded-2xl border border-white/5">
        <Globe className="w-4 h-4 text-[#c084fc] shrink-0" />
        <span className="text-sm text-gray-500">
          Your portfolio will be live at
        </span>
        <span className="text-sm font-semibold text-gray-200">
          /portfolio/{username}
        </span>
        <a
          href={`/portfolio/${username}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-gray-400 hover:text-[#c084fc] transition-colors"
        >
          <ExternalLink className="w-4 h-4" />
        </a>
      </div>

      {/* ── Template cards ── */}
      <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
        {TEMPLATES.map((template) => (
          <button
            key={template.id}
            onClick={() => setSelected(template.id)}
            className={`text-left rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg ${
              selected === template.id
                ? "border-[#4f46e5] shadow-lg shadow-[#c084fc]/20"
                : "border-white/5 hover:border-white/10"
            }`}
          >
            {/* Mockup */}
            <div className="h-44 relative bg-[#0a0a0a] flex items-center justify-center">
              <Image
                src={"/" + (template.id === 'modern' ? 'Modern' : template.id) + ".png"}
                alt={template.name}
                fill
                className="object-cover object-top"
              />
            </div>

            {/* Info */}
            <div
              className={`p-4 transition-colors ${selected === template.id ? "bg-[#c084fc]/10" : "bg-[#111111]"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-200 text-sm">
                  {template.name}
                </span>
                {selected === template.id && (
                  <span className="text-xs font-semibold text-[#c084fc]">
                    Selected
                  </span>
                )}
              </div>
              <p className="text-xs text-gray-500 leading-relaxed mb-3">
                {template.description}
              </p>
              <div className="flex gap-1.5 flex-wrap">
                {template.tags.map((tag) => (
                  <span
                    key={tag}
                    className="text-xs px-2 py-0.5 rounded-full bg-white/5 text-gray-400 font-medium"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </button>
        ))}
      </div>

      {/* ── Bottom publish ── */}
      <div className="flex items-center justify-between pt-2 pb-8">
        <p className="text-sm text-gray-500">
          You can change your template anytime from the dashboard.
        </p>
        <button
          onClick={handlePublish}
          disabled={saving}
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#c084fc] via-[#a855f7] to-[#ec4899] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60"
        >
          {saving ? (
            <Loader2 className="w-4 h-4 animate-spin" />
          ) : (
            <Sparkles className="w-4 h-4" />
          )}
          {saving ? "Publishing..." : "Publish Portfolio"}
        </button>
      </div>
    </div>
  );
}

export default function CustomizePage() {
  return (
    <Suspense fallback={
      <div className="flex items-center justify-center min-h-screen">
        <Loader2 className="w-8 h-8 animate-spin text-gray-500" />
      </div>
    }>
      <CustomizeContent />
    </Suspense>
  );
}
