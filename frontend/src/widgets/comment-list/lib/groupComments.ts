import { TComment } from "@utils/types";
import { TCommentCardProps, TCommentsCategory } from "../type";

export const ALL_COMMENTS_CATEGORY = "Все";

export const groupCommentsByRoom = (
  comments: TComment[],
): TCommentsCategory[] => {
  const commentCards: TCommentCardProps[] = comments.map((comment) => ({
    comment,
  }));
  const categoryMap = new Map<string, TCommentCardProps[]>();

  categoryMap.set(ALL_COMMENTS_CATEGORY, commentCards);
  commentCards.forEach((card) => {
    const categoryComments = categoryMap.get(card.comment.room) ?? [];
    categoryComments.push(card);
    categoryMap.set(card.comment.room, categoryComments);
  });

  return Array.from(categoryMap, ([name, categoryComments]) => ({
    name,
    comments: categoryComments,
  }));
};
