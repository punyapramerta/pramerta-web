"use client";

import { useEffect, useRef, useState } from "react";
import { useAppData } from "@/hooks/useAppData";

function useCountUp(target: number, duration = 1500, start = false) {
  const [count, setCount] = useState(0);
  useEffect(() => {
    if (!start) return;
    let startTime: number | null = null;
    const step = (ts: number) => {
      if (!startTime) startTime = ts;
      const progress = Math.min((ts - startTime) / duration, 1);
      setCount(Math.floor(progress * target));
      if (progress < 1) requestAnimationFrame(step);
    };
    requestAnimationFrame(step);
  }, [target, duration, start]);
  return count;
}

function StatItem({ value, suffix, label }: { value: number; suffix: string; label: string }) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const count = useCountUp(value, 1500, visible);

  useEffect(() => {
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) setVisible(true); },
      { threshold: 0.3 }
    );
    if (ref.current) observer.observe(ref.current);
    return () => observer.disconnect();
  }, []);

  return (
    <div ref={ref} className="text-center px-8">
      <div className="text-5xl md:text-6xl font-extrabold font-headline mb-3 text-white">
        {count}{suffix}
      </div>
      <div className="text-white/60 font-bold uppercase tracking-[0.2em] text-[11px]">
        {label}
      </div>
    </div>
  );
}

export default function StatsBar() {
  const { stats } = useAppData();

  return (
    <section style={{ background: "#1A3EB4" }} className="py-16 text-white relative overflow-hidden">
      <div className="absolute top-0 right-0 w-64 h-64 opacity-10 blur-3xl -mr-32 -mt-32 rounded-full" style={{ background: "white" }}></div>
      <div className="max-w-5xl mx-auto px-8 relative z-10 grid grid-cols-1 md:grid-cols-3 gap-10 divide-y md:divide-y-0 md:divide-x divide-white/15">
        {stats.map((stat) => (
          <StatItem key={stat.label} {...stat} />
        ))}
      </div>
    </section>
  );
}
