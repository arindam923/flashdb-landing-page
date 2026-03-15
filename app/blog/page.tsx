"use client";

import { Navbar } from "@/components/Navbar";
import { Footer } from "@/components/Footer";
import { motion } from "framer-motion";
import { ArrowRight, Calendar } from "lucide-react";
import Link from "next/link";
import Image from "next/image";

const posts = [
	{
		id: 1,
		title: "How we achieved 10M ops/sec with FastDB Engine",
		excerpt:
			"A deep dive into the architecture of our core storage engine and how we leverage RDMA for ultrafast sync.",
		date: "March 12, 2024",
		category: "Engineering",
		image:
			"https://images.unsplash.com/photo-1773532946593-3dc2a7561ec4?q=80&w=1974&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
	},
	{
		id: 2,
		title: "The future of distributed state management",
		excerpt:
			"Why the classic CAP theorem needs a rethink in the age of global edge networks and realtime apps.",
		date: "March 08, 2024",
		category: "Research",
		image:
			"https://images.unsplash.com/photo-1451187580459-43490279c0fa?q=80&w=800&auto=format&fit=crop",
	},
	{
		id: 3,
		title: "Announcing FastDB Cloud: Global by default",
		excerpt:
			"Deploy your databases to 50+ regions worldwide with a single click. Zero latency, total reliability.",
		date: "March 05, 2024",
		category: "Product",
		image:
			"https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800&auto=format&fit=crop",
	},
];

export default function BlogPage() {
	return (
		<div className="min-h-screen bg-black text-white font-sans selection:bg-white selection:text-black">
			<Navbar />

			<main className="max-w-[1400px] mx-auto px-8 md:px-[48px] py-20 mt-10">
				<div className="max-w-2xl mb-20">
					<motion.h1
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						className="text-5xl md:text-6xl font-bold tracking-tight mb-6"
					>
						The FastDB Blog
					</motion.h1>
					<motion.p
						initial={{ opacity: 0, y: 20 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ delay: 0.1 }}
						className="text-zinc-400 text-xl leading-relaxed"
					>
						Insights into high-performance systems, distributed databases, and
						the future of realtime data.
					</motion.p>
				</div>

				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
					{posts.map((post, index) => (
						<motion.article
							key={post.id}
							initial={{ opacity: 0, y: 30 }}
							animate={{ opacity: 1, y: 0 }}
							transition={{ delay: 0.2 + index * 0.1 }}
							className="group cursor-pointer"
						>
							<Link href={`/blog/${post.id}`}>
								<div className="aspect-[16/10] relative rounded-2xl overflow-hidden mb-6 border border-white/10 bg-zinc-900/50">
									<Image
										src={post.image}
										alt={post.title}
										fill
										className="object-cover transition-transform duration-500 group-hover:scale-105 opacity-80 group-hover:opacity-100"
									/>
									<div className="absolute top-4 left-4 flex gap-2">
										<span className="bg-white/10 backdrop-blur-md px-3 py-1 rounded-full text-xs font-medium border border-white/10">
											{post.category}
										</span>
									</div>
								</div>

								<div className="flex items-center gap-2 text-zinc-500 text-sm mb-3">
									<Calendar className="w-4 h-4" />
									<span>{post.date}</span>
								</div>

								<h2 className="text-2xl font-bold mb-3 group-hover:text-white transition-colors leading-tight">
									{post.title}
								</h2>

								<p className="text-zinc-400 mb-6 line-clamp-2 leading-relaxed">
									{post.excerpt}
								</p>

								<div className="flex items-center gap-2 text-white font-medium group/link">
									<span>Read article</span>
									<ArrowRight className="w-4 h-4 group-hover/link:translate-x-1 transition-transform" />
								</div>
							</Link>
						</motion.article>
					))}
				</div>
			</main>

			<Footer />
		</div>
	);
}
