import { FC, useState } from "react";
import { Comment } from "@components/base/comment";
import { Menu, TMenuItem } from "@components/shared/menu";
import styles from "./comments.module.css";
import { TCommentsUIProps } from "./type";

export const CommentsUI: FC<TCommentsUIProps> = ({ categories }) => {
  const [activeCategoryIndex, setActiveCategoryIndex] = useState(0);
  const activeIndex = Math.min(
    activeCategoryIndex,
    Math.max(categories.length - 1, 0),
  );
  const activeCategory = categories[activeIndex];
  const menuItems: TMenuItem[] = categories.map(({ name }) => ({
    label: name,
    to: name,
  }));

  if (categories.length === 1) {
    return (
        <p className={styles.message}>Нет комментариев</p>
    );
  }

  return (
    <section className={styles.comments} aria-label="Комментарии">
      {menuItems.length > 0 && (
        <Menu
          items={menuItems}
          activeIndex={activeIndex}
          onSelect={setActiveCategoryIndex}
        />
      )}
      <div className={styles.list}>
        {activeCategory?.comments.map((commentProps) =>
            <Comment
              key={commentProps.comment._id}
              comment={commentProps.comment}
            />
        )}
      </div>
    </section>
  );
};