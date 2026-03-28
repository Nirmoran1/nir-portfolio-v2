'use client';

interface VictoryScreenProps {
  score: number;
  totalAttempts: number;
  inventory: string[];
  onRestart: () => void;
}

export default function VictoryScreen({ score, totalAttempts, inventory, onRestart }: VictoryScreenProps) {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-4 text-center">
      <div className="text-6xl mb-6">🏆</div>
      <h1 className="text-4xl font-bold text-yellow-400 mb-4">
        המשלחת הושלמה!
      </h1>
      <p className="text-lg text-gray-300 mb-6">
        חקרת את כל 8 חדרי המעבדה העתיקה
      </p>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-6 w-full max-w-sm">
        <div className="text-2xl font-bold text-green-400 mb-2">
          ציון: {score} / {totalAttempts}
        </div>
        <div className="text-sm text-gray-400">
          {score === 8
            ? "מושלם! ענית נכון על הכל 🌟"
            : score >= 6
            ? "מרשים! הבנה מצוינת של AI 🎯"
            : "טוב! יש מה ללמוד עוד 📚"}
        </div>
      </div>

      <div className="bg-gray-900 border border-gray-700 rounded-xl p-6 mb-8 w-full max-w-sm">
        <h3 className="text-purple-400 font-bold mb-3">אוסף הפריטים:</h3>
        <div className="flex flex-wrap gap-2 justify-center">
          {inventory.map((item, i) => (
            <span
              key={i}
              className="bg-gray-800 border border-purple-500/30 px-3 py-1.5 rounded-lg text-sm"
            >
              {item}
            </span>
          ))}
        </div>
      </div>

      <button
        onClick={onRestart}
        className="bg-purple-600 hover:bg-purple-500 text-white font-bold
                   px-6 py-3 rounded-xl transition-all duration-300
                   hover:scale-105 active:scale-95"
      >
        משלחת חדשה 🔄
      </button>
    </div>
  );
}
