"use client";

interface IdeaInputProps {
  idea: string;
  setIdea: (val: string) => void;
  onSubmit: () => void;
  isRunning: boolean;
}

export default function IdeaInput({
  idea,
  setIdea,
  onSubmit,
  isRunning,
}: IdeaInputProps) {
  return (
    <div className="w-full max-w-2xl mx-auto mb-8">
      <textarea
        value={idea}
        onChange={(e) => setIdea(e.target.value)}
        placeholder="תאר את הרעיון שלך כאן... למשל: אפליקציה שמחברת בין בעלי חיות מחמד לבייביסיטרים בשכונה"
        className="w-full h-32 sm:h-36 p-4 rounded-xl bg-gray-900 border border-gray-700 text-gray-100 placeholder-gray-500 resize-none focus:outline-none focus:border-purple-500 focus:ring-1 focus:ring-purple-500 transition-colors text-sm sm:text-base"
        disabled={isRunning}
      />
      <button
        onClick={onSubmit}
        disabled={!idea.trim() || isRunning}
        className="mt-3 w-full py-3 rounded-xl font-bold text-base sm:text-lg bg-gradient-to-l from-purple-600 to-blue-600 hover:from-purple-500 hover:to-blue-500 disabled:opacity-40 disabled:cursor-not-allowed text-white transition-all duration-200"
      >
        {isRunning ? "...הדירקטוריון דן" : "&#128172; הפעל את הדירקטוריון"}
      </button>
    </div>
  );
}
