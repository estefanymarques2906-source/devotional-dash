export interface QuizQuestion {
  q: string;
  options: string[];
  answer: number;
  ref: string;
}

export const QUIZ: QuizQuestion[] = [
  { q: "Quem construiu a arca?", options: ["Moisés", "Noé", "Abraão", "Davi"], answer: 1, ref: "Gênesis 6" },
  { q: "Quantos dias e noites choveu no dilúvio?", options: ["7", "12", "40", "100"], answer: 2, ref: "Gênesis 7:12" },
  { q: "Qual rei escreveu a maioria dos Salmos?", options: ["Salomão", "Davi", "Saul", "Ezequias"], answer: 1, ref: "Salmos" },
  { q: "Quem foi engolido por um grande peixe?", options: ["Jonas", "Pedro", "Paulo", "Daniel"], answer: 0, ref: "Jonas 1" },
  { q: "Quantos discípulos Jesus escolheu?", options: ["7", "10", "12", "70"], answer: 2, ref: "Mateus 10" },
  { q: "Onde Jesus nasceu?", options: ["Nazaré", "Jerusalém", "Belém", "Cafarnaum"], answer: 2, ref: "Mateus 2" },
  { q: "Qual o primeiro milagre de Jesus?", options: ["Curar um cego", "Água em vinho", "Multiplicar pães", "Andar sobre as águas"], answer: 1, ref: "João 2" },
  { q: "Quem negou Jesus três vezes?", options: ["Judas", "João", "Pedro", "Tomé"], answer: 2, ref: "Lucas 22" },
  { q: "Qual livro encerra a Bíblia?", options: ["Judas", "1 João", "Apocalipse", "Hebreus"], answer: 2, ref: "Apocalipse" },
  { q: "Quantos livros tem o Novo Testamento?", options: ["27", "39", "66", "73"], answer: 0, ref: "—" },
  { q: "Quem entregou Jesus por 30 moedas de prata?", options: ["Pedro", "Judas Iscariotes", "Caifás", "Pilatos"], answer: 1, ref: "Mateus 26" },
  { q: "Qual mulher foi mãe de João Batista?", options: ["Maria", "Isabel", "Ana", "Sara"], answer: 1, ref: "Lucas 1" },
];

export const WORD_SEARCH_WORDS: { word: string; hint: string }[] = [
  { word: "AMOR", hint: "Maior dos dons (1 Co 13)" },
  { word: "FE", hint: "Sem ela é impossível agradar a Deus" },
  { word: "PAZ", hint: "Fruto do Espírito" },
  { word: "JESUS", hint: "O Salvador" },
  { word: "LUZ", hint: '"Eu sou a ___ do mundo"' },
  { word: "VIDA", hint: '"Eu sou o caminho, a verdade e a ___"' },
  { word: "GRACA", hint: "Favor imerecido" },
  { word: "ORACAO", hint: "Conversa com Deus" },
];
