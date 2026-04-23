import { createFileRoute, Link } from "@tanstack/react-router";
import { motion } from "framer-motion";
import { BookOpen, Flame, Sparkles, Bookmark, Gamepad2 } from "lucide-react";
import { useAppState } from "@/hooks/use-app-state";
import { devotionalOfTheDay } from "@/lib/devotionals";
import { BOOKS_BY_ID } from "@/lib/bible-data";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Lumen — Início" },
      { name: "description", content: "Sua jornada diária na Palavra: devocional, leitura, favoritos e jogos bíblicos." },
    ],
  }),
  component: Home,
});

function Home() {
  const { state } = useAppState();
  const dev = devotionalOfTheDay();
  const last = state.lastRead;
  const lastBook = last ? BOOKS_BY_ID[last.bookId] : null;
  const totalChapters = 1189;
  const progress = Math.min(100, Math.round((state.readChapters.length / totalChapters) * 100));

  return (
    <>
      <TopBar />
      <main className="mx-auto max-w-2xl px-4">
        {/* Hero */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-divine p-6 shadow-gold"
        >
          <div className="absolute -right-8 -top-8 h-32 w-32 rounded-full bg-white/10 blur-2xl" />
          <p className="font-display text-xs uppercase tracking-[0.25em] text-primary-foreground/80">Lumen</p>
          <h1 className="mt-1 font-display text-3xl font-semibold leading-tight text-primary-foreground">
            Que a Sua Palavra<br />ilumine meu caminho
          </h1>
          <div className="mt-5 flex items-center gap-4">
            <div className="flex items-center gap-2 rounded-full bg-black/20 px-3 py-1.5 text-xs font-medium text-primary-foreground">
              <Flame className="h-3.5 w-3.5" />
              {state.streak.count} dia{state.streak.count !== 1 && "s"} seguidos
            </div>
            <div className="text-xs text-primary-foreground/80">{progress}% lido</div>
          </div>
        </motion.section>

        {/* Continue reading */}
        {last && lastBook && (
          <Link
            to="/biblia/$bookId/$chapter"
            params={{ bookId: last.bookId, chapter: String(last.chapter) }}
            className="mt-4 flex items-center gap-3 rounded-xl border border-border bg-card p-4 transition-colors hover:bg-accent"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-primary/15 text-primary">
              <BookOpen className="h-5 w-5" />
            </div>
            <div className="flex-1">
              <p className="text-xs uppercase tracking-wider text-muted-foreground">Continuar leitura</p>
              <p className="font-display text-base">{lastBook.name} {last.chapter}</p>
            </div>
            <span className="text-primary">→</span>
          </Link>
        )}

        {/* Devotional */}
        <motion.section
          initial={{ opacity: 0, y: 12 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, delay: 0.1 }}
          className="mt-6"
        >
          <div className="mb-3 flex items-center gap-2">
            <Sparkles className="h-4 w-4 text-primary" />
            <h2 className="font-display text-lg">Devocional do dia</h2>
          </div>
          <article className="rounded-2xl border border-border bg-card p-5 shadow-soft">
            <p className="text-xs font-medium uppercase tracking-wider text-primary">{dev.reference}</p>
            <h3 className="mt-1 font-display text-xl">{dev.title}</h3>
            <blockquote className="mt-3 border-l-2 border-primary/60 pl-4 font-display text-base italic text-foreground/90">
              "{dev.verse}"
            </blockquote>
            <p className="mt-3 text-sm leading-relaxed text-muted-foreground">{dev.reflection}</p>
          </article>
        </motion.section>

        {/* Quick actions */}
        <section className="mt-6 grid grid-cols-2 gap-3">
          <Link to="/biblia" className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent">
            <BookOpen className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-base">Bíblia</p>
            <p className="text-xs text-muted-foreground">66 livros</p>
          </Link>
          <Link to="/favoritos" className="rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent">
            <Bookmark className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-base">Favoritos</p>
            <p className="text-xs text-muted-foreground">{state.bookmarks.length} versículos</p>
          </Link>
          <Link to="/jogos" className="col-span-2 rounded-2xl border border-border bg-card p-4 transition-colors hover:bg-accent">
            <Gamepad2 className="mb-2 h-5 w-5 text-primary" />
            <p className="font-display text-base">Jogos bíblicos</p>
            <p className="text-xs text-muted-foreground">Quiz · Caça-palavras · {state.quizScore} pts</p>
          </Link>
        </section>
      </main>
    </>
  );
}
