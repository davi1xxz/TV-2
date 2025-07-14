export interface NewsItem {
  id: number;
  title: string;
  summary: string;
  details: string;
  date: string;
  image: string;
}

export const newsData: NewsItem[] = [
  {
    id: 1,
    title: "Nova programação da TV OK estreia na próxima semana",
    summary: "Confira os novos programas que chegam para diversificar ainda mais nossa grade de programação.",
    details: "A partir da próxima semana, ouvintes poderão acompanhar atrações inéditas, quadros interativos e muita música de qualidade. Não perca as novidades e participe ao vivo! A nova grade trará programas inéditos, com foco em música regional, entrevistas exclusivas e participação dos ouvintes. Fique ligado para não perder as novidades!",
    date: "11/07/2025",
    image: "https://images.unsplash.com/photo-1478737270239-2f02b77fc618?w=600&h=350&fit=crop"
  },
  {
    id: 2,
    title: "Festival de música local será transmitido ao vivo",
    summary: "Não perca a cobertura completa do maior festival de música da região, direto dos nossos estúdios.",
    details: "O evento contará com apresentações de bandas locais, entrevistas exclusivas e sorteios para os ouvintes. Fique ligado para acompanhar tudo em tempo real! O festival contará com bandas locais, entrevistas ao vivo e sorteios para os ouvintes. Acompanhe nossa transmissão e participe dessa grande festa da música!",
    date: "10/07/2025",
    image: "https://images.unsplash.com/photo-1493225457124-a3eb161ffa5f?w=600&h=350&fit=crop"
  },
  {
    id: 3,
    title: "Entrevista exclusiva com artista local",
    summary: "O cantor João Silva fala sobre seu novo álbum e projetos futuros em entrevista exclusiva.",
    details: "Ele compartilha detalhes do processo criativo, inspirações e planos para shows na região. Uma conversa imperdível para quem gosta de música nacional! João Silva compartilha curiosidades sobre o processo criativo do novo álbum e revela planos para shows e colaborações futuras. Não perca essa conversa inspiradora!",
    date: "09/07/2025",
    image: "https://images.unsplash.com/photo-1511671782779-c97d3d27a1d4?w=600&h=350&fit=crop"
  },
  {
    id: 4,
    title: "Campanha solidária arrecada doações para comunidade",
    summary: "Nossa campanha beneficente já arrecadou mais de 500 cestas básicas para famílias necessitadas.",
    details: "A mobilização contou com o apoio de ouvintes, parceiros e voluntários da comunidade. A entrega das doações será realizada no próximo sábado, com cobertura ao vivo da rádio. A TV OK agradece a todos os ouvintes que participaram da campanha solidária. As doações serão entregues a famílias em situação de vulnerabilidade da região.",
    date: "08/07/2025",
    image: "https://images.unsplash.com/photo-1559027615-cd4628902d4a?w=600&h=350&fit=crop"
  },
  {
    id: 5,
    title: "Novo estúdio da TV OK é inaugurado",
    summary: "A TV OK agora conta com um estúdio moderno para transmissões ao vivo e gravações.",
    details: "O novo espaço oferece tecnologia de ponta, isolamento acústico e mais conforto para convidados e equipe. Venha conhecer e participar das nossas transmissões especiais! O novo espaço oferece tecnologia de ponta e mais conforto para convidados e equipe. Venha conhecer e participar das nossas transmissões!",
    date: "07/07/2025",
    image: "https://images.unsplash.com/photo-1464983953574-0892a716854b?w=600&h=350&fit=crop"
  },
  {
    id: 6,
    title: "Podcast semanal estreia com convidados especiais",
    summary: "Toda semana um novo episódio com temas variados e participação de especialistas.",
    details: "O podcast traz debates, entrevistas e dicas culturais para os ouvintes. Não perca o episódio de estreia, já disponível nas principais plataformas! O podcast da TV OK traz debates, entrevistas e muita informação para os ouvintes. Não perca o episódio de estreia!",
    date: "06/07/2025",
    image: "https://images.unsplash.com/photo-1506744038136-46273834b3fb?w=600&h=350&fit=crop"
  }
]; 