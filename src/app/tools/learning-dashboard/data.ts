export interface Tip {
  emoji: string;
  name: string;
  description: string;
}

export interface Channel {
  emoji: string;
  name: string;
  description: string;
}

export interface Project {
  emoji: string;
  name: string;
  description: string;
  difficulty: 'קל' | 'בינוני' | 'קשה';
  time: string;
  learn: string;
}

export interface Tool {
  emoji: string;
  name: string;
  description: string;
  pricing: string;
}

export interface Concept {
  emoji: string;
  name: string;
  description: string;
}

export const tips: Tip[] = [
  { emoji: '📓', name: 'NotebookLM', description: 'המחברת של Google — העלו PDF וקבלו סיכומי AI' },
  { emoji: '🎵', name: 'Suno', description: 'יצירת מוזיקה עם AI, נסו מילים בעברית' },
  { emoji: '🤖', name: 'Reddit r/LocalLLaMA', description: 'הקהילה הכי טובה למודלי AI בקוד פתוח' },
  { emoji: '🧪', name: 'Google AI Studio', description: 'Playground חינמי ל-Gemini API' },
  { emoji: '🤗', name: 'Hugging Face', description: 'ה-GitHub של מודלי AI' },
  { emoji: '🔍', name: 'Perplexity', description: 'מנוע חיפוש AI עם מקורות אמיתיים' },
  { emoji: '📂', name: 'Claude Projects', description: 'ארגנו שיחות Claude לפי פרויקט' },
  { emoji: '✏️', name: 'Cursor', description: 'עורך קוד AI-first' },
  { emoji: '🎨', name: 'v0', description: 'יצירת קומפוננטות UI מטקסט' },
  { emoji: '🗣️', name: 'ElevenLabs', description: 'שכפלו את הקול שלכם עם AI' },
  { emoji: '🖼️', name: 'Midjourney', description: 'יצירת תמונות AI ברמה הכי גבוהה' },
  { emoji: '🎬', name: 'Runway', description: 'יצירת וידאו עם AI' },
  { emoji: '💻', name: 'Replit', description: 'בנו אפליקציות בדפדפן עם AI' },
  { emoji: '📖', name: 'Anthropic Cookbook', description: 'דוגמאות ודפוסים ל-Claude API' },
];

export const channels: Channel[] = [
  { emoji: '🧠', name: 'AI Explained', description: 'צלילה עמוקה למאמרים ומושגי AI' },
  { emoji: '📄', name: 'Two Minute Papers', description: 'סיכומי מחקר AI מהירים' },
  { emoji: '🏛️', name: 'Anthropic', description: 'עדכונים רשמיים של Claude ומחקר' },
  { emoji: '🛠️', name: 'Matt Wolfe', description: 'סיכום שבועי של כלי AI' },
  { emoji: '💡', name: 'The AI Advantage', description: 'מדריכי AI מעשיים' },
  { emoji: '🔥', name: 'Fireship', description: 'הסברי טכנולוגיה מהירים' },
  { emoji: '⚡', name: 'Alex Finn', description: 'אוטומציה ועסקים עם AI' },
];

