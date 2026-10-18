import { TComment } from "@utils/types";

export type TCommentCardProps = {
    comment: TComment;
}

export type TCommentsCategory = {
    name: string;
    comments: TCommentCardProps[];
}