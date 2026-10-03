import React from "react";

type MessageInputProps = {
    message: string;
    setMessage: (msg: string) => void;
    sendMessage: () => void;
    thinking: boolean;
    persona: 'hitesh' | 'piyush' | 'custom' | 'both';
    customReady: boolean;
    creatingPersona: boolean;
};

export default function MessageInput({ message, setMessage, sendMessage, thinking, persona, customReady, creatingPersona }: MessageInputProps) {
    const disabled = thinking || (persona === "custom" && (!customReady || creatingPersona));
    return (
        <div className="animate-fade-in-up flex w-full max-w-4xl gap-4 mt-6" style={{ animationDelay: "0.1s" }}>
            <div className="relative flex-1 group">
                <input
                    className="w-full border-2 border-blue-400 rounded-2xl p-4 text-lg focus:ring-2 focus:ring-blue-400 bg-white/90 dark:bg-zinc-900/80 text-gray-900 dark:text-gray-100 shadow-lg focus:shadow-[0_0_25px_-5px_rgba(59,130,246,0.6)] transition-all duration-300 backdrop-blur-md placeholder-gray-500 dark:placeholder-gray-400"
                    value={message}
                    onChange={(e) => setMessage(e.target.value)}
                    placeholder="Type your message"
                    onKeyDown={(e) => { if (e.key === 'Enter' && !thinking) sendMessage(); }}
                    disabled={disabled}
                    style={{ caretColor: '#6366f1' }}
                />
                <span className="pointer-events-none absolute inset-0 rounded-2xl ring-0 ring-blue-300/0 group-focus-within:ring-4 group-focus-within:ring-blue-300/20 transition-all duration-300" />
            </div>
            <button
                className="btn-pop relative px-6 py-3 bg-gradient-to-r from-blue-500 to-purple-500 text-white rounded-2xl font-bold shadow-xl hover:from-blue-600 hover:to-purple-600 transition-colors text-lg focus:outline-none focus:ring-2 focus:ring-purple-400 disabled:opacity-60 disabled:cursor-not-allowed disabled:hover:scale-100 flex items-center gap-2"
                onClick={sendMessage}
                disabled={disabled}
            >
                {thinking ? (
                    <>
                        <svg className="animate-spin h-5 w-5 text-white" viewBox="0 0 24 24" fill="none">
                            <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                            <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v4a4 4 0 00-4 4H4z" />
                        </svg>
                        Waiting...
                    </>
                ) : (
                    <>
                        Send
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth={2.2} className="w-5 h-5 transition-transform duration-300 group-hover:translate-x-1">
                            <path strokeLinecap="round" strokeLinejoin="round" d="M4.5 12h15m0 0l-6-6m6 6l-6 6" />
                        </svg>
                    </>
                )}
            </button>
        </div>
    );
}