export const projects: Project[] = [
  { emoji: '💬', name: 'צ\'אטבוט AI אישי', description: 'בנו צ\'אטבוט משלכם', difficulty: 'קל', time: '2 שעות', learn: 'בסיסי API' },
  { emoji: '🍳', name: 'סקרייפר מתכונים עם AI', description: 'גרדו מתכונים ונתחו עם AI', difficulty: 'בינוני', time: '4 שעות', learn: 'Web Scraping + AI' },
  { emoji: '🖼️', name: 'מיין תמונות עם AI', description: 'מיון תמונות אוטומטי', difficulty: 'בינוני', time: '3 שעות', learn: 'Vision API' },
  { emoji: '📝', name: 'מסכם טקסטים בעברית', description: 'סיכום טקסטים עבריים', difficulty: 'קל', time: 'שעה', learn: 'Prompt Engineering' },
  { emoji: '🃏', name: 'אפליקציית כרטיסיות AI', description: 'כרטיסיות לימוד חכמות', difficulty: 'בינוני', time: '5 שעות', learn: 'Full-Stack + AI' },
  { emoji: '🎤', name: 'מתמלל הקלטות קוליות', description: 'תמלול וסיכום הקלטות', difficulty: 'קשה', time: '6 שעות', learn: 'Speech-to-Text + סיכום' },
  { emoji: '✍️', name: 'כותב בלוג AI', description: 'יצירת פוסטים עם AI', difficulty: 'בינוני', time: '4 שעות', learn: 'Multi-step Prompting' },
  { emoji: '📧', name: 'עוזר אימייל חכם', description: 'סיווג וניהול אימיילים עם AI', difficulty: 'קשה', time: '8 שעות', learn: 'Email API + סיווג AI' },
  { emoji: '❓', name: 'מחולל חידונים AI', description: 'יצירת חידונים אוטומטית', difficulty: 'קל', time: '2 שעות', learn: 'Structured Output' },
];

export const tools: Tool[] = [
  { emoji: '🎵', name: 'Suno', description: 'מוזיקה עם AI', pricing: 'חינם (מוגבל)' },
  { emoji: '🗣️', name: 'ElevenLabs', description: 'שכפול קול', pricing: 'חינם (מוגבל)' },
  { emoji: '📓', name: 'NotebookLM', description: 'מחברת AI', pricing: 'חינם' },
  { emoji: '🎨', name: 'v0', description: 'יצירת UI', pricing: 'חינם (מוגבל)' },
  { emoji: '🧠', name: 'Teachable Machine', description: 'אימון מודלים בדפדפן', pricing: 'חינם' },
  { emoji: '🔄', name: 'Replicate', description: 'הרצת מודלי AI דרך API', pricing: 'תשלום לפי שימוש' },
  { emoji: '⚡', name: 'Together AI', description: 'אירוח מודלים מהיר', pricing: 'תשלום לפי שימוש' },
  { emoji: '🚀', name: 'Groq', description: 'הסקה מהירה במיוחד', pricing: 'חינם (מוגבל)' },
  { emoji: '🏛️', name: 'Anthropic Console', description: 'Playground ל-Claude API', pricing: 'חינם (מוגבל)' },
  { emoji: '🖼️', name: 'Stability AI', description: 'API ליצירת תמונות', pricing: 'חינם (מוגבל)' },
];

export const concepts: Concept[] = [
  { emoji: '🧠', name: 'Neural Networks', description: 'איך AI "חושב" עם שכבות של מתמטיקה' },
  { emoji: '🔄', name: 'Transformers', description: 'הארכיטקטורה מאחורי ChatGPT ו-Claude' },
  { emoji: '📊', name: 'Embeddings', description: 'איך AI מבין משמעות כמספרים' },
  { emoji: '🎯', name: 'Fine-tuning', description: 'התאמה אישית של מודל לצרכים שלכם' },
  { emoji: '📚', name: 'RAG', description: 'Retrieval Augmented Generation — עיגון AI בעובדות' },
  { emoji: '💬', name: 'Prompt Engineering', description: 'האמנות של לדבר עם AI' },
  { emoji: '🔤', name: 'Tokenization', description: 'איך AI קורא טקסט' },
  { emoji: '👍', name: 'RLHF', description: 'איך AI לומד העדפות אנושיות' },
  { emoji: '🌊', name: 'Diffusion Models', description: 'איך AI מייצר תמונות' },
  { emoji: '🤖', name: 'Agents', description: 'AI שיכול להשתמש בכלים ולבצע פעולות' },
  { emoji: '🛡️', name: 'Constitutional AI', description: 'הגישה של Anthropic לבטיחות AI' },
  { emoji: '👁️', name: 'Multimodal', description: 'AI שרואה, שומע וקורא' },
];
