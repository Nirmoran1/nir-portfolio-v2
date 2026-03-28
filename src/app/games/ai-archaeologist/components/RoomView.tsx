'use client';

import { useState } from 'react';
import { Room } from '../data';

interface RoomViewProps {
  room: Room;
  isCleared: boolean;
  onAnswer: (correct: boolean) => void;
  onNavigate: (roomId: number) => void;
  allRooms: Room[];
}

export default function RoomView({ room, isCleared, onAnswer, onNavigate, allRooms }: RoomViewProps) {
  const [showLesson, setShowLesson] = useState(false);
  const [selected, setSelected] = useState<number | null>(null);
  const [answered, setAnswered] = useState(isCleared);
  const [wasCorrect, setWasCorrect] = useState(false);

  const handleSelect = (idx: number) => {
    if (answered) return;
    setSelected(idx);
    const correct = room.quiz.options[idx].correct;
    setWasCorrect(correct);
    setAnswered(true);
    onAnswer(correct);
  };

  return (
    <div className="w-full max-w-2xl mx-auto px-4 pb-8">
      {/* Room header */}
      <div className="text-center mb-6">
        <div className="text-4xl mb-2">{room.emoji}</div>
        <h2 className="text-2xl font-bold text-purple-400">{room.nameHe}</h2>
        <p className="text-xs text-gray-500 mt-1">{room.name}</p>
      </div>

      {/* Atmosphere */}
      <p className="italic text-gray-400 text-center mb-6 leading-relaxed">
        {room.atmosphere}
      </p>

      {/* Knowledge Terminal */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl mb-6 overflow-hidden">
        <button
          onClick={() => setShowLesson(!showLesson)}
          className="w-full px-4 py-3 text-right flex items-center justify-between
                     hover:bg-gray-800 transition-colors"
        >
          <span className="text-sm text-gray-500">{showLesson ? '▲' : '▼'}</span>
          <span className="text-green-400 font-bold">
            💻 טרמינל ידע
          </span>
        </button>
        {showLesson && (
          <div className="px-4 pb-4 text-gray-300 leading-relaxed text-sm border-t border-gray-700 pt-3">
            {room.lesson}
          </div>
        )}
      </div>

      {/* Quiz */}
      <div className="bg-gray-900 border border-gray-700 rounded-xl p-4 mb-6">
        <h3 className="font-bold text-purple-300 mb-3">{room.quiz.question}</h3>
        <div className="space-y-2">
          {room.quiz.options.map((opt, idx) => {
            let btnClass = "w-full text-right px-4 py-3 rounded-lg border transition-all duration-200 text-sm ";
            if (answered) {
              if (opt.correct) {
                btnClass += "border-green-500 bg-green-500/10 text-green-400";
              } else if (idx === selected && !opt.correct) {
                btnClass += "border-red-500 bg-red-500/10 text-red-400";
              } else {
                btnClass += "border-gray-700 bg-gray-800 text-gray-500";
              }
            } else {
              btnClass += "border-gray-700 bg-gray-800 text-gray-300 hover:border-purple-500 hover:bg-purple-500/10 cursor-pointer";
            }

            return (
              <button key={idx} onClick={() => handleSelect(idx)} className={btnClass}>
                {opt.text}
              </button>
            );
          })}
        </div>

        {answered && (
          <div className={`mt-3 text-center text-sm font-bold ${wasCorrect ? 'text-green-400' : 'text-red-400'}`}>
            {wasCorrect
              ? `✅ נכון! קיבלת: ${room.lootEmoji} ${room.loot}`
              : isCleared
                ? "חדר זה כבר נפתח!"
                : "❌ לא נכון. החדר נחקר אבל בלי פריט."}
          </div>
        )}
      </div>

      {/* Navigation */}
      <div className="flex flex-wrap gap-3 justify-center">
        {room.exits.map((exitId) => {
          const target = allRooms.find((r) => r.id === exitId)!;
          return (
            <button
              key={exitId}
              onClick={() => onNavigate(exitId)}
              className="bg-gray-800 hover:bg-gray-700 border border-gray-600
                         hover:border-purple-500 px-4 py-2.5 rounded-lg
                         transition-all duration-200 text-sm"
            >
              {target.emoji} {target.nameHe} →
            </button>
          );
        })}
      </div>
    </div>
  );
}
