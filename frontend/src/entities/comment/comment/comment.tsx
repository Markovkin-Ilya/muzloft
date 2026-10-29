import { FC } from "react";
import { TComment } from "@utils/types";
import { CommentUI } from "./ui/comment";

export type TCommentProps = {
  comment: TComment;
};

export const Comment: FC<TCommentProps> = ({ comment }) => (
  <CommentUI comment={comment} />
);
