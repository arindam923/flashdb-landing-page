"use client";

import { useEffect, useState } from "react";
import { Node } from "./Node";
import { Edge } from "./Edge";
import { graphStore, type GraphData } from "@/state/graphStore";
import { motion } from "framer-motion";

export function AnimatedGraph() {
  const [data, setData] = useState<GraphData>(graphStore.getData());

  const [particles, setParticles] = useState<{ id: number; x: number; y: number; size: number; duration: number }[]>([]);

  useEffect(() => {
    // Generate particles on mount to avoid hydration mismatch
    setParticles(Array.from({ length: 20 }).map((_, i) => ({
      id: i,
      x: Math.random() * 800,
      y: Math.random() * 800,
      size: Math.random() * 2 + 1,
      duration: 10 + Math.random() * 20
    })));

    // Subscribe to store updates for activity animations
    const unsubscribe = graphStore.subscribe((newData) => {
      setData({ ...newData });
    });
    
    // Start simulation
    graphStore.simulateRealtimeEvents();
    
    return () => {
      unsubscribe();
      graphStore.stop();
    };
  }, []);

  return (
    <div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center overflow-visible">
      {/* Centered Coordinate Space (800x800) */}
      <div className="relative w-[800px] h-[800px] flex-shrink-0 origin-center scale-[0.5] sm:scale-75 md:scale-90 lg:scale-100">
        {/* Dynamic Background Elements */}
        <div className="absolute inset-0 pointer-events-none z-0">
          <svg className="w-full h-full opacity-10" aria-hidden="true">
            <title>Background grid pattern</title>
            <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="0.5" />
            </pattern>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>

          {particles.map((p) => (
            <motion.div
              key={p.id}
              className="absolute rounded-full bg-white opacity-20"
              style={{
                width: p.size,
                height: p.size,
                left: p.x,
                top: p.y,
              }}
              animate={{
                y: [0, -100, 0],
                opacity: [0.1, 0.4, 0.1],
              }}
              transition={{
                duration: p.duration,
                repeat: Infinity,
                ease: "linear",
              }}
            />
          ))}
        </div>

        {/* Center Glow */}
        <div className="absolute top-1/2 left-1/2 w-[500px] h-[500px] -translate-x-1/2 -translate-y-1/2 bg-white/5 blur-[120px] rounded-full pointer-events-none z-0" />

        {/* Render Edges */}
        <div className="absolute inset-0 z-0">
          {data.edges.map((edge) => (
            <Edge key={edge.id} edge={edge} nodes={data.nodes} />
          ))}
        </div>

        {/* Render Nodes */}
        <div className="absolute inset-0 z-10 font-sans">
          {data.nodes.map((node) => (
            <Node key={node.id} node={node} />
          ))}
        </div>
      </div>
    </div>
  );
}
