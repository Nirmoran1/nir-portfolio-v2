'use client';

import { useState, useEffect, useCallback, useMemo } from 'react';
import Link from 'next/link';

const EMOJIS = ['🧆', '🫓', '🥙', '☕', '🌹', '🕎', '🐪', '🏖️'];

interface Card {
  id: number;
  emoji: string;
  flipped: boolean;
  matched: boolean;
}

function shuffleCards(): Card[] {
  const pairs = [...EMOJIS, ...EMOJIS];
  const shuffled = pairs.sort(() => Math.random() - 0.5);
  return shuffled.map((emoji, i) => ({ id: i, emoji, flipped: false, matched: false }));
}

export default function MemoryPage() {
  const [cards, setCards] = useState<Card[]>(() => shuffleCards());
  const [flippedIds, setFlippedIds] = useState<number[]>([]);
  const [moves, setMoves] = useState(0);
  const [startTime, setStartTime] = useState<number | null>(null);
  const [elapsed, setElapsed] = useState(0);
  const [gameWon, setGameWon] = useState(false);
  const [locked, setLocked] = useState(false);

  const allMatched = useMemo(() => cards.every(c => c.matched), [cards]);

  // Timer
  useEffect(() => {
    if (!startTime || gameWon) return;
    const timer = setInterval(() => {
      setElapsed(Math.floor((Date.now() - startTime) / 1000));
    }, 1000);
    return () => clearInterval(timer);
  }, [startTime, gameWon]);

  // Check win
  useEffect(() => {
    if (allMatched && moves > 0) {
      setGameWon(true);
    }
  }, [allMatched, moves]);

  const handleFlip = useCallback((id: number) => {
    if (locked) return;
    const card = cards[id];
    if (card.flipped || card.matched) return;

    if (!startTime) setStartTime(Date.now());

    const newCards = [...cards];
    newCards[id] = { ...card, flipped: true };
    setCards(newCards);

    const newFlipped = [...flippedIds, id];

    if (newFlipped.length === 2) {
      setMoves(m => m + 1);
      setLocked(true);
      const [first, second] = newFlipped;
      if (newCards[first].emoji === newCards[second].emoji) {
        // Match!
        newCards[first] = { ...newCards[first], matched: true };
        newCards[second] = { ...newCards[second], matched: true };
        setCards(newCards);
        setFlippedIds([]);
        setLocked(false);
      } else {
        // No match - flip back
        setTimeout(() => {
          setCards(prev => prev.map((c, i) =>
            i === first || i === second ? { ...c, flipped: false } : c
          ));
          setFlippedIds([]);
          setLocked(false);
        }, 800);
      }
    } else {
      setFlippedIds(newFlipped);
    }
  }, [cards, flippedIds, locked, startTime]);

  const restart = () => {
    setCards(shuffleCards());
    setFlippedIds([]);
    setMoves(0);
    setStartTime(null);
    setElapsed(0);
    setGameWon(false);
    setLocked(false);
  };

  const shareResult = () => {
    const text = `🧠 משחק זיכרון!\n🎯 ${moves} מהלכים\n⏱️ ${elapsed} שניות\nבוא לנסות!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-purple-50 to-pink-50 flex flex-col items-center px-4 py-6">
      <Link href="/games" className="self-start text-purple-700 hover:text-purple-900 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-4xl font-bold text-purple-900 mb-2">🧠 משחק זיכרון</h1>

      <div className="flex gap-6 text-purple-700 mb-4">
        <span>מהלכים: {moves}</span>
        <span>זמן: {elapsed} שניות</span>
      </div>

      <div className="grid grid-cols-4 gap-3 max-w-xs mx-auto mb-6">
        {cards.map((card) => (
          <button
            key={card.id}
            onClick={() => handleFlip(card.id)}
            className={`w-16 h-16 sm:w-20 sm:h-20 rounded-xl text-3xl sm:text-4xl flex items-center justify-center transition-all duration-300 transform ${
              card.flipped || card.matched
                ? 'bg-white border-2 border-purple-300 rotate-0 scale-100'
                : 'bg-purple-500 border-2 border-purple-600 hover:bg-purple-400 cursor-pointer'
            } ${card.matched ? 'opacity-70' : ''}`}
          >
            {card.flipped || card.matched ? card.emoji : '?'}
          </button>
        ))}
      </div>

      {gameWon && (
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm w-full">
          <div className="text-5xl mb-3">🎉</div>
          <h2 className="text-2xl font-bold text-purple-900 mb-2">כל הכבוד!</h2>
          <p className="text-purple-600 mb-4">{moves} מהלכים ב-{elapsed} שניות</p>
          <div className="flex gap-3 justify-center">
            <button onClick={restart} className="bg-purple-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-purple-600 transition-colors">
              🔄 שחק שוב
            </button>
            <button onClick={shareResult} className="bg-green-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors">
              📱 שתף
            </button>
          </div>
        </div>
      )}

      {!gameWon && moves > 0 && (
        <button onClick={restart} className="mt-2 text-purple-500 hover:text-purple-700 font-semibold">
          🔄 התחל מחדש
        </button>
      )}
    </div>
  );
}
