"use client";
import React, { useRef, useState } from "react";

type Message = { role: 'user' | 'assistant'; content: string };
export default function PandaCoachPage() {
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState("");
  const fileInputRef = useRef<HTMLInputElement>(null);

  const handleSend = () => {
    if (input.trim() === "") return;
    setMessages((msgs) => [...msgs, { role: "user", content: input }]);
    setInput("");
    setTimeout(() => {
      setMessages((msgs) => [...msgs, { role: "assistant", content: "(Réponse IA à venir...)" }]);
    }, 800);
  };

  const handleFile = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setMessages((msgs) => [
        ...msgs,
        { role: "user", content: `📎 Document uploaded: ${files[0].name}` },
      ]);
    }
  };

  return (
    <div className="min-h-screen bg-[#F7FAFC] flex flex-col items-center">
      {/* Title centered at the top */}
      <div className="w-full flex justify-center items-center h-24">
        <h1 className="text-4xl md:text-5xl font-bold text-gray-900 text-center">Panda Ai Coach</h1>
      </div>
      {/* Chat messages area */}
      <div className="flex-1 w-full flex flex-col items-center justify-end pb-36">
        <div className="w-full max-w-2xl flex-1 flex flex-col justify-end px-2 md:px-0">
          <div className="flex-1 overflow-y-auto py-6 space-y-4" style={{ minHeight: 400 }}>
            {messages.length === 0 && (
              <div className="flex items-center justify-center h-[320px] w-full">
                <span className="text-center text-gray-400 text-base">No messages yet.</span>
              </div>
            )}
            {messages.map((msg, idx) => (
              <div
                key={idx}
                className={`flex ${msg.role === "user" ? "justify-end" : "justify-start"}`}
              >
                <div
                  className={`rounded-2xl px-5 py-3 max-w-[80%] text-base shadow-sm ${
                    msg.role === "user"
                      ? "bg-[#DDBDFD] text-gray-900 rounded-br-md"
                      : "bg-white text-gray-800 rounded-bl-md border border-gray-100"
                  }`}
                >
                  {msg.content}
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
      {/* Chat bar fixed at the bottom, centered */}
      <div className="fixed bottom-0 left-0 right-0 flex justify-center bg-transparent z-40">
        <div className="w-full max-w-2xl flex items-center gap-2 bg-white rounded-2xl shadow px-4 py-3 mb-6 border border-gray-100">
          {/* Paperclip */}
          <button
            className="p-2 rounded-full hover:bg-gray-100 transition"
            onClick={() => fileInputRef.current?.click()}
            aria-label="Attach file"
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="#C7A2F7" strokeWidth="2" viewBox="0 0 24 24"><path d="M16.5 13.5V7a4.5 4.5 0 0 0-9 0v8a6 6 0 0 0 12 0V9" strokeLinecap="round" strokeLinejoin="round"/></svg>
            <input
              type="file"
              ref={fileInputRef}
              className="hidden"
              onChange={handleFile}
            />
          </button>
          {/* Input */}
          <input
            className="flex-1 border-none outline-none bg-transparent text-lg px-2"
            type="text"
            placeholder="Type your message..."
            value={input}
            onChange={e => setInput(e.target.value)}
            onKeyDown={e => { if (e.key === "Enter") handleSend(); }}
          />
          {/* Send arrow */}
          <button
            className="p-2 rounded-full bg-[#C7A2F7] hover:bg-[#B794F6] transition"
            onClick={handleSend}
            aria-label="Send message"
            type="button"
          >
            <svg width="24" height="24" fill="none" stroke="#fff" strokeWidth="2" viewBox="0 0 24 24"><path d="M5 12h14M12 5l7 7-7 7" strokeLinecap="round" strokeLinejoin="round"/></svg>
          </button>
        </div>
      </div>
    </div>
  );
} 