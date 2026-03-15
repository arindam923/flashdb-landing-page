"use client";

import { motion } from "framer-motion";
import Link from "next/link";

const footerLinks = [
	{
		title: "Products",
		links: [
			{ name: "Cloud", href: "#" },
			{ name: "Agents", href: "#" },
			{ name: "Workflows", href: "#" },
			{ name: "Observability", href: "#" },
		],
	},
	{
		title: "Developers",
		links: [
			{ name: "Docs", href: "/docs" },
			{ name: "Templates", href: "#" },
			{ name: "Principles of Building AI Agents", href: "#" },
			{ name: "Patterns for Building AI Agents", href: "#" },
			{ name: "llms.txt", href: "#" },
			{ name: "Mastra Cloud Status", href: "#" },
			{ name: "Research", href: "#" },
		],
	},
	{
		title: "Company",
		links: [
			{ name: "About", href: "#" },
			{ name: "Careers", href: "#" },
			{ name: "Pricing", href: "/#pricing" },
			{ name: "Blog", href: "/blog" },
			{ name: "Contact Us", href: "#" },
			{ name: "Newsletter", href: "#" },
			{ name: "Security", href: "#" },
			{ name: "GitHub", href: "https://github.com/arindam923/fastdb" },
		],
	},
	{
		title: "Legal",
		links: [{ name: "Privacy Policy", href: "#" }],
	},
];

export function Footer() {
	return (
		<footer className="bg-black text-white pt-32 pb-16 px-6 border-t border-white/5">
			<div className="max-w-[1400px] mx-auto">
				{/* Upper CTA Section */}
				<div className="flex flex-col items-center text-center mb-40">
					<motion.h2
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.6 }}
						viewport={{ once: true }}
						className="text-5xl md:text-7xl font-bold tracking-tight mb-12 max-w-4xl"
					>
						GOlang Powered,
						<br />
						TypeScript ships.
					</motion.h2>

					<div className="flex flex-col sm:flex-row items-center gap-4">
						<motion.div
							initial={{ opacity: 0, x: -10 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.2 }}
							viewport={{ once: true }}
							className="flex items-center gap-3 bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-full px-6 py-4 transition-colors group cursor-pointer"
						>
							<code className="text-zinc-400 font-mono text-sm leading-none flex items-center gap-2">
								<span className="text-zinc-500">npm install</span>{" "}
								@arindam923/fastdb-client
							</code>
							<svg
								viewBox="0 0 24 24"
								fill="none"
								stroke="currentColor"
								strokeWidth="2"
								className="w-4 h-4 text-zinc-500 group-hover:text-white transition-colors rotate-45"
							>
								<title>Arrow icon</title>
								<path d="M5 12h14M12 5l7 7-7 7" />
							</svg>
						</motion.div>

						<motion.button
							initial={{ opacity: 0, x: 10 }}
							whileInView={{ opacity: 1, x: 0 }}
							transition={{ duration: 0.6, delay: 0.3 }}
							viewport={{ once: true }}
							className="bg-[#111] hover:bg-[#1a1a1a] border border-white/10 rounded-full px-8 py-4 text-sm font-medium transition-colors"
						>
							Contact Sales
						</motion.button>
					</div>
				</div>

				{/* Links Grid */}
				<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-12 lg:gap-8 border-t border-white/[0.03] pt-24">
					<div className="lg:col-span-1">
						<Link href="/" className="flex items-center gap-2 mb-8 group">
							<div className="w-8 h-8 rounded-lg bg-white/5 border border-white/10 flex items-center justify-center group-hover:bg-white/10 transition-colors">
								<svg
									width="18"
									height="18"
									viewBox="0 0 24 24"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<title>FastDB Logo</title>
									<path
										d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
										stroke="white"
										strokeWidth="3"
										strokeLinecap="round"
									/>
									<circle cx="12" cy="12" r="3" fill="white" />
								</svg>
							</div>
							<span className="font-bold text-xl tracking-tight">FastDB</span>
						</Link>
					</div>

					{footerLinks.map((section) => (
						<div key={section.title}>
							<h4 className="text-white font-semibold mb-6 text-sm uppercase tracking-wider">
								{section.title}
							</h4>
							<ul className="space-y-4">
								{section.links.map((link) => (
									<li key={link.name}>
										<Link
											href={link.href}
											className="text-zinc-500 hover:text-white transition-colors text-sm"
										>
											{link.name}
										</Link>
									</li>
								))}
							</ul>
						</div>
					))}
				</div>
			</div>
		</footer>
	);
}
