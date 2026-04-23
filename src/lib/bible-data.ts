// Books of the Bible — Portuguese names + chapter counts + API slug
export type BookCategory = "AT" | "NT";

export interface Book {
  id: string;          // english id used by api (e.g. "genesis")
  name: string;        // Portuguese name
  short: string;       // 3-letter abbreviation
  chapters: number;
  category: BookCategory;
}

export const BOOKS: Book[] = [
  // Antigo Testamento
  { id: "genesis", name: "Gênesis", short: "Gn", chapters: 50, category: "AT" },
  { id: "exodus", name: "Êxodo", short: "Ex", chapters: 40, category: "AT" },
  { id: "leviticus", name: "Levítico", short: "Lv", chapters: 27, category: "AT" },
  { id: "numbers", name: "Números", short: "Nm", chapters: 36, category: "AT" },
  { id: "deuteronomy", name: "Deuteronômio", short: "Dt", chapters: 34, category: "AT" },
  { id: "joshua", name: "Josué", short: "Js", chapters: 24, category: "AT" },
  { id: "judges", name: "Juízes", short: "Jz", chapters: 21, category: "AT" },
  { id: "ruth", name: "Rute", short: "Rt", chapters: 4, category: "AT" },
  { id: "1samuel", name: "1 Samuel", short: "1Sm", chapters: 31, category: "AT" },
  { id: "2samuel", name: "2 Samuel", short: "2Sm", chapters: 24, category: "AT" },
  { id: "1kings", name: "1 Reis", short: "1Rs", chapters: 22, category: "AT" },
  { id: "2kings", name: "2 Reis", short: "2Rs", chapters: 25, category: "AT" },
  { id: "1chronicles", name: "1 Crônicas", short: "1Cr", chapters: 29, category: "AT" },
  { id: "2chronicles", name: "2 Crônicas", short: "2Cr", chapters: 36, category: "AT" },
  { id: "ezra", name: "Esdras", short: "Ed", chapters: 10, category: "AT" },
  { id: "nehemiah", name: "Neemias", short: "Ne", chapters: 13, category: "AT" },
  { id: "esther", name: "Ester", short: "Et", chapters: 10, category: "AT" },
  { id: "job", name: "Jó", short: "Jó", chapters: 42, category: "AT" },
  { id: "psalms", name: "Salmos", short: "Sl", chapters: 150, category: "AT" },
  { id: "proverbs", name: "Provérbios", short: "Pv", chapters: 31, category: "AT" },
  { id: "ecclesiastes", name: "Eclesiastes", short: "Ec", chapters: 12, category: "AT" },
  { id: "song of solomon", name: "Cânticos", short: "Ct", chapters: 8, category: "AT" },
  { id: "isaiah", name: "Isaías", short: "Is", chapters: 66, category: "AT" },
  { id: "jeremiah", name: "Jeremias", short: "Jr", chapters: 52, category: "AT" },
  { id: "lamentations", name: "Lamentações", short: "Lm", chapters: 5, category: "AT" },
  { id: "ezekiel", name: "Ezequiel", short: "Ez", chapters: 48, category: "AT" },
  { id: "daniel", name: "Daniel", short: "Dn", chapters: 12, category: "AT" },
  { id: "hosea", name: "Oséias", short: "Os", chapters: 14, category: "AT" },
  { id: "joel", name: "Joel", short: "Jl", chapters: 3, category: "AT" },
  { id: "amos", name: "Amós", short: "Am", chapters: 9, category: "AT" },
  { id: "obadiah", name: "Obadias", short: "Ob", chapters: 1, category: "AT" },
  { id: "jonah", name: "Jonas", short: "Jn", chapters: 4, category: "AT" },
  { id: "micah", name: "Miquéias", short: "Mq", chapters: 7, category: "AT" },
  { id: "nahum", name: "Naum", short: "Na", chapters: 3, category: "AT" },
  { id: "habakkuk", name: "Habacuque", short: "Hc", chapters: 3, category: "AT" },
  { id: "zephaniah", name: "Sofonias", short: "Sf", chapters: 3, category: "AT" },
  { id: "haggai", name: "Ageu", short: "Ag", chapters: 2, category: "AT" },
  { id: "zechariah", name: "Zacarias", short: "Zc", chapters: 14, category: "AT" },
  { id: "malachi", name: "Malaquias", short: "Ml", chapters: 4, category: "AT" },
  // Novo Testamento
  { id: "matthew", name: "Mateus", short: "Mt", chapters: 28, category: "NT" },
  { id: "mark", name: "Marcos", short: "Mc", chapters: 16, category: "NT" },
  { id: "luke", name: "Lucas", short: "Lc", chapters: 24, category: "NT" },
  { id: "john", name: "João", short: "Jo", chapters: 21, category: "NT" },
  { id: "acts", name: "Atos", short: "At", chapters: 28, category: "NT" },
  { id: "romans", name: "Romanos", short: "Rm", chapters: 16, category: "NT" },
  { id: "1corinthians", name: "1 Coríntios", short: "1Co", chapters: 16, category: "NT" },
  { id: "2corinthians", name: "2 Coríntios", short: "2Co", chapters: 13, category: "NT" },
  { id: "galatians", name: "Gálatas", short: "Gl", chapters: 6, category: "NT" },
  { id: "ephesians", name: "Efésios", short: "Ef", chapters: 6, category: "NT" },
  { id: "philippians", name: "Filipenses", short: "Fp", chapters: 4, category: "NT" },
  { id: "colossians", name: "Colossenses", short: "Cl", chapters: 4, category: "NT" },
  { id: "1thessalonians", name: "1 Tessalonicenses", short: "1Ts", chapters: 5, category: "NT" },
  { id: "2thessalonians", name: "2 Tessalonicenses", short: "2Ts", chapters: 3, category: "NT" },
  { id: "1timothy", name: "1 Timóteo", short: "1Tm", chapters: 6, category: "NT" },
  { id: "2timothy", name: "2 Timóteo", short: "2Tm", chapters: 4, category: "NT" },
  { id: "titus", name: "Tito", short: "Tt", chapters: 3, category: "NT" },
  { id: "philemon", name: "Filemom", short: "Fm", chapters: 1, category: "NT" },
  { id: "hebrews", name: "Hebreus", short: "Hb", chapters: 13, category: "NT" },
  { id: "james", name: "Tiago", short: "Tg", chapters: 5, category: "NT" },
  { id: "1peter", name: "1 Pedro", short: "1Pe", chapters: 5, category: "NT" },
  { id: "2peter", name: "2 Pedro", short: "2Pe", chapters: 3, category: "NT" },
  { id: "1john", name: "1 João", short: "1Jo", chapters: 5, category: "NT" },
  { id: "2john", name: "2 João", short: "2Jo", chapters: 1, category: "NT" },
  { id: "3john", name: "3 João", short: "3Jo", chapters: 1, category: "NT" },
  { id: "jude", name: "Judas", short: "Jd", chapters: 1, category: "NT" },
  { id: "revelation", name: "Apocalipse", short: "Ap", chapters: 22, category: "NT" },
];

