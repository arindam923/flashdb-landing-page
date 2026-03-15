"use client";

import React, { useEffect, useState } from "react";
import { motion, AnimatePresence } from "framer-motion";

interface VisualPanelProps {
  activeTab: string;
}

const CoreVisual = () => {
  const items = [
    { key: "session:abc", value: '{ user: "42" }' },
    { key: "user:42", value: '{ name: "Arindam" }' },
  ];

  return (
    <div className="flex flex-col gap-4 h-full justify-center text-sm font-mono">
      <div className="text-[#8A8A8A] border-b border-white/10 pb-2 mb-2">Key-Value Store</div>
      {items.map((item, i) => (
        <motion.div
          key={item.key}
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ delay: i * 0.2, duration: 0.5 }}
          className="flex items-center gap-4 bg-[#111] p-3 rounded-lg border border-white/10"
        >
          <span className="text-[#8BE9FD] flex-1">{item.key}</span>
          <span className="text-[#8A8A8A]">→</span>
          <span className="text-[#50FA7B] flex-1 text-right">{item.value}</span>
        </motion.div>
      ))}
    </div>
  );
};

const RealtimeVisual = () => {
  const [events, setEvents] = useState([
    { id: "#1043", action: "created", time: "just now" },
  ]);

  useEffect(() => {
    const stream = [
      { id: "#1044", action: "created", time: "just now" },
      { id: "#1045", action: "shipped", time: "just now" },
    ];
    let step = 0;
    const interval = setInterval(() => {
      if (step < stream.length) {
        const newItem = stream[step];
        setEvents((prev) => [newItem, ...prev].slice(0, 3));
        step++;
      }
    }, 1200);
    return () => clearInterval(interval);
  }, []);

  return (
    <div className="flex flex-col gap-3 h-full justify-center text-sm font-mono">
      <div className="text-[#8A8A8A] flex justify-between border-b border-white/10 pb-2 mb-2">
        <span>Orders Stream</span>
        <span className="flex items-center gap-2 text-[#3BFF7C]">
          <span className="h-2 w-2 rounded-full bg-[#3BFF7C] animate-pulse"></span>
          Live
        </span>
      </div>
      <AnimatePresence>
        {events.map((ev) => (
          <motion.div
            key={ev.id}
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.9 }}
            className="flex items-center gap-4 bg-[#111] p-3 rounded-lg border border-white/10"
          >
            <span className="text-[#8BE9FD] w-16">{ev.id}</span>
            <span className="text-[#FF79C6] flex-1">{ev.action}</span>
            <span className="text-[#8A8A8A] text-xs">{ev.time}</span>
          </motion.div>
        ))}
      </AnimatePresence>
    </div>
  );
};

