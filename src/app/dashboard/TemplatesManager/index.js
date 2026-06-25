import React from "react";
import Image from "next/image";

const TemplatesManager = () => {
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
  return (
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => setSelected(template.id)}
          className={`text-left rounded-3xl border border-white/5 bg-[#111111] overflow-hidden transition-all hover:border-[#c084fc]/50 hover:shadow-[0_0_20px_rgba(192,132,252,0.1)] cursor-pointer`}
        >
          {/* Mockup */}
          <div className="h-44 relative bg-black/40 flex items-center justify-center border-b border-white/5">
            <Image
              src={"/" + (template.id === 'modern' ? 'Modern' : template.id) + ".png"}
              alt={template.name}
              fill
              className="object-cover object-top"
            />
          </div>

          {/* Info */}
          <div className={`p-5 transition-colors`}>
            <div className="flex items-center justify-between mb-2">
              <span className="font-medium text-gray-200 text-base">
                {template.name}
              </span>
            </div>
            <p className="text-sm text-gray-500 leading-relaxed mb-4">
              {template.description}
            </p>
            <div className="flex gap-2 flex-wrap">
              {template.tags.map((tag) => (
                <span
                  key={tag}
                  className="text-xs px-3 py-1 rounded-full bg-[#c084fc]/10 text-[#c084fc] font-medium"
                >
                  {tag}
                </span>
              ))}
            </div>
          </div>
        </button>
      ))}
    </div>
  );
};

export default TemplatesManager;
