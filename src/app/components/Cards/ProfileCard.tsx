"use client";

export default function ProfileCard() {
  return (
    <div className="mt-4 border border-gray-700 rounded-xl p-4 text-sm text-gray-300 shadow-inner font-mono text-[13px]">
      {/* Header — only show on desktop */}
      <div className="hidden md:flex items-center gap-4">
        <img
          src="/yograj-garg.jpeg"
          alt="Yograj Garg"
          className="w-16 h-16 rounded-md border border-gray-600 shadow-sm object-cover"
          loading="lazy"
        />
        <div>
          <h2 className="text-emerald-400 text-xs tracking-widest uppercase">
            DevPass™ ID: #0001
          </h2>
          <p className="text-white font-semibold mt-1">Yograj Garg</p>
          <p className="text-gray-400 text-xs">Frontend Developer</p>
        </div>
      </div>

      {/* Info */}
      <div
        className={`space-y-2 border-gray-700 md:mt-4  md:border-t  md:pt-4`}
      >
        <p>
          <span className="text-gray-500">Stack:</span>{" "}
          <span className="text-white">React, Next.js, Tailwind and more</span>
        </p>
        <p>
          <span className="text-gray-500">Superpower:</span>{" "}
          <span className="text-white">Figma → Functional Magic ✨</span>
        </p>
        <p>
          <span className="text-gray-500">Editor:</span>{" "}
          <span className="text-white">VS Code (fully armed)</span>
        </p>
      </div>

      <div className="mt-4 flex justify-between items-center text-xs text-gray-500 border-t border-gray-700 pt-3">
        <span>Issued by: Terminal Portfolio</span>
        <span className="text-emerald-500 font-semibold">● Active</span>
      </div>
    </div>
  );
}
