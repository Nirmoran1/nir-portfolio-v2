'use client';

interface ProgressBarProps {
  cleared: number;
  total: number;
  score: number;
  totalAttempts: number;
}

export default function ProgressBar({ cleared, total, score, totalAttempts }: ProgressBarProps) {
  const pct = Math.round((cleared / total) * 100);

  return (
    <div className="w-full max-w-2xl mx-auto mb-4 px-4">
      <div className="flex justify-between items-center text-sm text-gray-400 mb-1.5">
        <span>חדרים: {cleared}/{total}</span>
        <span>ציון: {score}/{totalAttempts}</span>
      </div>
      <div className="h-2.5 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-purple-500 rounded-full transition-all duration-500"
          style={{ width: `${pct}%` }}
        />
      </div>
    </div>
  );
}
