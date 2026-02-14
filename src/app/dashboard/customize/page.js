"use client";
import { useState, useEffect } from "react";
import { useSession } from "next-auth/react";
import { useSearchParams, useRouter } from "next/navigation";
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
      "Sticky sidebar, dark theme, scroll-tracked navigation. Loved by developers and designers.",
    tags: ["Dark", "Sidebar", "Minimal"],
  },
  {
    id: "minimal",
    name: "Minimal Light",
    description:
      "Clean white layout, generous spacing, elegant typography. Timeless and professional.",
    tags: ["Light", "Clean", "Classic"],
  },
  {
    id: "creative",
    name: "Creative Bold",
    description:
      "Asymmetric layout, big type, colorful accents. For creatives who want to stand out.",
    tags: ["Colorful", "Bold", "Unique"],
  },
];

// Template preview mockups

function ModernPreview() {
  return (
    <div
      style={{
        background: "#0a0f1e",
        borderRadius: 8,
        padding: 12,
        height: "100%",
        display: "flex",
        gap: 10,
      }}
    >
      <div
        style={{ width: 60, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            width: 40,
            height: 6,
            background: "#f1f5f9",
            borderRadius: 3,
          }}
        />
        <div
          style={{
            width: 28,
            height: 4,
            background: "#475569",
            borderRadius: 2,
          }}
        />
        <div
          style={{
            marginTop: 10,
            display: "flex",
            flexDirection: "column",
            gap: 5,
          }}
        >
          {["About", "Exp", "Skills", "Projects"].map((l) => (
            <div
              key={l}
              style={{ display: "flex", alignItems: "center", gap: 4 }}
            >
              <div
                style={{
                  width: l === "About" ? 14 : 8,
                  height: 1,
                  background:
                    l === "About"
                      ? "linear-gradient(90deg,#4f46e5,#fb923c)"
                      : "#334155",
                }}
              />
              <div
                style={{
                  width: 20,
                  height: 3,
                  background: l === "About" ? "#f1f5f9" : "#334155",
                  borderRadius: 1,
                }}
              />
            </div>
          ))}
        </div>
      </div>
      <div
        style={{ flex: 1, display: "flex", flexDirection: "column", gap: 8 }}
      >
        <div
          style={{
            width: 30,
            height: 3,
            background: "#4f46e5",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            width: "100%",
            height: 3,
            background: "#1e293b",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            width: "80%",
            height: 3,
            background: "#1e293b",
            borderRadius: 1,
          }}
        />
        <div style={{ display: "flex", gap: 4, marginTop: 4 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 24,
                height: 8,
                background: "rgba(79,70,229,0.2)",
                borderRadius: 99,
              }}
            />
          ))}
        </div>
        <div
          style={{
            width: "100%",
            height: 3,
            background: "#1e293b",
            borderRadius: 1,
          }}
        />
        <div
          style={{
            width: "60%",
            height: 3,
            background: "#1e293b",
            borderRadius: 1,
          }}
        />
      </div>
    </div>
  );
}

