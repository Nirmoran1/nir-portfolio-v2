'use client';

import { useState, useEffect, useCallback } from 'react';
import Link from 'next/link';
import Grid, { getCellStatuses } from './components/Grid';
import Keyboard from './components/Keyboard';
import { getDailyWord } from './words';

type LetterStatus = 'correct' | 'present' | 'absent' | 'unused';

const WORD_LENGTH = 5;
const MAX_ATTEMPTS = 6;

export default function MilaPage() {
  const [target] = useState(() => getDailyWord());
  const [guesses, setGuesses] = useState<string[]>([]);
  const [currentGuess, setCurrentGuess] = useState('');
  const [gameOver, setGameOver] = useState(false);
  const [won, setWon] = useState(false);
  const [message, setMessage] = useState('');
  const [letterStatuses, setLetterStatuses] = useState<Record<string, LetterStatus>>({});

  const updateLetterStatuses = useCallback((guess: string, targetWord: string) => {
    const statuses = getCellStatuses(guess, targetWord);
    setLetterStatuses(prev => {
      const updated = { ...prev };
      for (let i = 0; i < guess.length; i++) {
        const letter = guess[i];
        const status = statuses[i] === 'correct' ? 'correct' :
                       statuses[i] === 'present' ? 'present' : 'absent';
        if (updated[letter] === 'correct') continue;
        if (updated[letter] === 'present' && status === 'absent') continue;
        updated[letter] = status;
      }
      return updated;
    });
  }, []);

  const handleSubmit = useCallback(() => {
    if (currentGuess.length !== WORD_LENGTH) {
      setMessage('המילה חייבת להיות בת 5 אותיות');
      setTimeout(() => setMessage(''), 2000);
      return;
    }
    const newGuesses = [...guesses, currentGuess];
    setGuesses(newGuesses);
    updateLetterStatuses(currentGuess, target);

    if (currentGuess === target) {
      setWon(true);
      setGameOver(true);
      setMessage('כל הכבוד! ניחשת את המילה! 🎉');
      const stats = JSON.parse(localStorage.getItem('mila-stats') || '{"played":0,"won":0}');
      stats.played++;
      stats.won++;
      localStorage.setItem('mila-stats', JSON.stringify(stats));
    } else if (newGuesses.length >= MAX_ATTEMPTS) {
      setGameOver(true);
      setMessage(`המילה היתה: ${target}`);
      const stats = JSON.parse(localStorage.getItem('mila-stats') || '{"played":0,"won":0}');
      stats.played++;
      localStorage.setItem('mila-stats', JSON.stringify(stats));
    }
    setCurrentGuess('');
  }, [currentGuess, guesses, target, updateLetterStatuses]);

  const handleKey = useCallback((key: string) => {
    if (gameOver) return;
    if (currentGuess.length < WORD_LENGTH) {
      setCurrentGuess(prev => prev + key);
    }
  }, [gameOver, currentGuess]);

  const handleDelete = useCallback(() => {
    if (gameOver) return;
    setCurrentGuess(prev => prev.slice(0, -1));
  }, [gameOver]);

  useEffect(() => {
    const handler = (e: KeyboardEvent) => {
      if (e.key === 'Enter') handleSubmit();
      else if (e.key === 'Backspace') handleDelete();
    };
    window.addEventListener('keydown', handler);
    return () => window.removeEventListener('keydown', handler);
  }, [handleSubmit, handleDelete]);

  const shareResults = () => {
    const emojiGrid = guesses.map(guess => {
      const statuses = getCellStatuses(guess, target);
      return statuses.map(s => s === 'correct' ? '🟩' : s === 'present' ? '🟨' : '⬜').join('');
    }).join('\n');
    const text = `מילה 🔤 ${won ? guesses.length : 'X'}/${MAX_ATTEMPTS}\n\n${emojiGrid}`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  const stats = typeof window !== 'undefined'
    ? JSON.parse(localStorage.getItem('mila-stats') || '{"played":0,"won":0}')
    : { played: 0, won: 0 };

  return (
    <div className="min-h-screen bg-gradient-to-b from-green-50 to-emerald-50 flex flex-col items-center px-4 py-6">
      <Link href="/games" className="self-start text-green-700 hover:text-green-900 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-4xl font-bold text-green-900 mb-2">🔤 מילה</h1>
      <p className="text-green-700 mb-1">נחש את המילה בת 5 האותיות ב-6 ניסיונות</p>
      <p className="text-sm text-green-600 mb-4">שיחקת: {stats.played} | ניצחונות: {stats.won}</p>

      {message && (
        <div className="bg-green-100 border border-green-300 text-green-800 px-4 py-2 rounded-lg mb-4 font-semibold">
          {message}
        </div>
      )}

      <Grid guesses={guesses} currentGuess={currentGuess} target={target} maxAttempts={MAX_ATTEMPTS} wordLength={WORD_LENGTH} />

      <div className="mt-6">
        <Keyboard letterStatuses={letterStatuses} onKey={handleKey} onEnter={handleSubmit} onDelete={handleDelete} />
      </div>

      {gameOver && (
        <button onClick={shareResults} className="mt-6 bg-green-500 text-white px-6 py-3 rounded-xl font-bold hover:bg-green-600 transition-colors">
          📱 שתף בוואטסאפ
        </button>
      )}
    </div>
  );
}
