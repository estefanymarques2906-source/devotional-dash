// Local persistence helpers
export type HighlightColor = "yellow" | "green" | "blue" | "pink";

export interface Bookmark {
  bookId: string;
  chapter: number;
  verse: number;
  text: string;
  bookName: string;
  createdAt: number;
}

export interface Highlight {
  bookId: string;
  chapter: number;
  verse: number;
  color: HighlightColor;
}

interface AppState {
  readChapters: string[];      // "bookId-chapter"
  bookmarks: Bookmark[];
  highlights: Highlight[];
  fontSize: number;            // 14-26
  theme: "dark" | "light";
  streak: { count: number; lastDay: string | null };
  lastRead: { bookId: string; chapter: number } | null;
  quizScore: number;
}

const KEY = "bible-app-state-v1";

const DEFAULT: AppState = {
  readChapters: [],
  bookmarks: [],
  highlights: [],
  fontSize: 18,
  theme: "dark",
  streak: { count: 0, lastDay: null },
  lastRead: null,
  quizScore: 0,
};

export function loadState(): AppState {
  if (typeof window === "undefined") return DEFAULT;
  try {
    const raw = localStorage.getItem(KEY);
    if (!raw) return DEFAULT;
    return { ...DEFAULT, ...JSON.parse(raw) };
  } catch { return DEFAULT; }
}

export function saveState(s: AppState) {
  if (typeof window === "undefined") return;
  try { localStorage.setItem(KEY, JSON.stringify(s)); } catch {/* quota */}
}

export function todayKey() {
  const d = new Date();
  return `${d.getFullYear()}-${d.getMonth() + 1}-${d.getDate()}`;
}

export function bumpStreak(state: AppState): AppState {
  const today = todayKey();
  if (state.streak.lastDay === today) return state;
  const yesterday = new Date();
  yesterday.setDate(yesterday.getDate() - 1);
  const yKey = `${yesterday.getFullYear()}-${yesterday.getMonth() + 1}-${yesterday.getDate()}`;
  const nextCount = state.streak.lastDay === yKey ? state.streak.count + 1 : 1;
  return { ...state, streak: { count: nextCount, lastDay: today } };
}