const QueryVisual = () => {
  return (
    <div className="flex flex-col h-full justify-center text-sm font-mono">
      <div className="text-[#8A8A8A] border-b border-white/10 pb-2 mb-4">Filtering: status === "pending"</div>
      <table className="w-full text-left border-collapse">
        <thead>
          <tr className="text-[#8A8A8A] border-b border-white/10">
            <th className="py-2">OrderID</th>
            <th className="py-2">Status</th>
            <th className="py-2">Amount</th>
          </tr>
        </thead>
        <tbody>
          {[
            { id: "101", status: "pending", amount: "$120", match: true },
            { id: "102", status: "shipped", amount: "$45", match: false },
            { id: "103", status: "pending", amount: "$300", match: true },
          ].map((row, i) => (
            <motion.tr
              key={row.id}
              initial={{ opacity: 0, backgroundColor: "transparent" }}
              animate={{
                opacity: row.match ? 1 : 0.3,
                backgroundColor: row.match ? "rgba(59,255,124,0.1)" : "transparent",
              }}
              transition={{ delay: 0.5 + i * 0.1, duration: 0.5 }}
              className="border-b border-white/5"
            >
              <td className="py-3 text-[#8BE9FD]">{row.id}</td>
              <td className={`py-3 ${row.match ? "text-[#3BFF7C]" : "text-[#8A8A8A]"}`}>{row.status}</td>
              <td className="py-3 text-[#50FA7B]">{row.amount}</td>
            </motion.tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

const MemoryVisual = () => {
  const data = [
    { name: "FastDB", time: 0.4, color: "#3BFF7C", width: "10%" },
    { name: "Redis", time: 1.2, color: "#8BE9FD", width: "25%" },
    { name: "Postgres", time: 4.1, color: "#FF79C6", width: "80%" },
  ];

  return (
    <div className="flex flex-col h-full justify-center text-sm font-mono gap-6">
      <div className="text-[#8A8A8A] border-b border-white/10 pb-2">Read Latency Benchmark</div>
      {data.map((item, i) => (
        <div key={item.name} className="flex flex-col gap-2">
          <div className="flex justify-between">
            <span className="text-white">{item.name}</span>
            <span style={{ color: item.color }}>{item.time}ms</span>
          </div>
          <div className="h-2 w-full bg-[#111] rounded-full overflow-hidden">
            <motion.div
              initial={{ width: 0 }}
              animate={{ width: item.width }}
              transition={{ delay: i * 0.2, duration: 0.8, ease: "easeOut" }}
              className="h-full rounded-full"
              style={{ backgroundColor: item.color }}
            />
          </div>
        </div>
      ))}
    </div>
  );
};

const TransactionsVisual = () => {
  return (
    <div className="flex flex-col h-full justify-center text-sm font-mono items-center gap-6">
      <div className="text-[#8A8A8A] w-full text-left border-b border-white/10 pb-2">Atomic Commit</div>
      
      <motion.div
        initial={{ borderColor: "rgba(255,255,255,0.1)" }}
        animate={{ borderColor: ["rgba(255,255,255,0.1)", "rgba(59,255,124,0.5)", "rgba(59,255,124,1)"] }}
        transition={{ duration: 1.5, repeat: Infinity, repeatType: "reverse" }}
        className="border-2 rounded-xl p-4 md:p-6 flex flex-col items-center gap-4 w-full"
      >
        <div className="flex flex-col sm:flex-row justify-around items-center gap-4 w-full">
          <motion.div 
             initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.2 }}
             className="bg-[#111] border border-white/10 p-3 rounded-lg text-[#8BE9FD] text-center w-full sm:w-auto"
          >
            wallet:1 (-100)
          </motion.div>
          <motion.div 
             initial={{ y: -10, opacity: 0 }} animate={{ y: 0, opacity: 1 }} transition={{ delay: 0.4 }}
             className="bg-[#111] border border-white/10 p-3 rounded-lg text-[#50FA7B] text-center w-full sm:w-auto"
          >
            wallet:2 (+100)
          </motion.div>
        </div>
        <div className="h-8 w-px bg-white/20 hidden sm:block"></div>
        <motion.div 
          initial={{ scale: 0.9, opacity: 0 }} animate={{ scale: 1, opacity: 1 }} transition={{ delay: 0.8 }}
          className="bg-[#3BFF7C]/20 border border-[#3BFF7C] text-[#3BFF7C] px-8 py-2 rounded-full font-bold text-center"
        >
          COMMITTED
        </motion.div>
      </motion.div>
    </div>
  );
};

const SyncVisual = () => {
  return (
    <div className="flex flex-col h-full justify-center text-sm font-mono items-center gap-8">
      <div className="text-[#8A8A8A] w-full text-left border-b border-white/10 pb-2">Cluster Sync</div>
      
      <div className="relative w-48 h-48 flex items-center justify-center">
        {/* Central Node */}
        <motion.div 
          className="absolute z-10 w-12 h-12 bg-[#111] border-2 border-[#8BE9FD] rounded-full flex items-center justify-center text-xs text-[#8BE9FD]"
          animate={{ boxShadow: ["0 0 0 0 rgba(139,233,253,0.4)", "0 0 0 15px rgba(139,233,253,0)"] }}
          transition={{ duration: 2, repeat: Infinity }}
        >
          N1
        </motion.div>

        {/* Outer Nodes */}
        {[0, 120, 240].map((angle, i) => {
          const x = Math.cos((angle * Math.PI) / 180) * 80;
          const y = Math.sin((angle * Math.PI) / 180) * 80;

          return (
            <React.Fragment key={angle}>
              <motion.div
                initial={{ opacity: 0 }}
                animate={{ opacity: [0.2, 1, 0.2] }}
                transition={{ duration: 1.5, delay: i * 0.5, repeat: Infinity }}
                className="absolute top-1/2 left-1/2 h-0.5 bg-[#3BFF7C] origin-left"
                style={{ 
                  width: "80px", 
                  rotate: `${angle}deg`,
                  marginTop: "-1px"
                }}
              />
              <motion.div 
                className="absolute w-10 h-10 bg-[#111] border border-white/20 rounded-full flex items-center justify-center text-xs text-[#8A8A8A]"
                style={{ translateX: x, translateY: y }}
              >
                N{i+2}
              </motion.div>
            </React.Fragment>
          );
        })}
      </div>
    </div>
  );
};

export const VisualPanel: React.FC<VisualPanelProps> = ({ activeTab }) => {
  switch (activeTab) {
    case "core": return <CoreVisual />;
    case "realtime": return <RealtimeVisual />;
    case "query": return <QueryVisual />;
    case "memory": return <MemoryVisual />;
    case "transactions": return <TransactionsVisual />;
    case "sync": return <SyncVisual />;
    default: return <CoreVisual />;
  }
};
