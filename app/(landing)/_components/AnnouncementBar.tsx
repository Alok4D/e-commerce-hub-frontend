import React from "react";

export function AnnouncementBar() {
  return (
    <div className="w-full bg-[#111111] text-white text-xs py-2 px-4 font-sans tracking-wide">
      <div className="max-w-[1320px] mx-auto text-center flex items-center justify-center gap-2">
        <span>Good finds. Great value.</span>
        <span className="opacity-40">•</span>
        <span>Nationwide delivery across Bangladesh</span>
      </div>
    </div>
  );
}
