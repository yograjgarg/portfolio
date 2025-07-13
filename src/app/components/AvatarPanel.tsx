"use client";

import { useState, useRef, useLayoutEffect } from "react";
import gsap from "gsap";
import ProfileCard from "./Cards/ProfileCard";
import HowToUse from "./HowToUse";
import Quote from "./Quote";
import { ChevronDown, ChevronUp } from "lucide-react";

export default function AvatarPanel() {
  const [isOpen, setIsOpen] = useState(false);
  const contentRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
    if (!contentRef.current) return;

    gsap.to(contentRef.current, {
      height: isOpen ? "auto" : 0,
      duration: 0.4,
      ease: "power2.inOut",
      opacity: isOpen ? 1 : 0,
      pointerEvents: isOpen ? "auto" : "none",
      overflow: "hidden",
    });
  }, [isOpen]);

  return (
    <aside className="md:w-1/3 bg-[#181818] md:p-6 text-white">
      {/* Desktop sidebar */}
      <div className="hidden md:flex flex-col space-y-4">
        <ProfileCard />
        <Quote />
        <HowToUse />
      </div>

      {/* Mobile collapsible */}
      <div className="md:hidden">
        <button
          onClick={() => setIsOpen((prev) => !prev)}
          className="w-full flex items-center justify-between px-4 py-3 bg-[#212121]"
        >
          <div className="flex items-center gap-3">
            <img
              src="/yograj-garg.jpeg"
              alt="Yograj Garg"
              className="w-10 h-10 rounded-full border object-cover"
              loading="lazy"
            />
            <div className="flex flex-col items-start">
              <p className="text-sm font-semibold">Yograj Garg</p>
              <p className="text-xs text-gray-400">Frontend Developer</p>
            </div>
          </div>
          {isOpen ? <ChevronUp size={18} /> : <ChevronDown size={18} />}
        </button>

        {/* Smooth toggle area */}
        <div
          ref={contentRef}
          style={{ height: 0, overflow: "hidden", opacity: 0 }}
          className="px-2 space-y-4"
        >
          <ProfileCard />
          <Quote />
          <HowToUse />
        </div>
      </div>
    </aside>
  );
}
