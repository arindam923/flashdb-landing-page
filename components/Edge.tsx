"use client";

import type { GraphEdge, GraphNode } from "@/state/graphStore";
import { motion } from "framer-motion";

interface EdgeProps {
  edge: GraphEdge;
  nodes: GraphNode[];
}

export function Edge({ edge, nodes }: EdgeProps) {
  const fromNode = nodes.find(n => n.id === edge.from);
  const toNode = nodes.find(n => n.id === edge.to);

  if (!fromNode || !toNode) return null;

  // Create an organic-looking curve between the two nodes
  const dx = toNode.x - fromNode.x;
  const dy = toNode.y - fromNode.y;
  
  // Offset control points to make it look organic
  const cx1 = fromNode.x + dx * 0.2;
  const cy1 = fromNode.y + dy * 0.8;
  const cx2 = fromNode.x + dx * 0.8;
  const cy2 = fromNode.y + dy * 0.2;

  const pathD = `M ${fromNode.x} ${fromNode.y} C ${cx1} ${cy1}, ${cx2} ${cy2}, ${toNode.x} ${toNode.y}`;

  return (
    <svg className="absolute inset-0 pointer-events-none w-full h-full overflow-visible z-0" aria-hidden="true">
      <defs>
        <linearGradient id={`grad-${edge.id}`} x1="0%" y1="0%" x2="100%" y2="0%">
          <stop offset="0%" stopColor="#FFFFFF" stopOpacity="0.5" />
          <stop offset="100%" stopColor={toNode.color} stopOpacity="0.8" />
        </linearGradient>
        
        <filter id={`glow-${edge.id}`}>
          <feGaussianBlur stdDeviation="2" result="coloredBlur" />
          <feMerge>
            <feMergeNode in="coloredBlur" />
            <feMergeNode in="SourceGraphic" />
          </feMerge>
        </filter>
      </defs>
      
      {/* Background subtle track */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#grad-${edge.id})`}
        strokeWidth="1"
        style={{ opacity: 0.15 }}
      />
      
      {/* Animated dashed track */}
      <path
        d={pathD}
        fill="none"
        stroke={`url(#grad-${edge.id})`}
        strokeWidth="1.5"
        strokeDasharray="4 12"
        className="opacity-30"
      />

      {/* Flowing Data Particles */}
      <motion.circle
        r="3"
        fill={toNode.color}
        filter={`url(#glow-${edge.id})`}
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ 
          offsetDistance: ["0%", "100%"],
          opacity: [0, 1, 0]
        }}
        transition={{ 
          duration: 2 + Math.random() * 2, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 2
        }}
        style={{ offsetPath: `path('${pathD}')` }}
      />

      <motion.circle
        r="2"
        fill="#FFFFFF"
        initial={{ offsetDistance: "0%", opacity: 0 }}
        animate={{ 
          offsetDistance: ["0%", "100%"],
          opacity: [0, 0.8, 0]
        }}
        transition={{ 
          duration: 3 + Math.random() * 2, 
          repeat: Infinity, 
          ease: "linear",
          delay: Math.random() * 3
        }}
        style={{ offsetPath: `path('${pathD}')` }}
      />
    </svg>
  );
}
