import { createFileRoute, Link } from "@tanstack/react-router";
import { useMemo, useState } from "react";
import { motion } from "framer-motion";
import { Check, X, RotateCcw } from "lucide-react";
import { QUIZ } from "@/lib/quiz-data";
import { useAppState } from "@/hooks/use-app-state";
import { TopBar } from "@/components/TopBar";

export const Route = createFileRoute("/jogos/quiz")({
  head: () => ({ meta: [{ title: "Quiz Bíblico — Lumen" }] }),
  component: QuizPage,
});

function shuffle<T>(arr: T[]): T[] {
  const a = [...arr];
  for (let i = a.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [a[i], a[j]] = [a[j], a[i]];
  }
  return a;
}

function QuizPage() {
  const { addQuizScore } = useAppState();
  const [seed, setSeed] = useState(0);
  const questions = useMemo(() => shuffle(QUIZ).slice(0, 5), [seed]);
  const [idx, setIdx] = useState(0);
  const [picked, setPicked] = useState<number | null>(null);
  const [score, setScore] = useState(0);
  const [done, setDone] = useState(false);

  const q = questions[idx];

  function pick(i: number) {
    if (picked !== null) return;
    setPicked(i);
    if (i === q.answer) {
      setScore((s) => s + 1);
      addQuizScore(10);
    }
    setTimeout(() => {
      if (idx + 1 >= questions.length) setDone(true);
      else { setIdx(idx + 1); setPicked(null); }
    }, 900);
  }

  function reset() {
    setSeed((s) => s + 1);
    setIdx(0); setPicked(null); setScore(0); setDone(false);
  }

  return (
    <>
      <TopBar title="Quiz Bíblico" back="/jogos" />
      <main className="mx-auto max-w-2xl px-4 py-6">
        {!done ? (
          <>
            <div className="mb-4 flex items-center justify-between text-xs text-muted-foreground">
              <span>Pergunta {idx + 1}/{questions.length}</span>
              <span>Acertos: {score}</span>
            </div>
            <div className="mb-2 h-1 w-full overflow-hidden rounded-full bg-muted">
              <div className="h-full bg-primary transition-all" style={{ width: `${((idx) / questions.length) * 100}%` }} />
            </div>

            <motion.div key={idx} initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }} className="mt-6">
              <h2 className="font-display text-2xl leading-snug">{q.q}</h2>
              <ul className="mt-6 space-y-2">
                {q.options.map((opt, i) => {
                  const isCorrect = picked !== null && i === q.answer;
                  const isWrong = picked === i && i !== q.answer;
                  return (
                    <li key={i}>
                      <button
                        onClick={() => pick(i)}
                        className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm transition-all ${
                          isCorrect ? "border-primary bg-primary/15" :
                          isWrong ? "border-destructive bg-destructive/10" :
                          "border-border bg-card hover:border-primary"
                        }`}
                      >
                        <span>{opt}</span>
                        {isCorrect && <Check className="h-4 w-4 text-primary" />}
                        {isWrong && <X className="h-4 w-4 text-destructive" />}
                      </button>
                    </li>
                  );
                })}
              </ul>
              {picked !== null && (
                <p className="mt-4 text-xs text-muted-foreground">Referência: <span className="text-primary">{q.ref}</span></p>
              )}
            </motion.div>
          </>
        ) : (
          <div className="rounded-2xl border border-border bg-card p-8 text-center">
            <p className="font-display text-5xl text-primary">{score}/{questions.length}</p>
            <p className="mt-2 font-display text-xl">
              {score === questions.length ? "Perfeito!" : score >= questions.length / 2 ? "Muito bem!" : "Continue estudando!"}
            </p>
            <p className="mt-2 text-sm text-muted-foreground">+{score * 10} pontos</p>
            <div className="mt-6 flex justify-center gap-3">
              <button onClick={reset} className="flex items-center gap-2 rounded-full bg-primary px-5 py-2.5 text-sm font-medium text-primary-foreground">
                <RotateCcw className="h-4 w-4" /> Jogar novamente
              </button>
              <Link to="/jogos" className="rounded-full border border-border px-5 py-2.5 text-sm">Voltar</Link>
            </div>
          </div>
        )}
      </main>
    </>
  );
}
