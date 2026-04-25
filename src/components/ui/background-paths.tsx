"use client";

import { motion } from "framer-motion";
import { Button } from "@/components/ui/button";

function FloatingPaths({ position }: { position: number }) {
    const paths = Array.from({ length: 36 }, (_, i) => ({
        id: i,
        d: `M-${380 - i * 5 * position} -${189 + i * 6}C-${
            380 - i * 5 * position
        } -${189 + i * 6} -${312 - i * 5 * position} ${216 - i * 6} ${
            152 - i * 5 * position
        } ${343 - i * 6}C${616 - i * 5 * position} ${470 - i * 6} ${
            684 - i * 5 * position
        } ${875 - i * 6} ${684 - i * 5 * position} ${875 - i * 6}`,
        color: `rgba(15,23,42,${0.1 + i * 0.03})`,
        width: 0.5 + i * 0.03,
    }));

    return (
        <div className="absolute inset-0 pointer-events-none">
            <svg
                className="w-full h-full text-slate-950 dark:text-[#39FF14]"
                viewBox="0 0 696 316"
                fill="none"
            >
                <title>Background Paths</title>
                {paths.map((path) => (
                    <motion.path
                        key={path.id}
                        d={path.d}
                        stroke="currentColor"
                        strokeWidth={path.width}
                        strokeOpacity={0.1 + path.id * 0.03}
                        initial={{ pathLength: 0.3, opacity: 0.6 }}
                        animate={{
                            pathLength: 1,
                            opacity: [0.3, 0.6, 0.3],
                            pathOffset: [0, 1, 0],
                        }}
                        transition={{
                            duration: 20 + Math.random() * 10,
                            repeat: Number.POSITIVE_INFINITY,
                            ease: "linear",
                        }}
                    />
                ))}
            </svg>
        </div>
    );
}

export function BackgroundPaths({
    title = "Background Paths",
}: {
    title?: string;
}) {
    const words = title.split(" ");

    return (
        <div className="relative min-h-screen w-full flex items-center justify-center overflow-hidden bg-white dark:bg-black">
            <div className="absolute inset-0">
                <FloatingPaths position={1} />
                <FloatingPaths position={-1} />
            </div>

            <div className="relative z-10 container mx-auto px-4 md:px-6 text-center">
                <motion.div
                    initial={{ opacity: 0 }}
                    animate={{ opacity: 1 }}
                    transition={{ duration: 2 }}
                    className="max-w-4xl mx-auto"
                >
                    <h1
                        className="font-syne text-5xl md:text-8xl font-extrabold mb-8 tracking-tighter"
                    >
                        {words.map((word, wordIndex) => (
                            <span
                                key={wordIndex}
                                className="inline-block mr-4 last:mr-0"
                            >
                                {word.split("").map((letter, letterIndex) => (
                                    <motion.span
                                        key={`${wordIndex}-${letterIndex}`}
                                        initial={{ y: 100, opacity: 0 }}
                                        animate={{ y: 0, opacity: 1 }}
                                        transition={{
                                            delay:
                                                wordIndex * 0.1 +
                                                letterIndex * 0.03,
                                            type: "spring",
                                            stiffness: 150,
                                            damping: 25,
                                        }}
                                        className="inline-block text-transparent bg-clip-text 
                                        bg-gradient-to-r from-neutral-900 to-neutral-700/80 
                                        dark:from-white dark:to-white/80"
                                    >
                                        {letter}
                                    </motion.span>
                                ))}
                            </span>
                        ))}
                    </h1>

                    <div className="flex flex-col gap-4">
                        {/* ROW 1: MAIN IMMERSIVE PROJECTS */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/olive-tree/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Olive Tree
                                </Button>
                            </a>
                            <a href="/porfolio/legendary/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Legendary LP
                                </Button>
                            </a>
                            <a href="/porfolio/3d-hero/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    3D Cosmos
                                </Button>
                            </a>
                            <a href="/porfolio/ethereal/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Ethereal
                                </Button>
                            </a>
                        </div>

                        {/* ROW 2: UTILITIES & EXTRAS */}
                        <div className="flex flex-wrap justify-center gap-4">
                            <a href="/porfolio/kanban/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Kanban
                                </Button>
                            </a>
                            <a href="/porfolio/reative-orb/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    Orb
                                </Button>
                            </a>
                            <a href="/porfolio/vendas-software/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-white/95 hover:bg-white/100 dark:bg-black/95 dark:hover:bg-black/100 
                                    text-black dark:text-white transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-black/10 dark:border-white/10
                                    hover:shadow-md dark:hover:shadow-neutral-800/50"
                                >
                                    LP
                                </Button>
                            </a>
                            <a href="https://projetos-ai-design-jb.github.io/porfolio/gallery/">
                                <Button
                                    variant="ghost"
                                    className="font-syne rounded-[1.15rem] px-8 py-4 md:py-6 text-base md:text-lg font-semibold backdrop-blur-md 
                                    bg-cyan-500/10 hover:bg-cyan-500/20 dark:bg-cyan-500/10 dark:hover:bg-cyan-500/20 
                                    text-cyan-600 dark:text-cyan-400 transition-all duration-300 
                                    group-hover:-translate-y-0.5 border border-cyan-500/20
                                    hover:shadow-lg hover:shadow-cyan-500/20 shadow-md"
                                >
                                    AI ART
                                </Button>
                            </a>
                        </div>
                    </div>
                </motion.div>
            </div>
        </div>
    );
}
