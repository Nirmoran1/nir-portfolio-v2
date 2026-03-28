'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

type Phase = 'waiting' | 'ready' | 'go' | 'result' | 'early';

interface Stats {
  best: number | null;
  attempts: number[];
}

function loadStats(): Stats {
  if (typeof window === 'undefined') return { best: null, attempts: [] };
  const saved = localStorage.getItem('reaction-stats');
  if (saved) return JSON.parse(saved);
  return { best: null, attempts: [] };
}

export default function ReactionPage() {
  const [phase, setPhase] = useState<Phase>('waiting');
  const [reactionTime, setReactionTime] = useState<number>(0);
  const [stats, setStats] = useState<Stats>(loadStats);
  const startTimeRef = useRef<number>(0);
  const timeoutRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const average = stats.attempts.length > 0
    ? Math.round(stats.attempts.reduce((a, b) => a + b, 0) / stats.attempts.length)
    : null;

  const startRound = useCallback(() => {
    setPhase('ready');
    const delay = 1500 + Math.random() * 4000;
    timeoutRef.current = setTimeout(() => {
      setPhase('go');
      startTimeRef.current = Date.now();
    }, delay);
  }, []);

  const handleClick = useCallback(() => {
    if (phase === 'waiting') {
      startRound();
    } else if (phase === 'ready') {
      // Clicked too early
      if (timeoutRef.current) clearTimeout(timeoutRef.current);
      setPhase('early');
    } else if (phase === 'go') {
      const time = Date.now() - startTimeRef.current;
      setReactionTime(time);
      setPhase('result');
      const newStats = {
        best: stats.best === null ? time : Math.min(stats.best, time),
        attempts: [...stats.attempts, time].slice(-20),
      };
      setStats(newStats);
      localStorage.setItem('reaction-stats', JSON.stringify(newStats));
    } else if (phase === 'result' || phase === 'early') {
      setPhase('waiting');
    }
  }, [phase, stats, startRound]);

  useEffect(() => {
    return () => { if (timeoutRef.current) clearTimeout(timeoutRef.current); };
  }, []);

  const shareResult = () => {
    const text = `⚡ מהירות תגובה: ${reactionTime}ms\n🏆 שיא אישי: ${stats.best}ms\n📊 ממוצע: ${average}ms\nבוא לנסות!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const getBg = () => {
    switch (phase) {
      case 'ready': return 'bg-red-500';
      case 'go': return 'bg-green-500';
      case 'early': return 'bg-yellow-500';
      default: return 'bg-gradient-to-b from-blue-50 to-indigo-50';
    }
  };

  const getMessage = () => {
    switch (phase) {
      case 'waiting': return { text: 'לחץ להתחיל', sub: 'בדוק כמה מהר אתה מגיב!', emoji: '⚡' };
      case 'ready': return { text: 'חכה...', sub: 'אל תלחץ עדיין!', emoji: '🔴' };
      case 'go': return { text: 'לחץ עכשיו!', sub: '', emoji: '🟢' };
      case 'early': return { text: 'מוקדם מדי! 😅', sub: 'לחץ לנסות שוב', emoji: '⚠️' };
      case 'result': return { text: `${reactionTime}ms`, sub: 'לחץ לנסות שוב', emoji: '🎯' };
    }
  };

  const msg = getMessage();

  return (
    <div
      className={`min-h-screen flex flex-col items-center justify-center cursor-pointer select-none transition-colors duration-200 ${getBg()}`}
      onClick={handleClick}
    >
      <div className="absolute top-4 right-4">
        <Link href="/games" className="text-gray-600 hover:text-gray-900 font-semibold bg-white/80 px-3 py-1 rounded-lg" onClick={e => e.stopPropagation()}>
          → חזרה למשחקים
        </Link>
      </div>

      <span className="text-8xl mb-4">{msg.emoji}</span>
      <h1 className={`text-6xl font-bold mb-2 ${phase === 'ready' || phase === 'go' ? 'text-white' : 'text-gray-900'}`}>
        {msg.text}
      </h1>
      {msg.sub && (
        <p className={`text-xl ${phase === 'ready' ? 'text-white/80' : 'text-gray-600'}`}>{msg.sub}</p>
      )}

      {phase !== 'ready' && phase !== 'go' && (
        <div className="mt-8 bg-white/90 rounded-xl p-4 text-center" onClick={e => e.stopPropagation()}>
          <div className="flex gap-6 text-gray-700">
            <div>
              <div className="text-sm">שיא</div>
              <div className="text-2xl font-bold text-indigo-600">{stats.best ? `${stats.best}ms` : '-'}</div>
            </div>
            <div>
              <div className="text-sm">ממוצע</div>
              <div className="text-2xl font-bold text-indigo-600">{average ? `${average}ms` : '-'}</div>
            </div>
            <div>
              <div className="text-sm">ניסיונות</div>
              <div className="text-2xl font-bold text-indigo-600">{stats.attempts.length}</div>
            </div>
          </div>
          {stats.best && (
            <button onClick={shareResult} className="mt-3 bg-green-500 text-white px-4 py-2 rounded-lg font-bold hover:bg-green-600 transition-colors">
              📱 שתף בוואטסאפ
            </button>
          )}
        </div>
      )}
    </div>
  );
}
