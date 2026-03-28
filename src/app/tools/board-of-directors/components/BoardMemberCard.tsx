"use client";

interface BoardMemberCardProps {
  emoji: string;
  name: string;
  role: string;
  response: string | null;
  color: string;
  isLoading: boolean;
}

const colorMap: Record<string, { border: string; bg: string; text: string; glow: string }> = {
  blue: {
    border: "border-blue-500",
    bg: "bg-blue-500/10",
    text: "text-blue-400",
    glow: "shadow-blue-500/20",
  },
  green: {
    border: "border-green-500",
    bg: "bg-green-500/10",
    text: "text-green-400",
    glow: "shadow-green-500/20",
  },
  amber: {
    border: "border-amber-500",
    bg: "bg-amber-500/10",
    text: "text-amber-400",
    glow: "shadow-amber-500/20",
  },
  pink: {
    border: "border-pink-500",
    bg: "bg-pink-500/10",
    text: "text-pink-400",
    glow: "shadow-pink-500/20",
  },
  red: {
    border: "border-red-500",
    bg: "bg-red-500/10",
    text: "text-red-400",
    glow: "shadow-red-500/20",
  },
};

export default function BoardMemberCard({
  emoji,
  name,
  role,
  response,
  color,
  isLoading,
}: BoardMemberCardProps) {
  const colors = colorMap[color] || colorMap.blue;

  return (
    <div
      className={`rounded-xl border ${colors.border} ${colors.bg} p-4 sm:p-5 transition-all duration-500 ${
        response ? `shadow-lg ${colors.glow}` : "opacity-80"
      }`}
    >
      <div className="flex items-center gap-3 mb-3">
        <span className="text-2xl sm:text-3xl">{emoji}</span>
        <div>
          <h3 className={`font-bold text-base sm:text-lg ${colors.text}`}>
            {name}
          </h3>
          <p className="text-xs sm:text-sm text-gray-400">{role}</p>
        </div>
      </div>

      <div className="text-sm sm:text-base text-gray-200 leading-relaxed min-h-[60px]">
        {isLoading ? (
          <div className="flex items-center gap-2">
            <span className="text-gray-400">...חושב</span>
            <div className="flex gap-1">
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:0ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:150ms]" />
              <span className="w-2 h-2 rounded-full bg-gray-400 animate-bounce [animation-delay:300ms]" />
            </div>
          </div>
        ) : response ? (
          <p className="whitespace-pre-wrap">{response}</p>
        ) : null}
      </div>
    </div>
  );
}
