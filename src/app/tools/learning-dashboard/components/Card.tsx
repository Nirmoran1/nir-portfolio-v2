'use client';

import { ReactNode } from 'react';

interface CardProps {
  emoji: string;
  title: string;
  children: ReactNode;
  label?: string;
}

export default function Card({ emoji, title, children, label }: CardProps) {
  return (
    <div className="bg-white/5 border border-white/10 rounded-xl p-4 hover:border-white/20 transition-all">
      <div className="flex items-start gap-3">
        <span className="text-2xl flex-shrink-0">{emoji}</span>
        <div className="flex-1 min-w-0">
          <div className="flex items-center gap-2 flex-wrap">
            <h3 className="text-white font-medium">{title}</h3>
            {label && (
              <span className="text-xs px-2 py-0.5 rounded-full bg-white/10 text-white/60">
                {label}
              </span>
            )}
          </div>
          <div className="mt-1 text-white/60 text-sm">{children}</div>
        </div>
      </div>
    </div>
  );
}
