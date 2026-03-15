"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { Search, Book, Cpu, Zap, Shield, Globe, ChevronRight } from "lucide-react";
import Link from "next/link";

const categories = [
	{
		title: "Getting Started",
		description: "Launch your first FastDB instance and connect your application in minutes.",
		icon: Zap,
		links: ["Quickstart Guide", "Core Concepts", "Architecture Overview"],
	},
	{
		title: "SDKs & Clients",
		description: "Official client libraries for Node.js, Go, Python, and Rust.",
		icon: Cpu,
		links: ["Node.js SDK", "Go Client", "Rust Crate", "Python Library"],
	},
	{
		title: "Features",
		description: "Deep dives into realtime sync, pub/sub, and our query engine.",
		icon: Book,
		links: ["Realtime Sync", "Pub/Sub Messaging", "Powerful Querying", "Atomic Transactions"],
	},
	{
		title: "Security",
		description: "Best practices for securing your data and managing access.",
		icon: Shield,
		links: ["Authentication", "Authorization Policies", "Encryption at Rest"],
	},
	{
		title: "Global Distribution",
		description: "How to scale your database across regions with low latency.",
		icon: Globe,
		links: ["Multi-region Setup", "Edge Replication", "Latency Optimization"],
	},
];

export default function DocsPage() {
	return (
		<div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
			<Navbar />
			
			<main className="max-w-[1400px] mx-auto px-8 md:px-[48px] py-16">
				{/* Header Section */}
				<div className="relative py-20 mb-16 rounded-3xl overflow-hidden border border-white/10 bg-gradient-to-b from-zinc-900/50 to-transparent px-8">
					<div className="max-w-3xl mx-auto text-center relative z-10">
						<motion.h1 
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							className="text-4xl md:text-6xl font-bold tracking-tight mb-8"
						>
							Documentation
						</motion.h1>
						
						<div className="relative max-w-xl mx-auto group">
							<Search className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-zinc-500 group-focus-within:text-white transition-colors" />
							<input 
								type="text" 
								placeholder="Search documentation..." 
								className="w-full bg-black border border-white/10 rounded-2xl py-4 pl-12 pr-4 text-white focus:outline-none focus:border-white/30 transition-all placeholder:text-zinc-600"
							/>
							<div className="absolute right-3 top-1/2 -translate-y-1/2 px-2 py-1 bg-white/5 border border-white/10 rounded text-[10px] text-zinc-500 font-mono pointer-events-none">
								CMD K
							</div>
						</div>
					</div>

					{/* Background Decorations */}
					<div className="absolute top-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full -mr-20 -mt-20 pointer-events-none" />
					<div className="absolute bottom-0 left-0 w-[300px] h-[300px] bg-white/5 blur-[80px] rounded-full -ml-20 -mb-20 pointer-events-none" />
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
					{categories.map((cat, index) => (
						<motion.div
							key={cat.title}
							initial={{ opacity: 0, y: 20 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.1 * index }}
							className="p-8 rounded-2xl border border-white/10 bg-zinc-900/40 hover:bg-zinc-900/60 transition-colors group"
						>
							<div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-6 border border-white/10 group-hover:border-white/20 transition-colors">
								<cat.icon className="w-6 h-6 text-white" />
							</div>
							
							<h2 className="text-xl font-bold mb-3">{cat.title}</h2>
							<p className="text-zinc-400 text-sm mb-6 leading-relaxed">
								{cat.description}
							</p>
							
							<div className="space-y-3">
								{cat.links.map((link) => (
									<Link 
										key={link} 
										href="#" 
										className="flex items-center justify-between text-sm text-zinc-500 hover:text-white transition-colors group/link underline decoration-transparent hover:decoration-white/30"
									>
										<span>{link}</span>
										<ChevronRight className="w-4 h-4 opacity-0 group-hover/link:opacity-100 -translate-x-2 group-hover/link:translate-x-0 transition-all" />
									</Link>
								))}
							</div>
						</motion.div>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
