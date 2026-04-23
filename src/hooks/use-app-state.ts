import { useEffect, useState, useCallback } from "react";
import { loadState, saveState, type Bookmark, type Highlight, type HighlightColor, bumpStreak } from "@/lib/storage";

export function useAppState() {
  const [state, setState] = useState(loadState);

  useEffect(() => {
    saveState(state);
    if (typeof document !== "undefined") {
      document.documentElement.classList.toggle("light", state.theme === "light");
    }
  }, [state]);

  const markRead = useCallback((bookId: string, chapter: number) => {
    setState((s) => {
      const key = `${bookId}-${chapter}`;
      if (s.readChapters.includes(key)) return { ...s, lastRead: { bookId, chapter } };
      const next = bumpStreak({ ...s, readChapters: [...s.readChapters, key], lastRead: { bookId, chapter } });
      return next;
    });
  }, []);

  const toggleRead = useCallback((bookId: string, chapter: number) => {
    setState((s) => {
      const key = `${bookId}-${chapter}`;
      if (s.readChapters.includes(key)) {
        return { ...s, readChapters: s.readChapters.filter((k) => k !== key) };
      }
      return bumpStreak({ ...s, readChapters: [...s.readChapters, key], lastRead: { bookId, chapter } });
    });
  }, []);

  const toggleBookmark = useCallback((b: Bookmark) => {
    setState((s) => {
      const exists = s.bookmarks.some(
        (x) => x.bookId === b.bookId && x.chapter === b.chapter && x.verse === b.verse,
      );
      return {
        ...s,
        bookmarks: exists
          ? s.bookmarks.filter((x) => !(x.bookId === b.bookId && x.chapter === b.chapter && x.verse === b.verse))
          : [b, ...s.bookmarks],
      };
    });
  }, []);

  const setHighlight = useCallback((bookId: string, chapter: number, verse: number, color: HighlightColor | null) => {
    setState((s) => {
      const filtered = s.highlights.filter(
        (h) => !(h.bookId === bookId && h.chapter === chapter && h.verse === verse),
      );
      const next: Highlight[] = color ? [...filtered, { bookId, chapter, verse, color }] : filtered;
      return { ...s, highlights: next };
    });
  }, []);

  const setFontSize = useCallback((n: number) => setState((s) => ({ ...s, fontSize: n })), []);
  const toggleTheme = useCallback(() => setState((s) => ({ ...s, theme: s.theme === "dark" ? "light" : "dark" })), []);
  const addQuizScore = useCallback((n: number) => setState((s) => ({ ...s, quizScore: s.quizScore + n })), []);

  return { state, markRead, toggleRead, toggleBookmark, setHighlight, setFontSize, toggleTheme, addQuizScore };
}
