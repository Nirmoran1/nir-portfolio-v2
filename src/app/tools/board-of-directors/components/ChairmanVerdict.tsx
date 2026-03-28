"use client";

interface ChairmanVerdictProps {
  response: string | null;
  isLoading: boolean;
}

export default function ChairmanVerdict({
  response,
  isLoading,
}: ChairmanVerdictProps) {
  if (!isLoading && !response) return null;

  return (
    <div className="mt-8 rounded-xl border-2 border-purple-500 bg-purple-500/10 p-5 sm:p-6 shadow-lg shadow-purple-500/20">
      <div className="flex items-center gap-3 mb-4">
        <span className="text-3xl sm:text-4xl">&#128081;</span>
        <div>
          <h3 className="font-bold text-lg sm:text-xl text-purple-400">
            היו&quot;ר הדירקטוריון
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">סיכום והחלטה</p>
        </div>
      </div>

      <div className="text-sm sm:text-base text-gray-100 leading-relaxed">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="text-purple-300">...מסכם את הדיון</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-purple-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        ) : (
          <p className="whitespace-pre-wrap">{response}</p>
        )}
      </div>
    </div>
  );
}
