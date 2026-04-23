export interface Devotional {
  title: string;
  reference: string;
  verse: string;
  reflection: string;
}

export const DEVOTIONALS: Devotional[] = [
  {
    title: "A Luz que Brilha nas Trevas",
    reference: "João 1:5",
    verse: "E a luz resplandece nas trevas, e as trevas não a compreenderam.",
    reflection: "Mesmo nas estações mais escuras, a luz de Cristo permanece. Hoje, escolha caminhar nessa luz — não importa o que o dia traga.",
  },
  {
    title: "Confia no Senhor",
    reference: "Provérbios 3:5-6",
    verse: "Confia no Senhor de todo o teu coração, e não te estribes no teu próprio entendimento.",
    reflection: "Entregar nossos planos a Deus é o primeiro passo da paz. Quando confiamos, deixamos de carregar pesos que não nos pertencem.",
  },
  {
    title: "Renovados a Cada Manhã",
    reference: "Lamentações 3:22-23",
    verse: "As misericórdias do Senhor são a causa de não sermos consumidos; elas se renovam cada manhã.",
    reflection: "Cada amanhecer é um convite ao recomeço. Não importa o ontem — hoje há misericórdia nova esperando por você.",
  },
  {
    title: "Paz que Excede o Entendimento",
    reference: "Filipenses 4:7",
    verse: "E a paz de Deus, que excede todo o entendimento, guardará os vossos corações.",
    reflection: "A paz de Deus não depende das circunstâncias — ela guarda o coração mesmo no meio da tempestade.",
  },
  {
    title: "Posso Todas as Coisas",
    reference: "Filipenses 4:13",
    verse: "Posso todas as coisas naquele que me fortalece.",
    reflection: "Não é a força humana, mas a presença d'Aquele que nos sustenta. O poder vem de quem habita em nós.",
  },
  {
    title: "Descanso para a Alma",
    reference: "Mateus 11:28",
    verse: "Vinde a mim, todos os que estais cansados e oprimidos, e eu vos aliviarei.",
    reflection: "Há um lugar de descanso real — os pés de Jesus. Ali, todo cansaço encontra alívio.",
  },
  {
    title: "O Bom Pastor",
    reference: "Salmos 23:1",
    verse: "O Senhor é o meu pastor; nada me faltará.",
    reflection: "Quando reconhecemos quem nos guia, deixamos de viver na escassez. O Pastor conhece cada vale e cada pastagem.",
  },
];

export function devotionalOfTheDay(): Devotional {
  const day = Math.floor(Date.now() / 86400000);
  return DEVOTIONALS[day % DEVOTIONALS.length];
}
