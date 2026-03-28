'use client';

const rows = [
  ['ק', 'ר', 'א', 'ט', 'ו', 'ן', 'ם', 'פ'],
  ['ש', 'ד', 'ג', 'כ', 'ע', 'י', 'ח', 'ל', 'ך', 'ף'],
  ['ז', 'ס', 'ב', 'ה', 'נ', 'מ', 'צ', 'ת', 'ץ'],
];

type LetterStatus = 'correct' | 'present' | 'absent' | 'unused';

interface KeyboardProps {
  letterStatuses: Record<string, LetterStatus>;
  onKey: (key: string) => void;
  onEnter: () => void;
  onDelete: () => void;
}

export default function Keyboard({ letterStatuses, onKey, onEnter, onDelete }: KeyboardProps) {
  const getColor = (status: LetterStatus) => {
    switch (status) {
      case 'correct': return 'bg-green-500 text-white';
      case 'present': return 'bg-yellow-500 text-white';
      case 'absent': return 'bg-gray-400 text-white';
      default: return 'bg-gray-200 text-gray-800 hover:bg-gray-300';
    }
  };

  return (
    <div className="flex flex-col items-center gap-1.5">
      {rows.map((row, i) => (
        <div key={i} className="flex gap-1">
          {i === 2 && (
            <button
              onClick={onEnter}
              className="px-3 py-3 bg-amber-500 text-white rounded-lg font-bold text-sm hover:bg-amber-600 transition-colors"
            >
              שלח
            </button>
          )}
          {row.map(letter => (
            <button
              key={letter}
              onClick={() => onKey(letter)}
              className={`w-9 h-11 rounded-lg font-bold text-lg transition-colors ${getColor(letterStatuses[letter] || 'unused')}`}
            >
              {letter}
            </button>
          ))}
          {i === 2 && (
            <button
              onClick={onDelete}
              className="px-3 py-3 bg-red-400 text-white rounded-lg font-bold text-sm hover:bg-red-500 transition-colors"
            >
              ⌫
            </button>
          )}
        </div>
      ))}
    </div>
  );
}
