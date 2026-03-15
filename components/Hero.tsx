"use client";

import { ArrowRight, Copy } from "lucide-react";
import { AnimatedGraph } from "./AnimatedGraph";

export function Hero() {
	return (
		<div className="relative w-full max-w-[1400px] mx-auto min-h-[90vh] grid grid-cols-1 lg:grid-cols-[1fr_1.3fr] gap-10 items-center px-8 md:px-[48px] pt-16 lg:pt-0 overflow-hidden text-white mb-20">
			<div className="flex flex-col gap-8 max-w-[520px] relative z-10 mx-auto w-full">
				<h1 className="text-5xl lg:text-[64px] font-bold leading-[1.1] tracking-[-0.03em] max-w-lg">
					The ultimate realtime database for modern apps
				</h1>

				<p className="text-lg text-zinc-400 opacity-80 leading-[1.6]">
					FastDB is an insanely fast, in-memory, distributed data platform with
					built-in realtime sync, pub/sub, and powerful querying.
				</p>

				<div className="flex flex-col sm:flex-row items-center sm:justify-start gap-4">
					<button
						type="button"
						onClick={() => {}}
						className="flex items-center gap-2 bg-white/5 hover:bg-white/10 border border-white/10 rounded-xl px-4 py-3.5 transition-colors group cursor-copy"
					>
						<span className="font-mono text-sm text-zinc-300">
							npm i{" "}
							<span className="text-white text-xs font-medium">
								@arindam923/flashdb-client
							</span>
						</span>
						<Copy className="w-4 h-4 text-zinc-500 group-hover:text-zinc-300 transition-colors" />
					</button>

					<a
						href="/"
						className="text-sm font-medium text-zinc-400 hover:text-white transition-colors flex items-center gap-1"
					>
						<span>Quickstart</span>{" "}
						<ArrowRight className="w-4 h-4 -rotate-45" />
					</a>
				</div>
			</div>

			{/* Right Visual Element */}
			<div className="relative w-full h-[600px] lg:h-[800px] flex items-center justify-center opacity-80 lg:opacity-100 z-0 overflow-visible mt-10 lg:mt-0 right-[-0px]">
				<AnimatedGraph />
			</div>

			{/* Social Proof Logos Row at bottom */}
			<div className="absolute bottom-10 lg:bottom-16 left-8 md:left-[48px] w-full flex flex-wrap items-center gap-8 md:gap-16 opacity-70 grayscale">
				<Logo name="SoftBank" />
				<Logo name="Iterable" />
				<Logo name="Elastic" />
				<Logo name="Replit" />
				<Logo name="Netlify" />
			</div>
		</div>
	);
}

function Logo({ name }: { name: string }) {
	return (
		<div className="flex items-center gap-2 opacity-80 hover:opacity-100 transition-opacity cursor-default">
			{name === "SoftBank" && <div className="w-5 h-5 bg-white rounded-sm" />}
			{name === "Iterable" && (
				<div className="w-5 h-5 rotate-45 border-4 border-white" />
			)}
			{name === "Elastic" && (
				<div className="w-6 h-6 border-y-4 border-white rounded-full bg-white/20" />
			)}
			{name === "Replit" && (
				<div className="flex gap-0.5 w-5 h-5">
					<div className="w-1/2 bg-white rounded-l-[4px]" />
					<div className="w-1/2 bg-white/50 rounded-r-[4px]" />
				</div>
			)}
			{name === "Netlify" && (
				<div className="w-5 h-5 border-2 border-white rounded-[4px] relative bg-transparent overflow-hidden" />
			)}

			<span className="font-bold tracking-tight text-white/90 text-lg sm:text-xl">
				{name}
			</span>
		</div>
	);
}
