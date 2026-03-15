"use client";

import type React from "react";
import { motion } from "framer-motion";
import { CodePanel } from "./CodePanel";
import { VisualPanel } from "./VisualPanel";
import { panelTransition } from "../animations/transitions";
import { featureContent } from "../data/features";

interface FeaturePanelProps {
  activeTab: string;
}

export const FeaturePanel: React.FC<FeaturePanelProps> = ({ activeTab }) => {
  const content = featureContent[activeTab as keyof typeof featureContent];

  return (
    <motion.div
      key={activeTab}
      variants={panelTransition}
      initial="initial"
      animate="animate"
      exit="exit"
      className="grid grid-cols-1 lg:grid-cols-2 gap-8"
    >
      <div className="bg-[#050505] border border-white/5 rounded-2xl md:rounded-tr-[28px] md:rounded-b-[28px] md:rounded-tl-none p-5 md:p-8 min-h-[300px]">
        <CodePanel code={content.code} />
      </div>
      
      <div className="bg-[#050505] border border-white/5 rounded-[28px] p-5 md:p-8 min-h-[300px] overflow-hidden">
        <VisualPanel activeTab={activeTab} />
      </div>
    </motion.div>
  );
};
