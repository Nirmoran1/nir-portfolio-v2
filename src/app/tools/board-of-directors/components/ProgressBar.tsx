"use client";

interface ProgressBarProps {
  completed: number;
  total: number;
}

export default function ProgressBar({ completed, total }: ProgressBarProps) {
  const percent = Math.round((completed / total) * 100);

  return (
    <div className="w-full mb-6">
      <div className="flex justify-between items-center mb-2 text-sm text-gray-400">
        <span>{completed} / {total} חברי דירקטוריון הגיבו</span>
        <span>{percent}%</span>
      </div>
      <div className="w-full h-2 bg-gray-800 rounded-full overflow-hidden">
        <div
          className="h-full bg-gradient-to-l from-purple-500 to-blue-500 rounded-full transition-all duration-500 ease-out"
          style={{ width: `${percent}%` }}
        />
      </div>
    </div>
  );
}