export const BOOKS_BY_ID: Record<string, Book> = Object.fromEntries(
  BOOKS.map((b) => [b.id, b])
);

export interface Verse {
  book_id: string;
  book_name: string;
  chapter: number;
  verse: number;
  text: string;
}

export interface ChapterData {
  reference: string;
  verses: Verse[];
  translation_name: string;
}

const cache = new Map<string, ChapterData>();

export async function fetchChapter(bookId: string, chapter: number): Promise<ChapterData> {
  const key = `${bookId}-${chapter}`;
  if (cache.has(key)) return cache.get(key)!;

  // Try localStorage offline cache
  if (typeof window !== "undefined") {
    const stored = localStorage.getItem(`chapter:${key}`);
    if (stored) {
      try {
        const parsed = JSON.parse(stored) as ChapterData;
        cache.set(key, parsed);
        return parsed;
      } catch {/* ignore */}
    }
  }

  const book = BOOKS_BY_ID[bookId];
  const ref = encodeURIComponent(`${book.id}+${chapter}`);
  const res = await fetch(`https://bible-api.com/${ref}?translation=almeida`);
  if (!res.ok) throw new Error("Falha ao carregar capítulo");
  const data = await res.json();
  const result: ChapterData = {
    reference: data.reference,
    verses: data.verses.map((v: Verse) => ({ ...v, text: v.text.trim() })),
    translation_name: data.translation_name,
  };
  cache.set(key, result);
  if (typeof window !== "undefined") {
    try { localStorage.setItem(`chapter:${key}`, JSON.stringify(result)); } catch {/* quota */}
  }
  return result;
}
