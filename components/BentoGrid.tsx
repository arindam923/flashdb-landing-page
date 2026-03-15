"use client";

import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import { Globe2D } from "./Globe2D";
import { PerformanceCharts } from "./PerformanceCharts";
import { MetricCards } from "./MetricCards";
import { ArrowUpRight, Zap } from "lucide-react";
import { MouseEvent } from "react";

export function BentoGrid() {
  const mouseX = useMotionValue(0);
  const mouseY = useMotionValue(0);

  function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
    const { left, top } = currentTarget.getBoundingClientRect();
    mouseX.set(clientX - left);
    mouseY.set(clientY - top);
  }

  return (
    <section className="w-full max-w-[1400px] mx-auto px-6 md:px-12 py-32 pb-48">
      <div className="flex flex-col gap-6 mb-20 text-center lg:text-left">
        <div className="flex items-center justify-center lg:justify-start gap-3">
          <div className="w-8 h-[2px] bg-emerald-500" />
          <span className="text-xs font-bold text-emerald-500 uppercase tracking-[0.3em]">Infrastructure</span>
        </div>
        <h2 className="text-4xl md:text-7xl font-bold text-white tracking-tighter max-w-4xl">
          Built for <span className="text-zinc-500">Global</span> Scale
        </h2>
        <p className="text-zinc-500 text-lg max-w-2xl leading-relaxed mx-auto lg:mx-0">
          FlashDB's distributed architecture is built to handle massive scale while maintaining sub-millisecond latency. 
        </p>
      </div>

      <div 
        onMouseMove={handleMouseMove}
        className="group/grid relative grid grid-cols-1 lg:grid-cols-12 gap-6"
      >
        {/* Subtle Spotlight Effect Layer */}
        <motion.div
          className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100 z-0"
          style={{
            background: useMotionTemplate`
              radial-gradient(
                800px circle at ${mouseX}px ${mouseY}px,
                rgba(255, 255, 255, 0.03),
                transparent 80%
              )
            `,
          }}
        />

        {/* Global Distribution - Right Side (recognized world map) */}
        <div className="lg:col-span-12 xl:col-span-5 order-1 xl:order-2">
           <div className="h-full rounded-3xl xl:rounded-tr-[80px] overflow-hidden border border-white/5 bg-[#050505]">
             <Globe2D />
           </div>
        </div>

        {/* Performance Dashboard - Left Side */}
        <div className="lg:col-span-12 xl:col-span-7 order-2 xl:order-1">
          <div className="h-full rounded-3xl xl:rounded-tl-[80px] overflow-hidden border border-white/5">
            <PerformanceCharts />
          </div>
        </div>

        {/* Bottom Section - Instant Scaling CTA (Left) & Full Width Metrics (Right) */}
        <div className="lg:col-span-12 grid grid-cols-1 lg:grid-cols-12 gap-6 order-3">
          {/* CTA Card */}
          <div className="lg:col-span-4 h-full relative group/cta overflow-hidden rounded-3xl xl:rounded-bl-[80px] border border-white/5 bg-[#050505] p-10 flex flex-col justify-between">
            <div className="relative z-10">
              <div className="w-14 h-14 bg-white rounded-2xl flex items-center justify-center mb-8 shadow-[0_0_20px_rgba(255,255,255,0.1)]">
                <Zap className="w-7 h-7 text-black" />
              </div>
              <h3 className="text-2xl font-bold text-white mb-3 tracking-tight">Instant Scaling</h3>
              <p className="text-zinc-500 text-sm leading-relaxed">Automatically rebalance clusters and provision capacity in seconds.</p>
            </div>
            
            <motion.button 
              whileHover={{ x: 5 }}
              className="flex items-center gap-2 text-white font-bold text-sm mt-10 relative z-10 group-hover:text-emerald-500 transition-colors"
            >
              Learn more <ArrowUpRight className="w-4 h-4" />
            </motion.button>

            {/* Subtle background glow */}
            <div className="absolute -bottom-20 -right-20 w-64 h-64 bg-emerald-500/5 blur-[100px] rounded-full" />
          </div>

          {/* Metric Cards - Taking Full Width of the remaining space */}
          <div className="lg:col-span-8 flex flex-col h-full overflow-hidden">
            <div className="flex-1 rounded-3xl xl:rounded-br-[80px]">
              <MetricCards />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
