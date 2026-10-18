import { FC } from "react";

import { selectBaseDetails } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { TComment } from "@utils/types";
import { CommentsUI } from "./ui/comments";
import {
  TCommentCardProps,
  TCommentsCategory,
} from "./type";

export const Comments: FC = () => {
  const baseDetails = useSelector(selectBaseDetails);      

  const comments = (baseDetails?.comments ?? []);

  const commentCards: TCommentCardProps[] =
  comments.map((comment: TComment): TCommentCardProps => {
    return { comment };
  })

  const categoryMap = new Map<string, TCommentCardProps[]>();

  categoryMap.set("Все", commentCards);
  commentCards.forEach(({comment, ...cardProps}) => {
  const categoryComments = categoryMap.get(comment.room) ?? [];
  categoryComments.push({comment, ...cardProps }); 
  categoryMap.set(comment.room, categoryComments);
});  

  


  const categories: TCommentsCategory[] = Array.from(
      categoryMap,
      ([name, categoryComments]) => ({
        name,
        comments: categoryComments,
      }),
    );

  return <CommentsUI categories={categories} />;
}