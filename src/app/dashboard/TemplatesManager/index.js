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
    <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
      {TEMPLATES.map((template) => (
        <button
          key={template.id}
          onClick={() => setSelected(template.id)}
          className={`text-left rounded-2xl border-2 overflow-hidden transition-all hover:shadow-lg }`}
        >
          {/* Mockup */}
          <div className="h-44 relative bg-gray-900 flex items-center justify-center">
            <Image
              src={"/" + template.id + ".png"}
              alt={template.name}
              fill
              className="object-fill"
            />
          </div>

          {/* Info */}
          <div className={`p-4 transition-colors`}>
            <div className="flex items-center justify-between mb-1">
              <span className="font-semibold text-gray-900 text-sm">
                {template.name}
              </span>
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
  );
};

export default TemplatesManager;
