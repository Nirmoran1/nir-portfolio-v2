'use client';

import { useState, useCallback } from 'react';
import Link from 'next/link';
import ChatUI from './components/ChatUI';

type Setting = 'david' | 'maccabees' | 'idf';

const settingLabels: Record<Setting, string> = {
  david: '🏛️ ימי דוד המלך',
  maccabees: '🕎 תקופת המכבים',
  idf: '🪖 צה"ל המודרני',
};

const settingPrompts: Record<Setting, string> = {
  david: 'אתה מאסטר מבוך בהרפתקה המתרחשת בימי דוד המלך בישראל העתיקה. תאר סביבות כמו ירושלים העתיקה, מדבר יהודה, ועמק האלה.',
  maccabees: 'אתה מאסטר מבוך בהרפתקה המתרחשת בתקופת המכבים. תאר קרבות נגד היוונים, מערות מסתור, ואת בית המקדש.',
  idf: 'אתה מאסטר מבוך בהרפתקה צבאית מודרנית בצה"ל. תאר משימות מיוחדות, בסיסים צבאיים, ואימונים.',
};

export default function DungeonPage() {
  const [setting, setSetting] = useState<Setting | null>(null);
  const [messages, setMessages] = useState<{ role: 'user' | 'assistant'; content: string }[]>([]);
  const [input, setInput] = useState('');
  const [loading, setLoading] = useState(false);

  const startGame = useCallback(async (s: Setting) => {
    setSetting(s);
    setLoading(true);
    try {
      const systemPrompt = `${settingPrompts[s]} דבר תמיד בעברית. תן לשחקן 2-3 אפשרויות פעולה בכל תור. תאר את הסביבה בצורה מרתקת ומפורטת. התחל את ההרפתקה עם תיאור הפתיחה.`;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: [{ role: 'user', content: 'התחל את ההרפתקה' }],
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || 'שגיאה בהתחלת המשחק. נסה שוב.';
      setMessages([{ role: 'assistant', content: text }]);
    } catch {
      setMessages([{ role: 'assistant', content: 'שגיאה בחיבור. בדוק שה-API מוגדר נכון.' }]);
    }
    setLoading(false);
  }, []);

  const sendMessage = useCallback(async () => {
    if (!input.trim() || loading || !setting) return;
    const userMsg = input.trim();
    setInput('');
    const newMessages = [...messages, { role: 'user' as const, content: userMsg }];
    setMessages(newMessages);
    setLoading(true);

    try {
      const systemPrompt = `${settingPrompts[setting]} דבר תמיד בעברית. תן לשחקן 2-3 אפשרויות פעולה בכל תור. תאר את הסביבה בצורה מרתקת.`;
      const res = await fetch('/api/chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          model: 'claude-sonnet-4-20250514',
          max_tokens: 500,
          system: systemPrompt,
          messages: newMessages.map(m => ({ role: m.role, content: m.content })),
        }),
      });
      const data = await res.json();
      const text = data.content?.[0]?.text || 'שגיאה. נסה שוב.';
      setMessages([...newMessages, { role: 'assistant', content: text }]);
    } catch {
      setMessages([...newMessages, { role: 'assistant', content: 'שגיאה בחיבור.' }]);
    }
    setLoading(false);
  }, [input, loading, messages, setting]);

  return (
    <div className="min-h-screen bg-gradient-to-b from-amber-900 to-amber-950 text-amber-50 flex flex-col px-4 py-6">
      <Link href="/games" className="self-start text-amber-300 hover:text-amber-100 font-semibold mb-4">
        → חזרה למשחקים
      </Link>
      <h1 className="text-4xl font-bold text-center mb-2">🏰 מאסטר המבוך</h1>
      <p className="text-center text-amber-300 mb-6">הרפתקה טקסטואלית עם בינה מלאכותית</p>

      {!setting ? (
        <div className="max-w-md mx-auto w-full space-y-4">
          <h2 className="text-2xl font-bold text-center mb-4">בחר תקופה:</h2>
          {(Object.keys(settingLabels) as Setting[]).map(s => (
            <button
              key={s}
              onClick={() => startGame(s)}
              className="w-full bg-amber-700 hover:bg-amber-600 text-amber-50 p-4 rounded-xl text-xl font-bold transition-colors"
            >
              {settingLabels[s]}
            </button>
          ))}
        </div>
      ) : (
        <ChatUI messages={messages} input={input} setInput={setInput} onSend={sendMessage} loading={loading} />
      )}
    </div>
  );
}
