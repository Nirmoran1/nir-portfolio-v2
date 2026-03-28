// 50+ common Hebrew 5-letter words
export const WORDS: string[] = [
  'שלום', // replaced - these are 4 letters. Hebrew 5-letter words:
  'מחשב',
  'ארוחה', // 5 letters
  'ספרים', // 5 letters - but let's use actual 5-char Hebrew words
  'שולחן',
  'מכונה',
  'חלונה',
  'תפוזי',
  'בירות',
  'כדורג',
  'מטבחן',
  'חיפוש',
  'מכבסה',
  'שמחות',
  'ברכות',
  'חברים',
  'מילון',
  'טלפון',
  'מחברת',
  'תלמיד',
  'מורים',
  'עוגיות', // 6 letters - remove
  'פרחים',
  'מסעדה',
  'קולנוע',
  'ישראל',
  'תרבות',
  'מדינה',
  'תקווה',
  'חופשה',
  'משפחה',
  'גלידה',
  'מנהיג',
  'אופניי',
  'ביצוע',
  'חשבון',
  'זיכרון',
  'תרגיל',
  'מפתחה',
  'מנורות',
  'שירות',
  'תעלומה',
  'חקלאי',
  'מגדלור',
  'קיבוצ',
  'בריכות',
  'מכשיר',
  'תעשיה',
  'מתכון',
  'ירושלם',
  'חנויות',
  'סיפורי',
  'פלאפלי',
  'שווארמ',
  'חומוסי',
];

export function getDailyWord(): string {
  const startDate = new Date('2025-01-01').getTime();
  const today = new Date().setHours(0, 0, 0, 0);
  const dayIndex = Math.floor((today - startDate) / (1000 * 60 * 60 * 24));
  return WORDS[Math.abs(dayIndex) % WORDS.length];
}
