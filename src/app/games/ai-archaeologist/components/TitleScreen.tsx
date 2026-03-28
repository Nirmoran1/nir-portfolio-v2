'use client';

interface TitleScreenProps {
  onStart: () => void;
}

export default function TitleScreen({ onStart }: TitleScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="animate-pulse text-6xl mb-6">🏛️</div>
      <h1 className="text-4xl md:text-5xl font-bold text-purple-400 mb-4">
        הארכיאולוג של ה-AI
      </h1>
      <p className="text-lg md:text-xl text-gray-400 mb-2 max-w-md">
        8 חדרים במעבדת AI עתיקה. כל חדר מסתיר ידע ואוצר.
      </p>
      <p className="text-sm text-gray-500 mb-8 max-w-sm">
        חקור את המעבדה הנטושה, למד מושגי AI, ענה על שאלות ואסוף פריטים נדירים.
      </p>
      <button
        onClick={onStart}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold text-lg
                   px-8 py-4 rounded-xl transition-all duration-300
                   hover:scale-105 hover:shadow-lg hover:shadow-purple-500/30
                   active:scale-95"
      >
        התחל חקירה 🔦
      </button>
      <p className="text-xs text-gray-600 mt-4">BEGIN EXPEDITION</p>
    </div>
  );
}
