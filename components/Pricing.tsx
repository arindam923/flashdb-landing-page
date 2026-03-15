"use client";

import { Check, ArrowRight, Zap, Shield } from "lucide-react";
import Link from "next/link";
import { motion, useMotionTemplate, useMotionValue } from "framer-motion";
import type { MouseEvent } from "react";

const plans = [
	{
		name: "Hobby",
		price: "$0",
		description:
			"Free for everyone. Perfect for experiments and personal projects.",
		features: [
			"Unbounded Databases",
			"5GB Realtime Storage",
			"1M Operations / mo",
			"Shared Edge Network",
			"Community Support",
		],
		buttonText: "Start for Free",
		icon: Zap,
		highlight: false,
	},
	{
		name: "Enterprise",
		price: "Custom",
		period: "contact for pricing",
		description:
			"Mission-critical reliability for global teams and large scale apps.",
		features: [
			"Unlimited everything",
			"Dedicated Infrastructure",
			"SSO / SAML Security",
			"Custom Rate Limits",
			"24/7 Dedicated Support",
			"SOC2 Compliance",
		],
		buttonText: "Talk to Sales",
		icon: Shield,
		highlight: true,
	},
];

export function Pricing() {
	const mouseX = useMotionValue(0);
	const mouseY = useMotionValue(0);

	function handleMouseMove({ currentTarget, clientX, clientY }: MouseEvent) {
		const { left, top } = currentTarget.getBoundingClientRect();
		mouseX.set(clientX - left);
		mouseY.set(clientY - top);
	}

	return (
		<section
			id="pricing"
			className="py-32 px-6 md:px-12 max-w-[1400px] mx-auto relative"
		>
			{/* Decorative Grid Background */}
			<div className="absolute inset-x-0 top-0 h-[500px] bg-[linear-gradient(to_right,#8080800a_1px,transparent_1px),linear-gradient(to_bottom,#8080800a_1px,transparent_1px)] bg-[size:44px_44px] [mask-image:radial-gradient(ellipse_60%_50%_at_50%_0%,#000_70%,transparent_100%)] pointer-events-none" />

			<div className="flex flex-col items-center text-center mb-24 relative z-10">
				<motion.div
					initial={{ opacity: 0, scale: 0.9 }}
					whileInView={{ opacity: 1, scale: 1 }}
					className="flex items-center gap-2 px-3 py-1 rounded-full bg-emerald-500/10 border border-emerald-500/20 text-emerald-500 text-[10px] font-bold uppercase tracking-widest mb-6"
				>
					<Zap className="w-3 h-3" />
					<span>Pricing Plans</span>
				</motion.div>

				<h2 className="text-5xl md:text-8xl font-bold text-white tracking-tighter mb-8 leading-[0.9]">
					Scale at the <span className="text-zinc-600">speed</span> <br /> of
					light.
				</h2>

				<p className="text-zinc-500 text-lg md:text-xl max-w-2xl leading-relaxed">
					Transparent pricing that grows with you. From the first line of code
					to global infrastructure.
				</p>
			</div>

			<div
				onMouseMove={handleMouseMove}
				className="group/grid grid grid-cols-1 md:grid-cols-2 gap-8 relative z-10 max-w-4xl mx-auto"
			>
				{/* Global Spotlight Effect */}
				<motion.div
					className="pointer-events-none absolute -inset-px rounded-3xl opacity-0 transition duration-500 group-hover/grid:opacity-100 z-0"
					style={{
						background: useMotionTemplate`
							radial-gradient(
								1000px circle at ${mouseX}px ${mouseY}px,
								rgba(16, 185, 129, 0.05),
								transparent 80%
							)
						`,
					}}
				/>

				{plans.map((plan, index) => (
					<motion.div
						key={plan.name}
						initial={{ opacity: 0, y: 20 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ delay: index * 0.1, duration: 0.5 }}
						className={`group relative flex flex-col p-8 md:p-10 rounded-3xl border transition-all duration-300 ${
							plan.highlight
								? "bg-gradient-to-b from-zinc-900/80 to-black border-white/20 scale-[1.02] z-10 shadow-[0_0_50px_-12px_rgba(16,185,129,0.1)]"
								: "bg-[#050505] border-white/5 hover:border-white/10"
						}`}
					>
						{plan.highlight && (
							<div className="absolute -top-4 left-1/2 -translate-x-1/2 bg-emerald-500 text-black text-[10px] font-black px-4 py-1.5 rounded-full uppercase tracking-tighter shadow-[0_0_20px_rgba(16,185,129,0.5)]">
								Most Popular
							</div>
						)}

						<div className="mb-10">
							<div className="w-12 h-12 rounded-xl bg-white/5 flex items-center justify-center mb-8 border border-white/10 group-hover:bg-white/10 transition-colors">
								<plan.icon
									className={`w-6 h-6 ${plan.highlight ? "text-emerald-500" : "text-white"}`}
								/>
							</div>

							<h3 className="text-xl font-bold text-white mb-2">{plan.name}</h3>

							<div className="flex items-baseline gap-2 mb-4">
								<span className="text-5xl font-bold text-white tracking-tighter">
									{plan.price}
								</span>
								{plan.period && (
									<span className="text-zinc-500 text-xs font-medium uppercase tracking-wider">
										{plan.period}
									</span>
								)}
							</div>

							<p className="text-zinc-500 text-sm leading-relaxed">
								{plan.description}
							</p>
						</div>

						<div className="h-[1px] w-full bg-white/5 mb-10" />

						<ul className="space-y-5 mb-12 flex-grow">
							{plan.features.map((feature) => (
								<li
									key={feature}
									className="flex items-start gap-4 text-sm text-zinc-400 group/item"
								>
									<div
										className={`mt-0.5 rounded-full p-0.5 ${plan.highlight ? "bg-emerald-500/20" : "bg-white/10"}`}
									>
										<Check
											className={`w-3 h-3 ${plan.highlight ? "text-emerald-500" : "text-white"}`}
										/>
									</div>
									<span className="group-hover/item:text-zinc-200 transition-colors">
										{feature}
									</span>
								</li>
							))}
						</ul>

						<Link
							href={
								plan.name === "Enterprise"
									? "mailto:sales@fastdb.io"
									: "/signup"
							}
							className={`w-full group/btn flex items-center justify-center gap-2 py-4 rounded-xl font-bold text-sm transition-all relative overflow-hidden ${
								plan.highlight
									? "bg-emerald-500 text-black shadow-[0_0_20px_rgba(16,185,129,0.3)] hover:shadow-[0_0_30px_rgba(16,185,129,0.5)]"
									: "bg-white/5 text-white border border-white/10 hover:bg-white/10"
							}`}
						>
							<span className="relative z-10">{plan.buttonText}</span>
							<ArrowRight className="w-4 h-4 relative z-10 group-hover/btn:translate-x-1 transition-transform" />
						</Link>
					</motion.div>
				))}
			</div>
			<div className="absolute top-1/2 left-0 -translate-y-1/2 w-[500px] h-[500px] bg-emerald-500/5 blur-[120px] rounded-full pointer-events-none" />
			<div className="absolute bottom-0 right-0 w-[400px] h-[400px] bg-white/5 blur-[100px] rounded-full pointer-events-none" />
		</section>
	);
}
