import { format, formatDistanceToNow } from "date-fns";
import ptBR from "date-fns/locale/pt-BR";
import { FormEvent, ChangeEvent, useState, InvalidEvent } from "react";
import { Avatar } from "./Avatar";
import { Comment } from "./Comment";
import styles from "./Post.module.css";

//Interface para o objeto Author
interface Author {
  name: string;
  role: string;
  avatarUrl: string;
}

interface Content {
  type: "paragraph" | "link";
  content: string;
}

//Interface para o objeto postProps
interface postProps {
  author: Author;
  publishedAt: Date;
  content: Content[];
}

export function Post({ author, publishedAt, content }: postProps) {
  //Cria um estado para monitorar as mudanças no array de comentários
  const [comments, setComments] = useState([
    "Uau, post muito legal, parabéns 👏👏👏",
  ]);

  //Cria um estado para monitorar as mudaças na textarea
  const [newCommentText, setNewCommentText] = useState("");

  //Formata a data do comentário
  const publishedAtFormatted = format(
    publishedAt,
    "dd 'de' LLLL 'às' HH:mm'h'",
    {
      locale: ptBR,
    }
  );

  //Cálculo relativo de quando o comentário foi criado até agora
  const publishedDateRelativeToNow = formatDistanceToNow(publishedAt, {
    locale: ptBR,
    addSuffix: true,
  });

  //Monitora o clique no botão enviar e atualiza o array de comentários.
  function handleCreateNewComment(event: FormEvent) {
    event.preventDefault();
    setComments([...comments, newCommentText]);
    setNewCommentText("");
  }

  //Monitora as mudanças na text area e salva no estado newCommentText
  function handleNewCommentChange(event: ChangeEvent<HTMLTextAreaElement>) {
    setNewCommentText(event.target.value);
    event.target.setCustomValidity("");
  }

  //Cria uma nova lista de comentários sem o que possui a mesma chave que o usuário deseja deletar
  function deleteComment(commentToDelete: string) {
    const commentWithoutDeletedOne = comments.filter((comment) => {
      return comment !== commentToDelete;
    });
    setComments(commentWithoutDeletedOne);
  }

  function handleNewCommentInvalid(event: InvalidEvent<HTMLTextAreaElement>) {
    event.target.setCustomValidity("Este campo é obrigatório");
  }

  return (
    <article className={styles.post}>
      <header>
        <div className={styles.author}>
          <Avatar hasBorder src={author.avatarUrl} />
          <div className={styles.authorinfo}>
            <strong>{author.name}</strong>
            <span>{author.role}</span>
          </div>
        </div>
        {/* Utilizar sempre o CamelCase no React */}
        <time title={publishedAtFormatted} dateTime={publishedAt.toISOString()}>
          {publishedDateRelativeToNow}
        </time>
      </header>
      <div className={styles.content}>
        {content.map((line) => {
          if (line.type === "paragraph") {
            return <p key={line.content}>{line.content}</p>;
          } else if (line.type === "link") {
            return (
              <p key={line.content}>
                <a href="#">{line.content}</a>
              </p>
            );
          }
        })}
      </div>

      <form onSubmit={handleCreateNewComment} className={styles.commentForm}>
        <strong>Deixe seu feedback</strong>
        <textarea
          name="comment"
          placeholder="Deixe um comentário"
          onChange={handleNewCommentChange}
          value={newCommentText}
          onInvalid={handleNewCommentInvalid}
          required
        />
        <footer>
          <button type="submit" disabled={newCommentText.length === 0}>
            Publicar
          </button>
        </footer>
      </form>
      <div className={styles.commentList}>
        {comments.map((comment) => {
          return (
            <Comment
              onDeleteComment={deleteComment}
              key={comment}
              content={comment}
            />
          );
        })}
      </div>
    </article>
  );
}
