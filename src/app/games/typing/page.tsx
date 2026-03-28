'use client';

import { useState, useEffect, useRef, useCallback } from 'react';
import Link from 'next/link';

const SENTENCES = [
  'שלום לכל מי שקורא את המשפט הזה',
  'ישראל היא מדינה יפה עם נופים מדהימים',
  'הפלאפל הוא המאכל הכי טעים בעולם',
  'בוקר טוב לכל תושבי הארץ היקרים',
  'התכנות הוא אומנות של פתרון בעיות',
  'ירושלים היא עיר עתיקה ומרתקת מאוד',
  'הים התיכון הוא אחד הימים היפים בעולם',
  'החומוס הישראלי מפורסם בכל רחבי העולם',
  'שוק הכרמל בתל אביב מלא בצבעים וריחות',
  'מדבר הנגב מציע הרפתקאות בלתי נשכחות',
  'הכינרת היא אגם המים המתוקים הכי נמוך',
  'פריחת הכלניות בדרום היא חוויה מיוחדת',
  'העברית היא שפה עתיקה שקמה לתחייה',
  'בואו נלמד יחד לכתוב מהר יותר בעברית',
  'כל יום הוא הזדמנות חדשה להתפתח ולצמוח',
];

interface Stats {
  bestWpm: number | null;
  bestAccuracy: number | null;
}

function loadStats(): Stats {
  if (typeof window === 'undefined') return { bestWpm: null, bestAccuracy: null };
  const saved = localStorage.getItem('typing-stats');
  if (saved) return JSON.parse(saved);
  return { bestWpm: null, bestAccuracy: null };
}

export default function TypingPage() {
  const [sentence, setSentence] = useState('');
  const [input, setInput] = useState('');
  const [started, setStarted] = useState(false);
  const [finished, setFinished] = useState(false);
  const [startTime, setStartTime] = useState<number>(0);
  const [wpm, setWpm] = useState(0);
  const [accuracy, setAccuracy] = useState(0);
  const [stats, setStats] = useState<Stats>(loadStats);
  const inputRef = useRef<HTMLTextAreaElement>(null);

  const pickSentence = useCallback(() => {
    setSentence(SENTENCES[Math.floor(Math.random() * SENTENCES.length)]);
  }, []);

  useEffect(() => { pickSentence(); }, [pickSentence]);

  const handleInput = useCallback((value: string) => {
    if (finished) return;
    if (!started) {
      setStarted(true);
      setStartTime(Date.now());
    }
    setInput(value);

    if (value.length >= sentence.length) {
      const elapsed = (Date.now() - (started ? startTime : Date.now())) / 1000 / 60;
      const words = sentence.split(' ').length;
      const calcWpm = Math.round(words / Math.max(elapsed, 0.01));

      let correct = 0;
      for (let i = 0; i < sentence.length; i++) {
        if (value[i] === sentence[i]) correct++;
      }
      const calcAccuracy = Math.round((correct / sentence.length) * 100);

      setWpm(calcWpm);
      setAccuracy(calcAccuracy);
      setFinished(true);

      const newStats = {
        bestWpm: stats.bestWpm ? Math.max(stats.bestWpm, calcWpm) : calcWpm,
        bestAccuracy: stats.bestAccuracy ? Math.max(stats.bestAccuracy, calcAccuracy) : calcAccuracy,
      };
      setStats(newStats);
      localStorage.setItem('typing-stats', JSON.stringify(newStats));
    }
  }, [finished, started, startTime, sentence, stats]);

  const restart = () => {
    pickSentence();
    setInput('');
    setStarted(false);
    setFinished(false);
    setWpm(0);
    setAccuracy(0);
    setTimeout(() => inputRef.current?.focus(), 100);
  };

  const shareResult = () => {
    const text = `⌨️ מבחן הקלדה בעברית!\n⚡ ${wpm} מילים לדקה\n🎯 ${accuracy}% דיוק\nבוא לנסות!`;
    window.open(`https://wa.me/?text=${encodeURIComponent(text)}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-gradient-to-b from-teal-50 to-cyan-50 flex flex-col items-center px-4 py-6">
      <Link href="/games" className="self-start text-teal-700 hover:text-teal-900 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-4xl font-bold text-teal-900 mb-2">⌨️ מבחן הקלדה</h1>
      <p className="text-teal-600 mb-2">הקלד את המשפט כמה שיותר מהר!</p>

      <div className="flex gap-4 text-teal-700 mb-4 text-sm">
        <span>שיא: {stats.bestWpm ? `${stats.bestWpm} מ/ד` : '-'}</span>
        <span>דיוק שיא: {stats.bestAccuracy ? `${stats.bestAccuracy}%` : '-'}</span>
      </div>

      <div className="bg-white rounded-2xl shadow-lg p-6 max-w-lg w-full">
        {/* Display sentence with color-coded characters */}
        <div className="text-xl leading-relaxed mb-6 p-4 bg-teal-50 rounded-xl min-h-[80px]" dir="rtl">
          {sentence.split('').map((char, i) => {
            let color = 'text-gray-400';
            if (i < input.length) {
              color = input[i] === char ? 'text-green-600' : 'text-red-500 underline';
            }
            return <span key={i} className={`${color} text-xl`}>{char}</span>;
          })}
        </div>

        <textarea
          ref={inputRef}
          value={input}
          onChange={e => handleInput(e.target.value)}
          disabled={finished}
          dir="rtl"
          placeholder="התחל להקליד כאן..."
          className="w-full p-4 border-2 border-teal-200 rounded-xl text-lg focus:outline-none focus:border-teal-500 resize-none h-24"
          autoFocus
        />
      </div>

      {finished && (
        <div className="bg-white rounded-2xl shadow-lg p-6 text-center max-w-sm w-full mt-4">
          <div className="text-5xl mb-3">🎉</div>
          <div className="flex gap-6 justify-center mb-4">
            <div>
              <div className="text-sm text-teal-600">מהירות</div>
              <div className="text-3xl font-bold text-teal-900">{wpm}</div>
              <div className="text-xs text-teal-500">מילים/דקה</div>
            </div>
            <div>
              <div className="text-sm text-teal-600">דיוק</div>
              <div className="text-3xl font-bold text-teal-900">{accuracy}%</div>
            </div>
          </div>
          <div className="flex gap-3 justify-center">
            <button onClick={restart} className="bg-teal-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-teal-600 transition-colors">
              🔄 נסה שוב
            </button>
            <button onClick={shareResult} className="bg-green-500 text-white px-5 py-2 rounded-xl font-bold hover:bg-green-600 transition-colors">
              📱 שתף
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
