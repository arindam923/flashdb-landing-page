"use client";

import { motion } from "framer-motion";
import { useEffect, useState } from "react";
import { BarChart3, Clock, Zap } from "lucide-react";

export function PerformanceCharts() {
  return (
    <div className="flex flex-col h-full bg-[#050505] rounded-3xl overflow-hidden shadow-2xl relative group">
      {/* Background radial highlight */}
      <div className="absolute top-0 right-0 w-[300px] h-[300px] bg-blue-500/5 blur-[100px] rounded-full pointer-events-none" />
      
      <div className="p-8 pb-4 flex items-center justify-between relative z-10">
        <div className="flex flex-col gap-1">
          <h3 className="text-xl font-bold text-white tracking-tight flex items-center gap-2">
            System Operations
          </h3>
          <p className="text-zinc-500 text-xs font-medium uppercase tracking-wider">Live Telemetry</p>
        </div>
        <div className="flex items-center gap-2 bg-white/5 border border-white/10 px-3 py-1.5 rounded-xl">
          <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse" />
          <span className="text-[10px] font-bold text-zinc-300">STABLE</span>
        </div>
      </div>

      <div className="flex-1 grid grid-cols-1 md:grid-cols-2 gap-px bg-white/5 relative z-10">
        {/* Latency Widget */}
        <div className="bg-[#050505] p-6 flex flex-col justify-between group/widget cursor-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Clock className="w-3 h-3" /> Latency
            </span>
            <span className="text-[10px] font-mono text-emerald-500 bg-emerald-500/10 px-1.5 py-0.5 rounded">-12%</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tighter">0.82</span>
            <span className="text-zinc-500 font-bold text-xs uppercase">ms</span>
          </div>
          <div className="h-12 mt-4 overflow-hidden rounded-lg">
             <MiniSparkline color="#10b981" />
          </div>
        </div>

        {/* Throughput Widget */}
        <div className="bg-[#050505] p-6 flex flex-col justify-between group/widget cursor-default">
          <div className="flex items-center justify-between mb-2">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <Zap className="w-3 h-3" /> Throughput
            </span>
            <span className="text-[10px] font-mono text-blue-500 bg-blue-500/10 px-1.5 py-0.5 rounded">PEAK</span>
          </div>
          <div className="flex items-baseline gap-2">
            <span className="text-4xl font-bold text-white tracking-tighter">2.4</span>
            <span className="text-zinc-500 font-bold text-xs uppercase">M/s</span>
          </div>
          <div className="h-12 mt-4 overflow-hidden rounded-lg">
             <MiniSparkline color="#3b82f6" />
          </div>
        </div>

        {/* Query Distribution Widget */}
        <div className="md:col-span-2 bg-[#050505] p-8 pb-10 flex flex-col gap-6">
          <div className="flex items-center justify-between">
            <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-widest flex items-center gap-1.5">
              <BarChart3 className="w-3 h-3" /> Query Distribution
            </span>
            <div className="flex gap-4">
              <LegendItem color="#3b82f6" label="Read" />
              <LegendItem color="#8b5cf6" label="Write" />
            </div>
          </div>
          <div className="flex-1 flex items-end gap-1.5 h-24">
            <QueryBars />
          </div>
        </div>
      </div>
    </div>
  );
}

function QueryBars() {
  const [bars, setBars] = useState<{ height: string; subHeight: string }[]>([]);

  useEffect(() => {
    setBars(Array.from({ length: 24 }).map(() => ({
      height: `${20 + Math.random() * 80}%`,
      subHeight: `${20 + Math.random() * 30}%`
    })));
  }, []);

  return (
    <>
      {bars.map((bar, i) => (
        <motion.div
          key={i}
          className="flex-1 bg-gradient-to-t from-blue-500/40 to-blue-500 rounded-sm relative"
          initial={{ height: 0 }}
          animate={{ height: bar.height }}
          transition={{ delay: i * 0.02, duration: 1, ease: "easeOut" }}
        >
          <div 
            className="absolute bottom-0 w-full bg-purple-500/50 rounded-sm" 
            style={{ height: bar.subHeight }} 
          />
        </motion.div>
      ))}
    </>
  );
}

function MiniSparkline({ color }: { color: string }) {
  const [path, setPath] = useState("");
  
  useEffect(() => {
    const points = Array.from({ length: 20 }).map((_, i) => {
      const x = (i / 19) * 100;
      const y = 30 + Math.random() * 40;
      return `${i === 0 ? 'M' : 'L'} ${x} ${y}`;
    });
    setPath(points.join(" "));
  }, []);

  return (
    <svg viewBox="0 0 100 100" preserveAspectRatio="none" className="w-full h-full opacity-50">
      <title>Mini sparkline</title>
      <motion.path
        d={path}
        fill="none"
        stroke={color}
        strokeWidth="2"
        initial={{ pathLength: 0 }}
        animate={{ pathLength: 1 }}
        transition={{ duration: 1.5, ease: "easeInOut" }}
      />
    </svg>
  );
}

function LegendItem({ color, label }: { color: string; label: string }) {
  return (
    <div className="flex items-center gap-1.5">
      <div className="w-1.5 h-1.5 rounded-full" style={{ backgroundColor: color }} />
      <span className="text-[10px] text-zinc-500 font-bold uppercase">{label}</span>
    </div>
  );
}
