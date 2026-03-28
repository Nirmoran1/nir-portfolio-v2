'use client';

import { useRef, useEffect } from 'react';

interface Message {
  role: 'user' | 'assistant';
  content: string;
}

interface ChatUIProps {
  messages: Message[];
  input: string;
  setInput: (val: string) => void;
  onSend: () => void;
  loading: boolean;
}

export default function ChatUI({ messages, input, setInput, onSend, loading }: ChatUIProps) {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  return (
    <div className="flex flex-col flex-1 max-w-2xl w-full mx-auto">
      <div className="flex-1 overflow-y-auto space-y-3 mb-4 p-4 bg-amber-900/10 rounded-xl max-h-[60vh]">
        {messages.map((msg, i) => (
          <div
            key={i}
            className={`p-3 rounded-xl max-w-[85%] whitespace-pre-wrap leading-relaxed ${
              msg.role === 'assistant'
                ? 'bg-amber-100 text-amber-900 self-start ml-0 mr-auto'
                : 'bg-blue-100 text-blue-900 self-end mr-0 ml-auto'
            }`}
            style={{ display: 'block', textAlign: msg.role === 'assistant' ? 'right' : 'right' }}
          >
            <span className="font-bold text-sm block mb-1">
              {msg.role === 'assistant' ? '🏰 מאסטר המבוך' : '⚔️ אתה'}
            </span>
            {msg.content}
          </div>
        ))}
        {loading && (
          <div className="bg-amber-100 text-amber-900 p-3 rounded-xl max-w-[85%]">
            <span className="font-bold text-sm block mb-1">🏰 מאסטר המבוך</span>
            <span className="animate-pulse">חושב...</span>
          </div>
        )}
        <div ref={bottomRef} />
      </div>

      <div className="flex gap-2">
        <input
          type="text"
          value={input}
          onChange={e => setInput(e.target.value)}
          onKeyDown={e => e.key === 'Enter' && !loading && onSend()}
          placeholder="מה אתה עושה?"
          className="flex-1 p-3 rounded-xl border-2 border-amber-300 bg-white text-amber-900 placeholder-amber-400 focus:outline-none focus:border-amber-500"
          disabled={loading}
        />
        <button
          onClick={onSend}
          disabled={loading || !input.trim()}
          className="bg-amber-600 text-white px-6 rounded-xl font-bold hover:bg-amber-700 transition-colors disabled:opacity-50"
        >
          שלח
        </button>
      </div>
    </div>
  );
}
