'use client';

import { useState, useMemo, useCallback } from 'react';
import Link from 'next/link';
import { QUESTIONS } from './questions';

export default function TriviaPage() {
  const shuffled = useMemo(() => [...QUESTIONS].sort(() => Math.random() - 0.5), []);
  const [current, setCurrent] = useState(0);
  const [score, setScore] = useState(0);
  const [streak, setStreak] = useState(0);
  const [bestStreak, setBestStreak] = useState(0);
  const [selected, setSelected] = useState<number | null>(null);
  const [finished, setFinished] = useState(false);

  const question = shuffled[current];

  const handleAnswer = useCallback((index: number) => {
    if (selected !== null) return;
    setSelected(index);

    const isCorrect = index === question.correct;
    if (isCorrect) {
      setScore(s => s + 1);
      setStreak(s => {
        const newStreak = s + 1;
        setBestStreak(b => Math.max(b, newStreak));
        return newStreak;
      });
    } else {
      setStreak(0);
    }

    setTimeout(() => {
      if (current + 1 >= shuffled.length) {
        setFinished(true);
      } else {
        setCurrent(c => c + 1);
        setSelected(null);
      }
    }, 1500);
  }, [selected, question, current, shuffled.length]);

  const shareScore = () => {
    const pct = Math.round((score / shuffled.length) * 100);
    const text = `🇮🇱 טריוויה ישראלית!\n📊 ${score}/${shuffled.length} (${pct}%)\n🔥 רצף הכי ארוך: ${bestStreak}\nבוא לנסות!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const restart = () => {
    setCurrent(0);
    setScore(0);
    setStreak(0);
    setBestStreak(0);
    setSelected(null);
    setFinished(false);
  };

  if (finished) {
    const pct = Math.round((score / shuffled.length) * 100);
    return (
      <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center px-4 py-6">
        <Link href="/games" className="self-start text-blue-700 hover:text-blue-900 font-semibold mb-4">
          → חזרה למשחקים
        </Link>
        <h1 className="text-4xl font-bold text-blue-900 mb-6">🇮🇱 סיימת!</h1>
        <div className="bg-white rounded-2xl shadow-lg p-8 text-center max-w-md w-full">
          <div className="text-6xl mb-4">{pct >= 80 ? '🏆' : pct >= 50 ? '👏' : '💪'}</div>
          <div className="text-4xl font-bold text-blue-900 mb-2">{score}/{shuffled.length}</div>
          <div className="text-xl text-blue-600 mb-1">{pct}% תשובות נכונות</div>
          <div className="text-blue-500 mb-6">רצף הכי ארוך: {bestStreak} 🔥</div>
          <div className="flex gap-3 justify-center">
            <button onClick={restart} className="bg-blue-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-blue-600 transition-colors">
              🔄 שחק שוב
            </button>
            <button onClick={shareScore} className="bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">
              📱 שתף
            </button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gradient-to-b from-blue-50 to-indigo-50 flex flex-col items-center px-4 py-6">
      <Link href="/games" className="self-start text-blue-700 hover:text-blue-900 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-3xl font-bold text-blue-900 mb-2">🇮🇱 טריוויה ישראלית</h1>

      <div className="flex gap-4 text-blue-700 mb-4">
        <span>שאלה {current + 1}/{shuffled.length}</span>
        <span>ניקוד: {score}</span>
        <span>רצף: {streak} 🔥</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
        <div className="text-xs text-blue-400 mb-2">{question.category}</div>
        <h2 className="text-xl font-bold text-blue-900 mb-6">{question.question}</h2>
        <div className="space-y-3">
          {question.options.map((opt, i) => {
            let bg = 'bg-blue-50 hover:bg-blue-100 border-blue-200';
            if (selected !== null) {
              if (i === question.correct) bg = 'bg-green-100 border-green-500 text-green-900';
              else if (i === selected) bg = 'bg-red-100 border-red-500 text-red-900';
              else bg = 'bg-gray-50 border-gray-200 text-gray-400';
            }
            return (
              <button
                key={i}
                onClick={() => handleAnswer(i)}
                disabled={selected !== null}
                className={`w-full p-4 rounded-xl border-2 text-right font-semibold transition-all ${bg}`}
              >
                {opt}
              </button>
            );
          })}
        </div>
      </div>
    </div>
  );
}
