import React from "react";

type PersonaSelectorProps = {
    persona: 'both' | 'hitesh' | 'piyush' | 'custom';
    setPersona: (p: 'both' | 'hitesh' | 'piyush' | 'custom') => void;
    customImage: string;
    defaultCustomImage: string;
    setCustomName: (name: string) => void;
};

const personaImages: Record<string, string> = {
    hitesh: "https://yt3.ggpht.com/a/AGF-l7-GpYFwHDMQVXkOcO3Ra8bIoZhhiU3oluiJBw=s900-c-k-c0xffffffff-no-rj-mo",
    piyush: "https://www.piyushgarg.dev/_next/image?url=%2Fimages%2Favatar.png&w=256&q=75",
};

export default function PersonaSelector({ persona, setPersona, customImage, defaultCustomImage }: PersonaSelectorProps) {
    return (
        <div className="animate-fade-in-down flex flex-wrap items-center gap-6 sm:gap-10 mb-8 w-full justify-center" style={{ animationDelay: "0.1s" }}>
            <button
                className={`group btn-pop flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-cyan-400 rounded-2xl px-3 py-2 transition-colors ${persona === "both" ? "bg-cyan-50/60 dark:bg-cyan-900/30" : "hover:bg-white/30 dark:hover:bg-white/5"}`}
                onClick={() => setPersona("both")}
            >
                <div className={`flex gap-1 rounded-full p-1 transition-all ${persona === "both" ? "ring-2 ring-cyan-400 animate-glow-pulse" : "ring-2 ring-transparent group-hover:ring-cyan-200"}`}>
                    <img
                        src={personaImages.hitesh}
                        alt="Hitesh Choudhary"
                        className="w-8 h-8 rounded-full border-2 border-blue-400 shadow-md object-cover bg-white persona-roll-hover"
                    />
                    <img
                        src={personaImages.piyush}
                        alt="Piyush Garg"
                        className="w-8 h-8 rounded-full border-2 border-purple-400 shadow-md object-cover bg-white persona-roll-hover"
                    />
                </div>
                <span className={`animated-underline mt-2 font-semibold text-cyan-700 dark:text-cyan-200 ${persona === "both" ? "active" : ""}`}>HiPi</span>
            </button>
            <button
                className={`group btn-pop flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-blue-400 rounded-2xl px-3 py-2 transition-colors ${persona === "hitesh" ? "bg-blue-50/60 dark:bg-blue-900/30" : "hover:bg-white/30 dark:hover:bg-white/5"}`}
                onClick={() => setPersona("hitesh")}
            >
                <img
                    src={personaImages.hitesh}
                    alt="Hitesh Choudhary"
                    className={`w-16 h-16 rounded-full border-2 border-blue-400 shadow-md object-cover bg-white persona-roll-hover transition-all group-hover:-translate-y-1 ${persona === "hitesh" ? "ring-2 ring-offset-2 ring-blue-400 animate-glow-pulse" : "group-hover:ring-2 group-hover:ring-blue-200"}`}
                />
                <span className={`animated-underline mt-2 font-semibold text-blue-700 dark:text-blue-200 ${persona === "hitesh" ? "active" : ""}`}>Hitesh</span>
            </button>
            <button
                className={`group btn-pop flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-purple-400 rounded-2xl px-3 py-2 transition-colors ${persona === "piyush" ? "bg-purple-50/60 dark:bg-purple-900/30" : "hover:bg-white/30 dark:hover:bg-white/5"}`}
                onClick={() => setPersona("piyush")}
            >
                <img
                    src={personaImages.piyush}
                    alt="Piyush Garg"
                    className={`w-16 h-16 rounded-full border-2 border-purple-400 shadow-md object-cover bg-white persona-roll-hover transition-all group-hover:-translate-y-1 ${persona === "piyush" ? "ring-2 ring-offset-2 ring-purple-400 animate-glow-pulse" : "group-hover:ring-2 group-hover:ring-purple-200"}`}
                />
                <span className={`animated-underline mt-2 font-semibold text-purple-700 dark:text-purple-200 ${persona === "piyush" ? "active" : ""}`}>Piyush</span>
            </button>
            <button
                className={`group btn-pop flex flex-col items-center focus:outline-none focus-visible:ring-2 focus-visible:ring-green-400 rounded-2xl px-3 py-2 transition-colors ${persona === "custom" ? "bg-green-50/60 dark:bg-green-900/30" : "hover:bg-white/30 dark:hover:bg-white/5"}`}
                onClick={() => setPersona("custom")}
            >
                <img
                    src={customImage}
                    alt="Custom Persona"
                    className={`w-16 h-16 rounded-full border-2 border-green-400 shadow-md object-cover bg-white persona-roll-hover transition-all group-hover:-translate-y-1 ${persona === "custom" ? "ring-2 ring-offset-2 ring-green-400 animate-glow-pulse" : "group-hover:ring-2 group-hover:ring-green-200"}`}
                    onError={e => { (e.target as HTMLImageElement).src = defaultCustomImage; }}
                />
                <span className={`animated-underline mt-2 font-semibold text-green-700 dark:text-green-200 ${persona === "custom" ? "active" : ""}`}>Custom</span>
            </button>
        </div>
    );
}
