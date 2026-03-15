"use client";

import { Github } from "lucide-react";
import Link from "next/link";

const links = [
	{ name: "Home", href: "/" },
	{ name: "Pricing", href: "/#pricing" },
	{ name: "Blog", href: "/blog" },
	{ name: "Docs", href: "/docs" },
];

export function Navbar() {
	return (
		<nav className="flex items-center justify-between h-[72px] px-8 md:px-[48px] max-w-[1400px] mx-auto w-full z-10 relative">
			<div className="flex items-center gap-2">
				{/* Abstract logo mark */}
				<svg
					width="24"
					height="24"
					viewBox="0 0 24 24"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12C21 16.9706 16.9706 21 12 21"
						stroke="white"
						strokeWidth="3"
						strokeLinecap="round"
					/>
					<circle cx="12" cy="12" r="3" fill="white" />
				</svg>
				<span className="font-semibold text-white tracking-tight ml-2">
					FastDB
				</span>
			</div>

			<div className="hidden md:flex items-center space-x-6 text-sm font-medium text-white/80">
				{links.map((link) => (
					<Link
						key={link.name}
						href={link.href}
						className="hover:text-white transition-colors flex items-center gap-1"
					>
						{link.name}
					</Link>
				))}
			</div>

			<div className="flex items-center gap-6">
				<a
					href="https://github.com/arindam923/fastdb"
					target="_blank"
					rel="noopener"
					className="hidden md:flex items-center gap-2 text-sm text-white/80 hover:text-white transition-colors"
				>
					<Github className="w-5 h-5" />
					<span>0.0k</span>
				</a>
				<div className="flex items-center gap-3">
					<Link
						href="#"
						className="text-sm font-medium text-white border border-white/10 hover:bg-white/5 px-4 py-2 rounded-lg transition-colors"
					>
						Login
					</Link>
					<Link
						href="#"
						className="text-sm font-medium text-black bg-white hover:bg-white/90 px-4 py-2 rounded-lg transition-colors"
					>
						Sign Up
					</Link>
				</div>
			</div>
		</nav>
	);
}
