'use client';

import { useState, useEffect, useCallback, useRef } from 'react';
import Link from 'next/link';
import UpgradesList, { UPGRADES } from './components/Upgrades';

const MEMES = [
  'פלאפל חם מהטאבון! 🔥',
  'עוד חומוס? תמיד עוד חומוס! 🫘',
  'הלקוחות עומדים בתור! 🧑‍🤝‍🧑',
  'שווארמה? אנחנו פלאפל בלבד! 🧆',
  'אמבה על הכל! 💛',
  'חריף או לא חריף? 🌶️',
  'סלט ישראלי בצד, בבקשה 🥗',
  'פיתה או לאפה? 🫓',
];

interface GameState {
  shekels: number;
  totalEarned: number;
  owned: Record<string, number>;
  perSecond: number;
}

function loadState(): GameState {
  if (typeof window === 'undefined') return { shekels: 0, totalEarned: 0, owned: {}, perSecond: 0 };
  const saved = localStorage.getItem('falafel-state');
  if (saved) return JSON.parse(saved);
  return { shekels: 0, totalEarned: 0, owned: {}, perSecond: 0 };
}

export default function FalafelPage() {
  const [state, setState] = useState<GameState>(loadState);
  const [meme, setMeme] = useState('');
  const [clickAnim, setClickAnim] = useState(false);
  const intervalRef = useRef<ReturnType<typeof setInterval> | null>(null);

  // Calculate perSecond from owned upgrades
  const perSecond = UPGRADES.reduce((sum, u) => sum + (state.owned[u.id] || 0) * u.perSecond, 0);

  // Auto-income
  useEffect(() => {
    intervalRef.current = setInterval(() => {
      if (perSecond > 0) {
        setState(prev => ({
          ...prev,
          shekels: prev.shekels + perSecond / 10,
          totalEarned: prev.totalEarned + perSecond / 10,
        }));
      }
    }, 100);
    return () => { if (intervalRef.current) clearInterval(intervalRef.current); };
  }, [perSecond]);

  // Save state
  useEffect(() => {
    localStorage.setItem('falafel-state', JSON.stringify({ ...state, perSecond }));
  }, [state, perSecond]);

  const handleClick = useCallback(() => {
    setState(prev => ({ ...prev, shekels: prev.shekels + 1, totalEarned: prev.totalEarned + 1 }));
    setClickAnim(true);
    setTimeout(() => setClickAnim(false), 150);
    if (Math.random() < 0.3) {
      setMeme(MEMES[Math.floor(Math.random() * MEMES.length)]);
      setTimeout(() => setMeme(''), 2000);
    }
  }, []);

  const handleBuy = useCallback((upgrade: { id: string; cost: number; perSecond: number }) => {
    setState(prev => ({
      ...prev,
      shekels: prev.shekels - upgrade.cost,
      owned: { ...prev.owned, [upgrade.id]: (prev.owned[upgrade.id] || 0) + 1 },
    }));
  }, []);

  const shareScore = () => {
    const text = `🧆 אימפריית הפלאפל שלי!\n₪${Math.floor(state.totalEarned).toLocaleString()} סה"כ הרווחתי\n₪${Math.floor(perSecond).toLocaleString()} בשנייה\nבוא לשחק!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-yellow-50 to-orange-50 flex flex-col items-center px-4 py-6">
      <Link href="/games" className="self-start text-orange-700 hover:text-orange-900 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-4xl font-bold text-orange-900 mb-1">🧆 אימפריית הפלאפל</h1>
      <p className="text-orange-600 mb-4">בנה את האימפריה שלך!</p>

      <div className="text-center mb-4">
        <div className="text-5xl font-bold text-orange-900">₪{Math.floor(state.shekels).toLocaleString()}</div>
        <div className="text-orange-600">₪{Math.floor(perSecond).toLocaleString()} בשנייה</div>
      </div>

      {meme && (
        <div className="bg-yellow-100 border border-yellow-300 text-yellow-800 px-4 py-2 rounded-lg mb-3 font-semibold animate-bounce">
          {meme}
        </div>
      )}

      <button
        onClick={handleClick}
        className={`text-8xl mb-6 transition-transform select-none ${clickAnim ? 'scale-125' : 'scale-100'} hover:scale-110 active:scale-125`}
      >
        🧆
      </button>

      <UpgradesList shekels={state.shekels} owned={state.owned} onBuy={handleBuy} />

      <button onClick={shareScore} className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">
        📱 שתף בוואטסאפ
      </button>
    </div>
  );
}
