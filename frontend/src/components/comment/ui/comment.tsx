import { FC } from "react";
import starIcon from "@assets/images/icons/star.svg";
import { TComment } from "@utils/types";
import styles from "./comment.module.css";

type TCommentUIProps = {
  comment: TComment;
};

const formatDate = (date: string) => {
  const [year, month, day] = date.split("-");
  return `${day}.${month}.${year.slice(-2)}`;
};

export const CommentUI: FC<TCommentUIProps> = ({ comment }) => {
  const authorName = comment.author?.login || "Музыкант";
  const authorInitial = authorName.charAt(0).toLocaleUpperCase("ru-RU");
  const formattedDate = formatDate(comment.date);

  return (
    <article
      className={styles.card}
      aria-label={`Отзыв пользователя ${authorName}`}
    >
      <header className={styles.header}>
        <div
          className={styles.score}
          aria-label={`Оценка ${comment.scores.toFixed(1).replace(".", ",")} из 5`}
        >
          <span className={styles.scoreValue}>
            {comment.scores.toFixed(1).replace(".", ",")}
          </span>
          <img src={starIcon} alt="" className={styles.starIcon} />
        </div>
        <time className={styles.date} dateTime={comment.date}>
          {formattedDate}
        </time>
      </header>

      <div className={styles.author}>
        {comment.author?.avatar ? (
          <img className={styles.avatar} src={comment.author.avatar} alt="" />
        ) : (
          <span className={styles.avatarFallback} aria-hidden="true">
            {authorInitial}
          </span>
        )}
        <span className={styles.authorName}>{authorName}</span>
      </div>

      <p className={styles.room}>Комната: {comment.room}</p>
      <p className={styles.text}>{comment.comment}</p>
    </article>
  );
};
