'use client';

import Link from 'next/link';

const games = [
  {
    slug: 'dungeon',
    name: 'מאסטר המבוך',
    emoji: '🏰',
    description: 'הרפתקה טקסטואלית עם בינה מלאכותית. בחר תקופה והתחל את המסע!',
    hero: true,
  },
  {
    slug: 'falafel',
    name: 'אימפריית הפלאפל',
    emoji: '🧆',
    description: 'משחק קליקר - בנה את האימפריה שלך פלאפל אחרי פלאפל!',
    hero: true,
  },
  {
    slug: 'reaction',
    name: 'מהירות תגובה',
    emoji: '⚡',
    description: 'כמה מהר אתה מגיב? בדוק את המהירות שלך!',
    hero: true,
  },
  {
    slug: 'mila',
    name: 'מילה',
    emoji: '🔤',
    description: 'נחש את המילה בעברית ב-6 ניסיונות. כמו Wordle - בעברית!',
    hero: false,
  },
  {
    slug: 'trivia',
    name: 'טריוויה ישראלית',
    emoji: '🇮🇱',
    description: 'כמה אתה מכיר את ישראל? 20 שאלות מאתגרות!',
    hero: false,
  },
  {
    slug: 'memory',
    name: 'משחק זיכרון',
    emoji: '🧠',
    description: 'מצא את הזוגות התואמים! אמוג\'יים ישראליים.',
    hero: false,
  },
  {
    slug: 'typing',
    name: 'מבחן הקלדה',
    emoji: '⌨️',
    description: 'כמה מהר אתה מקליד בעברית? בדוק את המהירות!',
    hero: false,
  },
  {
    slug: 'ai-archaeologist',
    name: 'ארכיאולוג ה-AI',
    emoji: '🏛️',
    description: 'חקור מעבדה עתיקה ולמד 8 מושגי AI דרך חידות והרפתקאות!',
    hero: false,
  },
];

export default function GamesPortal() {
  return (
    <div className="min-h-screen bg-gradient-to-br from-amber-50 via-orange-50 to-red-50">
      <div className="max-w-6xl mx-auto px-4 py-12">
        <header className="text-center mb-12">
          <h1 className="text-5xl font-bold text-amber-900 mb-4">🎮 משחקים</h1>
          <p className="text-xl text-amber-700">7 משחקים בעברית - בחר ושחק!</p>
        </header>

        {/* Hero Games */}
        <section className="mb-10">
          <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">⭐ משחקים מובילים</h2>
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
            {games.filter(g => g.hero).map(game => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group block bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 hover:-translate-y-1 border-2 border-amber-200 overflow-hidden"
              >
                <div className="bg-gradient-to-r from-amber-500 to-orange-500 p-6 text-center">
                  <span className="text-6xl block mb-2">{game.emoji}</span>
                </div>
                <div className="p-6">
                  <h3 className="text-2xl font-bold text-amber-900 mb-2">{game.name}</h3>
                  <p className="text-amber-700 mb-4">{game.description}</p>
                  <div className="bg-amber-500 text-white text-center py-3 rounded-xl font-bold text-lg group-hover:bg-amber-600 transition-colors">
                    🎯 שחק עכשיו
                  </div>
                </div>
              </Link>
            ))}
          </div>
        </section>

        {/* Other Games */}
        <section>
          <h2 className="text-2xl font-bold text-amber-800 mb-6 text-center">🎲 עוד משחקים</h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
            {games.filter(g => !g.hero).map(game => (
              <Link
                key={game.slug}
                href={`/games/${game.slug}`}
                className="group block bg-white rounded-xl shadow-md hover:shadow-xl transition-all duration-300 hover:-translate-y-1 border border-amber-100 p-5"
              >
                <div className="text-center mb-3">
                  <span className="text-4xl">{game.emoji}</span>
                </div>
                <h3 className="text-lg font-bold text-amber-900 mb-1 text-center">{game.name}</h3>
                <p className="text-sm text-amber-600 mb-3 text-center">{game.description}</p>
                <div className="bg-amber-100 text-amber-800 text-center py-2 rounded-lg font-semibold group-hover:bg-amber-200 transition-colors">
                  שחק ←
                </div>
              </Link>
            ))}
          </div>
        </section>

        <footer className="text-center mt-12">
          <Link href="/" className="text-amber-600 hover:text-amber-800 font-semibold transition-colors">
            → חזרה לפורטפוליו
          </Link>
        </footer>
      </div>
    </div>
  );
}
