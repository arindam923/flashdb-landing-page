"use client";

import type { GraphNode } from "@/state/graphStore";
import { cn } from "@/lib/utils";
import { Database, Zap, Cpu, Search, HardDrive, ShieldCheck } from "lucide-react";
import { motion } from "framer-motion";

interface NodeProps {
  node: GraphNode;
}

const getIcon = (id: string) => {
  switch (id) {
    case "realtime": return <Zap className="w-4 h-4" />;
    case "memory": return <Cpu className="w-4 h-4" />;
    case "query": return <Search className="w-4 h-4" />;
    case "disk": return <HardDrive className="w-4 h-4" />;
    case "txns": return <ShieldCheck className="w-4 h-4" />;
    default: return null;
  }
};

export function Node({ node }: NodeProps) {
  const isCore = node.id === "core";
  const size = isCore ? 140 : 60;
  
  if (isCore) {
    return (
      <motion.div
        initial={{ scale: 0.8, opacity: 0 }}
        animate={{ scale: 1, opacity: 1 }}
        transition={{ duration: 0.8, ease: "easeOut" }}
        className="absolute z-20 flex items-center justify-center cursor-pointer group"
        style={{
          width: size,
          height: size,
          left: node.x - size / 2,
          top: node.y - size / 2,
        }}
      >
        {/* Multiple layers of glow for the core */}
        <motion.div 
          className="absolute inset-0 rounded-full bg-white opacity-20 blur-2xl"
          animate={{ scale: [1, 1.2, 1] }}
          transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
        />
        <div className="absolute inset-0 rounded-full bg-gradient-to-br from-white via-white/80 to-slate-200 shadow-[0_0_50px_rgba(255,255,255,0.5)] flex items-center justify-center">
          <div className="relative z-10 p-4 bg-slate-900 rounded-full border border-slate-700/50 shadow-inner">
            <Database className="w-10 h-10 text-white" />
          </div>
        </div>
        
        {/* Orbiting particles around core */}
        <svg className="absolute inset-[-40px] w-[220px] h-[220px] pointer-events-none overflow-visible">
          <title>Orbiting particles decoration</title>
          <circle cx="110" cy="110" r="100" fill="none" stroke="white" strokeWidth="0.5" strokeOpacity="0.1" strokeDasharray="4 8" />
        </svg>
      </motion.div>
    );
  }

  return (
    <motion.div
      initial={{ scale: 0.5, opacity: 0, x: "-50%", y: "calc(-50% + 20px)" }}
      animate={{ scale: 1, opacity: 1, x: "-50%", y: "-50%" }}
      transition={{ 
        delay: 0.2 + (Math.random() * 0.5), 
        duration: 0.5, 
        type: "spring",
        stiffness: 100 
      }}
      whileHover={{ scale: 1.05, y: "calc(-50% - 5px)" }}
      className={cn(
        "absolute flex items-center gap-3 text-white cursor-pointer px-4 py-3 rounded-xl border z-10",
        "bg-black/40 backdrop-blur-md border-white/10 group overflow-hidden"
      )}
      style={{
        left: node.x,
        top: node.y,
        borderColor: `${node.color}40`,
        boxShadow: `0 8px 32px rgba(0,0,0,0.4), 0 0 15px ${node.color}20`
      }}
    >
      {/* Animated background glow on hover */}
      <motion.div 
        className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
        style={{ background: `radial-gradient(circle at center, ${node.color}15 0%, transparent 70%)` }}
      />

      <div 
        className="flex items-center justify-center w-8 h-8 rounded-lg"
        style={{ backgroundColor: `${node.color}20`, color: node.color }}
      >
        {getIcon(node.id)}
      </div>

      <div className="flex flex-col">
        <span className="font-sans text-sm font-bold tracking-tight text-slate-100">
          {node.label}
        </span>
        <span className="text-[10px] uppercase tracking-widest text-slate-400 font-medium">
          Cluster Node
        </span>
      </div>

      {/* Decorative pulse indicator */}
      <div 
        className="absolute top-2 right-2 w-1.5 h-1.5 rounded-full animate-pulse"
        style={{ backgroundColor: node.color }}
      />
    </motion.div>
  );
}
