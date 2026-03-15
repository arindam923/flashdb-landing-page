"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, Calendar, User, Clock } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function BlogPost() {
	const params = useParams();
	
	return (
		<div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
			<Navbar />
			
			<main className="max-w-[800px] mx-auto px-8 py-20 mt-10">
				<Link href="/blog" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-12 group">
					<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
					<span>Back to blog</span>
				</Link>

				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
				>
					<div className="flex items-center gap-4 text-zinc-500 text-sm mb-6">
						<span className="bg-white/10 px-3 py-1 rounded-full text-white text-xs font-medium uppercase tracking-wider">Engineering</span>
						<div className="flex items-center gap-1">
							<Calendar className="w-4 h-4" />
							<span>March 12, 2024</span>
						</div>
						<div className="flex items-center gap-1">
							<Clock className="w-4 h-4" />
							<span>8 min read</span>
						</div>
					</div>

					<h1 className="text-4xl md:text-6xl font-bold tracking-tight mb-8 leading-[1.1]">
						How we achieved 10M ops/sec with FastDB Engine
					</h1>

					<div className="flex items-center gap-3 mb-12 pb-12 border-b border-white/10">
						<div className="w-10 h-10 rounded-full bg-zinc-800 border border-white/10" />
						<div>
							<p className="font-medium">Arindam Majumder</p>
							<p className="text-zinc-500 text-sm">CTO & Co-founder</p>
						</div>
					</div>

					<div className="prose prose-invert max-w-none text-zinc-400 leading-relaxed space-y-6 text-lg">
						<p>
							The performance of a database is often limited by the overhead of traditional storage engines. At FastDB, we decided to rethink how data is structured and processed from the ground up.
						</p>
						<h2 className="text-2xl font-bold text-white mt-12 mb-6">The Bottleneck</h2>
						<p>
							Most databases spend a significant amount of time in context switching and disk I/O. By moving everything to an in-memory, RDMA-native architecture, we've eliminated these traditional bottlenecks.
						</p>
						<div className="aspect-video bg-zinc-900 rounded-2xl border border-white/10 flex items-center justify-center my-12">
							<p className="text-zinc-600 italic">Technical architecture diagram would go here</p>
						</div>
						<p>
							Our engine uses a latch-free B+ tree implementation that scales linearly with the number of CPU cores. This allows us to process millions of transactions per second on standard commodity hardware.
						</p>
					</div>
				</motion.div>
			</main>

			<Footer />
		</div>
	);
}
