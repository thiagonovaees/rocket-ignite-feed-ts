import { Header } from "./components/Header";
import { Post } from "./components/Post";
import { Sidebar } from "./components/Sidebar";

// importação do css comum
import "./global.css";
// importação do css module (requer um nome)
import styles from "./App.module.css";

interface Posts {
  id: number;
  author: {
    avatarUrl: string;
    name: string;
    role: string;
  };
  content: {
    type: "paragraph" | "link";
    content: string;
  }[];
  publishedAt: Date;
}

const posts: Posts[] = [
  {
    id: 1,
    author: {
      avatarUrl: "https://www.github.com/diego3g.png",
      name: "Diego Fernandes",
      role: "CTO @ Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala galeraa 👋" },
      {
        type: "paragraph",
        content: "Acabei de subir mais um projeto no meu portifa.",
      },
      {
        type: "paragraph",
        content: "É um projeto que fiz no NLW Return, evento da Rocketseat.",
      },
      { type: "paragraph", content: "O nome do projeto é DoctorCare 🚀" },
      { type: "link", content: "👉 jane.design/doctorcare" },
    ],
    publishedAt: new Date("2022-11-20 20:00:00"),
  },
  {
    id: 2,
    author: {
      avatarUrl: "https://www.github.com/maykbrito.png",
      name: "Mayk Brito",
      role: "Educator @ Rocketseat",
    },
    content: [
      { type: "paragraph", content: "Fala pessoal 👋" },
      {
        type: "paragraph",
        content: "Finalmente finalizei meu novo site/portfólio.",
      },
      {
        type: "paragraph",
        content:
          "Foi um baita desafio criar todo o design e codar na unha, mas consegui 💪🏻",
      },
      { type: "paragraph", content: "Acesse e deixe seu feedback" },
      { type: "link", content: "👉 devonlane.design" },
    ],
    publishedAt: new Date("2022-11-22 15:00:00"),
  },
  {
    id: 3,
    author: {
      avatarUrl: "https://www.github.com/thiagonovaees.png",
      name: "Thiago Novaes",
      role: "Em transição de carreira",
    },

    content: [
      { type: "paragraph", content: "Lorem ipsum dolor sit amet" },
      {
        type: "paragraph",
        content:
          "consectetur adipisicing elit. Architecto amet sapiente facilis.",
      },
      {
        type: "paragraph",
        content:
          " Ducimus sunt rem quasi voluptates deserunt alias modi quo autem quas.",
      },
      {
        type: "paragraph",
        content: " Non dolore consectetur inventore rem officia similique 🤞",
      },
      { type: "link", content: "👉 loren ipsum" },
    ],
    publishedAt: new Date("2022-11-26 16:00:00"),
  },
];

export function App() {
  return (
    <div>
      <Header />
      {/* A class name deve ser declarada de acordo com a classe o nome do import e a classe usada no arquivo css (nome.classe) */}
      <div className={styles.wrapper}>
        <Sidebar />
        <main>
          {/* Sempre que for iterar algo dentro do jsx utilizar o map */}
          {/* Atenção para utilizar a key */}
          {posts.map((post) => {
            return (
              <Post
                key={post.id}
                author={post.author}
                content={post.content}
                publishedAt={post.publishedAt}
              />
            );
          })}
        </main>
      </div>
    </div>
  );
}
