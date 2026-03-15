"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowLeft, BookOpen, ChevronRight, Copy } from "lucide-react";
import Link from "next/link";
import { useParams } from "next/navigation";

export default function DocDetail() {
	const params = useParams();
	
	return (
		<div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
			<Navbar />
			
			<div className="max-w-[1400px] mx-auto px-8 grid grid-cols-1 lg:grid-cols-[280px_1fr] gap-12 py-16">
				{/* Sidebar */}
				<aside className="hidden lg:block space-y-8">
					<Link href="/docs" className="flex items-center gap-2 text-zinc-500 hover:text-white transition-colors mb-8 group">
						<ArrowLeft className="w-4 h-4 group-hover:-translate-x-1 transition-transform" />
						<span>Documentation</span>
					</Link>

					<div>
						<h5 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">Getting Started</h5>
						<ul className="space-y-3">
							<li><Link href="#" className="text-white font-medium">Quickstart</Link></li>
							<li><Link href="#" className="text-zinc-500 hover:text-white transition-colors">Core Concepts</Link></li>
							<li><Link href="#" className="text-zinc-500 hover:text-white transition-colors">Architecture</Link></li>
						</ul>
					</div>

					<div>
						<h5 className="font-bold text-sm uppercase tracking-wider text-zinc-500 mb-4">SDKs</h5>
						<ul className="space-y-3 text-zinc-500">
							<li><Link href="#" className="hover:text-white transition-colors">Node.js</Link></li>
							<li><Link href="#" className="hover:text-white transition-colors">Go</Link></li>
							<li><Link href="#" className="hover:text-white transition-colors">Python</Link></li>
							<li><Link href="#" className="hover:text-white transition-colors">Rust</Link></li>
						</ul>
					</div>
				</aside>

				{/* Content */}
				<main>
					<div className="flex items-center gap-2 text-zinc-500 text-sm mb-8">
						<span>Docs</span>
						<ChevronRight className="w-3 h-3" />
						<span>Getting Started</span>
						<ChevronRight className="w-3 h-3" />
						<span className="text-white">Quickstart</span>
					</div>

					<motion.div
						initial={{ opacity: 0, y: 10 }}
						animate={{ opacity: 1, y: 0 }}
					>
						<h1 className="text-4xl md:text-5xl font-bold mb-6">Quickstart Guide</h1>
						<p className="text-zinc-400 text-lg mb-10 leading-relaxed">
							Learn how to integrate FastDB into your application in less than 5 minutes.
						</p>

						<section className="space-y-8">
							<div>
								<h2 className="text-2xl font-bold mb-4">1. Install the SDK</h2>
								<div className="relative group">
									<pre className="bg-zinc-900 border border-white/10 rounded-xl p-6 overflow-x-auto">
										<code className="text-zinc-300 font-mono text-sm">
											npm install @arindam923/flashdb-client
										</code>
									</pre>
									<button className="absolute right-4 top-4 p-2 bg-white/5 border border-white/10 rounded-lg hover:bg-white/10 transition-colors opacity-0 group-hover:opacity-100">
										<Copy className="w-4 h-4" />
									</button>
								</div>
							</div>

							<div>
								<h2 className="text-2xl font-bold mb-4">2. Initialize Client</h2>
								<pre className="bg-zinc-900 border border-white/10 rounded-xl p-6 overflow-x-auto">
									<code className="text-zinc-300 font-mono text-sm leading-relaxed">
										{`import { createClient } from "@arindam923/flashdb-client";

const client = createClient({
  url: "https://your-instance.fastdb.io",
  apiKey: "your-api-key"
});`}
									</code>
								</pre>
							</div>

							<div>
								<h2 className="text-2xl font-bold mb-4">3. Save & Subscribe</h2>
								<p className="text-zinc-400 mb-4">FastDB makes it easy to store data and get updates in realtime.</p>
								<pre className="bg-zinc-900 border border-white/10 rounded-xl p-6 overflow-x-auto">
									<code className="text-zinc-300 font-mono text-sm leading-relaxed">
										{`// Subscribe to changes
client.collection("messages").on("insert", (msg) => {
  console.log("New message:", msg);
});

// Save data
await client.collection("messages").insert({
  text: "Hello, World!",
  ts: new Date()
});`}
									</code>
								</pre>
							</div>
						</section>
					</motion.div>
				</main>
			</div>

			<Footer />
		</div>
	);
}
