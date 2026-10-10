"use client";
import React, { useState } from "react";

type PromptDisplayProps = {
    lastPrompt: string;
};

export default function PromptDisplay({ lastPrompt }: PromptDisplayProps) {
    const [open, setOpen] = useState(true);
    if (!lastPrompt) return null;
    return (
        <div className="animate-fade-in-up mb-3 w-full max-w-6xl p-3 bg-gradient-to-r from-yellow-100 via-pink-100 to-blue-100/80 border border-yellow-300 rounded-xl text-sm text-gray-900 dark:text-gray-100 shadow-lg hover:shadow-xl transition-shadow backdrop-blur-md bg-opacity-80 font-mono">
            <button
                type="button"
                onClick={() => setOpen((o) => !o)}
                className="btn-pop w-full flex items-center justify-between gap-2 focus:outline-none"
                aria-expanded={open}
            >
                <b className="text-yellow-700 dark:text-yellow-300">Prompt sent to AI:</b>
                <svg
                    xmlns="http://www.w3.org/2000/svg"
                    viewBox="0 0 24 24"
                    fill="none"
                    stroke="currentColor"
                    strokeWidth={2}
                    className={`w-4 h-4 text-yellow-700 dark:text-yellow-300 transition-transform duration-300 ${open ? "rotate-180" : "rotate-0"}`}
                >
                    <path strokeLinecap="round" strokeLinejoin="round" d="M19 9l-7 7-7-7" />
                </svg>
            </button>
            <div
                className="grid transition-all duration-300 ease-in-out"
                style={{ gridTemplateRows: open ? "1fr" : "0fr" }}
            >
                <div className="overflow-hidden">
                    <pre className="whitespace-pre-wrap break-words text-gray-800 dark:text-gray-100 text-xs font-mono max-h-40 overflow-auto pretty-scrollbar mt-2" style={{ wordBreak: 'break-word' }}>{lastPrompt}</pre>
                </div>
            </div>
        </div>
    );
}