function MinimalPreview() {
  return (
    <div
      style={{
        background: "#ffffff",
        borderRadius: 8,
        padding: 14,
        height: "100%",
      }}
    >
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "flex-start",
          marginBottom: 14,
        }}
      >
        <div>
          <div
            style={{
              width: 52,
              height: 7,
              background: "#111827",
              borderRadius: 2,
              marginBottom: 4,
            }}
          />
          <div
            style={{
              width: 36,
              height: 4,
              background: "#d1d5db",
              borderRadius: 1,
            }}
          />
        </div>
        <div style={{ display: "flex", gap: 6 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 16,
                height: 4,
                background: "#e5e7eb",
                borderRadius: 1,
              }}
            />
          ))}
        </div>
      </div>
      <div
        style={{
          borderTop: "1px solid #f3f4f6",
          paddingTop: 10,
          display: "flex",
          flexDirection: "column",
          gap: 6,
        }}
      >
        {[1, 2, 3].map((i) => (
          <div key={i} style={{ display: "flex", gap: 8 }}>
            <div
              style={{
                width: 28,
                height: 3,
                background: "#e5e7eb",
                borderRadius: 1,
                marginTop: 2,
              }}
            />
            <div
              style={{
                flex: 1,
                display: "flex",
                flexDirection: "column",
                gap: 3,
              }}
            >
              <div
                style={{
                  width: "60%",
                  height: 4,
                  background: "#111827",
                  borderRadius: 1,
                }}
              />
              <div
                style={{
                  width: "100%",
                  height: 3,
                  background: "#e5e7eb",
                  borderRadius: 1,
                }}
              />
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}

function CreativePreview() {
  return (
    <div
      style={{
        background: "#fafafa",
        borderRadius: 8,
        height: "100%",
        overflow: "hidden",
      }}
    >
      <div
        style={{
          background: "linear-gradient(135deg, #4f46e5, #fb923c)",
          height: "45%",
          padding: 12,
        }}
      >
        <div
          style={{
            width: 50,
            height: 8,
            background: "rgba(255,255,255,0.9)",
            borderRadius: 2,
            marginBottom: 5,
          }}
        />
        <div
          style={{
            width: 34,
            height: 4,
            background: "rgba(255,255,255,0.5)",
            borderRadius: 1,
          }}
        />
      </div>
      <div
        style={{
          padding: 10,
          display: "flex",
          flexDirection: "column",
          gap: 5,
        }}
      >
        <div style={{ display: "flex", gap: 5 }}>
          <div
            style={{
              flex: 1,
              height: 28,
              background: "#f3f4f6",
              borderRadius: 6,
            }}
          />
          <div
            style={{
              flex: 1,
              height: 28,
              background: "#f3f4f6",
              borderRadius: 6,
            }}
          />
        </div>
        <div
          style={{
            width: "80%",
            height: 4,
            background: "#e5e7eb",
            borderRadius: 1,
          }}
        />
        <div style={{ display: "flex", gap: 4 }}>
          {[1, 2, 3].map((i) => (
            <div
              key={i}
              style={{
                width: 20,
                height: 6,
                background:
                  i === 1 ? "#4f46e5" : i === 2 ? "#fb923c" : "#7c3aed",
                borderRadius: 99,
                opacity: 0.7,
              }}
            />
          ))}
        </div>
      </div>
    </div>
  );
}

const PREVIEWS = {
  modern: <ModernPreview />,
  minimal: <MinimalPreview />,
  creative: <CreativePreview />,
};

// Main Page

export default function CustomizePage() {
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
        transition: Bounce,
      });
      setTimeout(() => router.push(`/portfolio/${username}`), 1500);
    } catch (err) {
      toast.error(err.message || "Failed to publish", {
        position: "top-right",
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
            className="flex items-center gap-1.5 text-sm text-gray-500 hover:text-gray-800 transition-colors mb-3"
          >
            <ArrowLeft className="w-4 h-4" /> Back to Review
          </button>
          <h2 className="text-2xl font-bold text-gray-900">
            Choose a Template
          </h2>
          <p className="text-gray-600 mt-1">
            Pick how your portfolio looks to the world
          </p>
        </div>
        <button
          onClick={handlePublish}
          disabled={saving}
          className="flex items-center gap-2 px-5 py-2.5 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60 mt-8"
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
      <div className="flex items-center gap-3 px-5 py-3.5 bg-white rounded-2xl border border-gray-200">
        <Globe className="w-4 h-4 text-[#4f46e5] shrink-0" />
        <span className="text-sm text-gray-500">
          Your portfolio will be live at
        </span>
        <span className="text-sm font-semibold text-gray-900">
          /portfolio/{username}
        </span>
        <a
          href={`/portfolio/${username}`}
          target="_blank"
          rel="noreferrer"
          className="ml-auto text-gray-400 hover:text-[#4f46e5] transition-colors"
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
                ? "border-[#4f46e5] shadow-lg shadow-indigo-100"
                : "border-gray-200 hover:border-gray-300"
            }`}
          >
            {/* Mockup */}
            <div className="h-44 relative">
              {PREVIEWS[template.id]}
              {selected === template.id && (
                <div className="absolute top-3 right-3 w-6 h-6 rounded-full bg-[#4f46e5] flex items-center justify-center">
                  <Check className="w-3.5 h-3.5 text-white" />
                </div>
              )}
            </div>

            {/* Info */}
            <div
              className={`p-4 transition-colors ${selected === template.id ? "bg-indigo-50" : "bg-white"}`}
            >
              <div className="flex items-center justify-between mb-1">
                <span className="font-semibold text-gray-900 text-sm">
                  {template.name}
                </span>
                {selected === template.id && (
                  <span className="text-xs font-semibold text-[#4f46e5]">
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
                    className="text-xs px-2 py-0.5 rounded-full bg-gray-100 text-gray-600 font-medium"
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
          className="flex items-center gap-2 px-6 py-3 bg-gradient-to-r from-[#4f46e5] via-[#7c3aed] to-[#fb923c] text-white rounded-xl font-semibold hover:shadow-lg transition-all disabled:opacity-60"
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
