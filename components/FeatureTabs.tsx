"use client";

import { useState } from "react";
import { motion, AnimatePresence } from "framer-motion";
import { features } from "../data/features";
import { FeaturePanel } from "./FeaturePanel";

export const FeatureTabs = () => {
	const [activeTab, setActiveTab] = useState("core");

	return (
		<section className="w-full py-24 bg-black">
			<div className="max-w-[1400px] mx-auto px-6 md:px-12">
				<div className="mb-12">
					<h2 className="text-3xl md:text-5xl font-bold text-white tracking-tight mb-4">
						Everything you need,{" "}
						<span className="text-[#3BFF7C]">built-in</span>.
					</h2>
					<p className="text-[#8A8A8A] text-lg max-w-2xl">
						A complete realtime data platform with powerful features designed
						for modern applications.
					</p>
				</div>

				<div className="flex flex-col">
					{/* Tabs Row */}
					<div className="flex overflow-x-auto gap-2 justify-start no-scrollbar pb-0 relative z-10">
						{features.map((feature, index) => {
							const isActive = activeTab === feature.id;
							const Icon = feature.icon;

							return (
								<button
									type="button"
									key={feature.id}
									onClick={() => setActiveTab(feature.id)}
									className={`relative flex flex-row items-center justify-start gap-3 px-6 py-4 transition-colors duration-200
                    ${
											isActive
												? "text-white"
												: "text-[#8A8A8A] hover:text-white"
										}`}
								>
									{isActive && (
										<motion.div
											layoutId="activeTabBackground"
											className="absolute inset-0 bg-[#050505] border border-white/5 border-b-0 rounded-t-[20px]"
											initial={false}
											transition={{
												type: "spring",
												stiffness: 500,
												damping: 35,
											}}
										>
											{/* SVG Inverted Corners for seamless connection */}
											{index > 0 && (
												<svg className="absolute -left-4 bottom-0 w-4 h-4 fill-[#050505]" viewBox="0 0 16 16">
													<title>Left corner</title>
													<path d="M16 16C7.16344 16 0 8.83656 0 0V16H16Z" />
													<path d="M16 16C7.16344 16 0 8.83656 0 0V16H16Z" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
												</svg>
											)}
											<svg className="absolute -right-4 bottom-0 w-4 h-4 fill-[#050505]" viewBox="0 0 16 16">
												<title>Right corner</title>
												<path d="M0 16C8.83656 16 16 8.83656 16 0V16H0Z" />
												<path d="M0 16C8.83656 16 16 8.83656 16 0V16H0Z" stroke="rgba(255,255,255,0.05)" strokeWidth="2" fill="none" />
											</svg>
										</motion.div>
									)}
									<span className="relative z-10 flex items-center gap-3">
										<Icon size={20} className={isActive ? "text-[#3BFF7C]" : ""} />
										<span className="font-medium">{feature.title}</span>
									</span>
								</button>
							);
						})}
					</div>

					{/* Feature Panels */}
					<div className="relative">
						<AnimatePresence mode="wait">
							<FeaturePanel key={activeTab} activeTab={activeTab} />
						</AnimatePresence>
					</div>
				</div>
			</div>
		</section>
	);
};
