"use client";

import { motion } from "framer-motion";
import { Activity, Database, Network, Zap } from "lucide-react";

export function MetricCards() {
  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 h-full">
      <MetricCard
        icon={<Activity className="w-5 h-5 text-emerald-500" />}
        label="Uptime"
        value="99.999"
        unit="%"
        delay={0}
      />
      <MetricCard
        icon={<Zap className="w-5 h-5 text-blue-500" />}
        label="Queries"
        value="2.4"
        unit="M/s"
        delay={0.1}
      />
      <MetricCard
        icon={<Database className="w-5 h-5 text-purple-500" />}
        label="Storage"
        value="84"
        unit="TB"
        delay={0.2}
      />
      {/* Last card gets the special edge radius on large screens */}
      <MetricCard
        icon={<Network className="w-5 h-5 text-zinc-400" />}
        label="Nodes"
        value="2.4"
        unit="k"
        delay={0.3}
        className="lg:rounded-br-[80px]"
      />
    </div>
  );
}

function MetricCard({
  icon,
  label,
  value,
  unit,
  delay,
  className = "",
}: {
  icon: React.ReactNode;
  label: string;
  value: string;
  unit: string;
  delay: number;
  className?: string;
}) {
  return (
    <motion.div
      initial={{ opacity: 0, y: 10 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay, duration: 0.5 }}
      whileHover={{ backgroundColor: "rgba(255, 255, 255, 0.05)" }}
      className={`relative p-8 rounded-2xl bg-white/[0.02] border border-white/5 flex flex-col justify-between h-full transition-colors duration-300 ${className}`}
    >
      <div className="flex flex-col gap-6">
        <div className="w-10 h-10 rounded-xl bg-black border border-white/10 flex items-center justify-center shadow-inner">
          {icon}
        </div>
        
        <div className="flex flex-col gap-1">
          <span className="text-[10px] font-bold text-zinc-500 uppercase tracking-[0.2em]">{label}</span>
          <div className="flex items-baseline gap-1">
            <span className="text-3xl font-bold text-white tracking-tighter">{value}</span>
            <span className="text-sm font-bold text-zinc-600 uppercase">{unit}</span>
          </div>
        </div>
      </div>

      <div className="absolute bottom-0 left-0 h-[2px] bg-white/5 w-full overflow-hidden">
        <motion.div 
          className="h-full bg-white/10"
          initial={{ width: "0%" }}
          animate={{ width: "100%" }}
          transition={{ duration: 1, delay: delay + 0.5 }}
        />
      </div>
    </motion.div>
  );
}
