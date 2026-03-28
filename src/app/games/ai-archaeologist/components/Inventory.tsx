'use client';

import { useState } from 'react';

interface InventoryProps {
  items: string[];
}

export default function Inventory({ items }: InventoryProps) {
  const [open, setOpen] = useState(false);

  if (items.length === 0) return null;

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 px-4">
      <button
        onClick={() => setOpen(!open)}
        className="text-sm text-purple-400 hover:text-purple-300 transition-colors"
      >
        🎒 תיק הפריטים ({items.length}) {open ? '▲' : '▼'}
      </button>
      {open && (
        <div className="mt-2 flex flex-wrap gap-2">
          {items.map((item, i) => (
            <span
              key={i}
              className="bg-gray-800 border border-purple-500/30 px-3 py-1 rounded-lg text-sm text-gray-300"
            >
              {item}
            </span>
          ))}
        </div>
      )}
    </div>
  );
}
