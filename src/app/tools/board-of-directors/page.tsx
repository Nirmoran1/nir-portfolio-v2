"use client";

import { useState } from "react";
import BoardMemberCard from "./components/BoardMemberCard";
import ChairmanVerdict from "./components/ChairmanVerdict";
import ProgressBar from "./components/ProgressBar";
import IdeaInput from "./components/IdeaInput";
import { boardMembers, chairmanSystemPrompt } from "./boardMembers";

interface Responses {
  [key: string]: string | null;
}

async function fetchMemberResponse(
  systemPrompt: string,
  idea: string
): Promise<string> {
  const res = await fetch("/api/chat", {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      model: "claude-sonnet-4-20250514",
      max_tokens: 500,
      system: systemPrompt,
      messages: [{ role: "user", content: idea }],
    }),
  });
  const data = await res.json();
  return data.content?.[0]?.text || "";
}

export default function BoardOfDirectorsPage() {
  const [idea, setIdea] = useState("");
  const [responses, setResponses] = useState<Responses>({});
  const [chairmanResponse, setChairmanResponse] = useState<string | null>(null);
  const [isRunning, setIsRunning] = useState(false);
  const [loadingMembers, setLoadingMembers] = useState<Set<string>>(new Set());
  const [chairmanLoading, setChairmanLoading] = useState(false);
  const [completedCount, setCompletedCount] = useState(0);

  const handleSubmit = async () => {
    if (!idea.trim() || isRunning) return;

    setIsRunning(true);
    setResponses({});
    setChairmanResponse(null);
    setCompletedCount(0);
    setLoadingMembers(new Set(boardMembers.map((m) => m.id)));

    // Run all 5 member calls in parallel
    const memberPromises = boardMembers.map(async (member) => {
      try {
        const text = await fetchMemberResponse(member.systemPrompt, idea);
        setResponses((prev) => ({ ...prev, [member.id]: text }));
        setCompletedCount((prev) => prev + 1);
        setLoadingMembers((prev) => {
          const next = new Set(prev);
          next.delete(member.id);
          return next;
        });
        return { id: member.id, text };
      } catch {
        const errorText = "שגיאה בקבלת תגובה";
        setResponses((prev) => ({ ...prev, [member.id]: errorText }));
        setCompletedCount((prev) => prev + 1);
        setLoadingMembers((prev) => {
          const next = new Set(prev);
          next.delete(member.id);
          return next;
        });
        return { id: member.id, text: errorText };
      }
    });

    const allResults = await Promise.all(memberPromises);

    // Now call Chairman with all responses as context
    setChairmanLoading(true);
    const allResponsesText = allResults
      .map((r) => {
        const member = boardMembers.find((m) => m.id === r.id);
        return `${member?.emoji} ${member?.name} (${member?.role}):\n${r.text}`;
      })
      .join("\n\n");

    try {
      const chairmanText = await fetchMemberResponse(
        chairmanSystemPrompt,
        `הרעיון: ${idea}\n\nחוות דעת חברי הדירקטוריון:\n\n${allResponsesText}`
      );
      setChairmanResponse(chairmanText);
    } catch {
      setChairmanResponse("שגיאה בקבלת סיכום היו\"ר");
    }

    setChairmanLoading(false);
    setIsRunning(false);
  };

  const handleReset = () => {
    setIdea("");
    setResponses({});
    setChairmanResponse(null);
    setIsRunning(false);
    setLoadingMembers(new Set());
    setChairmanLoading(false);
    setCompletedCount(0);
  };

  const hasStarted = Object.keys(responses).length > 0 || isRunning;

  return (
    <div className="min-h-screen bg-[#0a0a0a] text-white px-4 py-8 sm:py-12">
      <div className="max-w-4xl mx-auto">
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-3xl sm:text-4xl font-bold bg-gradient-to-l from-purple-400 to-blue-400 bg-clip-text text-transparent mb-3">
            &#128081; דירקטוריון AI
          </h1>
          <p className="text-gray-400 text-sm sm:text-base max-w-lg mx-auto">
            הציגו רעיון עסקי ו-5 מומחי AI ידונו בו במקביל. בסוף, היו&quot;ר
            יסכם עם המלצה: GO / PAUSE / KILL
          </p>
        </div>

        {/* Input */}
        <IdeaInput
          idea={idea}
          setIdea={setIdea}
          onSubmit={handleSubmit}
          isRunning={isRunning}
        />

        {/* Progress */}
        {hasStarted && (
          <ProgressBar completed={completedCount} total={5} />
        )}

        {/* Board Member Cards */}
        {hasStarted && (
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            {boardMembers.map((member) => (
              <BoardMemberCard
                key={member.id}
                emoji={member.emoji}
                name={member.name}
                role={member.role}
                response={responses[member.id] || null}
                color={member.color}
                isLoading={loadingMembers.has(member.id)}
              />
            ))}
          </div>
        )}

        {/* Chairman Verdict */}
        <ChairmanVerdict
          response={chairmanResponse}
          isLoading={chairmanLoading}
        />

        {/* Reset Button */}
        {hasStarted && !isRunning && chairmanResponse && (
          <div className="text-center mt-8">
            <button
              onClick={handleReset}
              className="px-8 py-3 rounded-xl font-bold text-base border border-gray-600 hover:border-purple-500 hover:bg-purple-500/10 text-gray-300 hover:text-white transition-all duration-200"
            >
              &#128161; הצע רעיון חדש
            </button>
          </div>
        )}
      </div>
    </div>
  );
}
