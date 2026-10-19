import { FC, useMemo } from "react";
import { selectBaseDetails } from "@services/bases/slice";
import { useSelector } from "@services/store";
import { groupCommentsByRoom } from "./lib";
import { CommentListUI } from "./ui";

export const CommentList: FC = () => {
  const baseDetails = useSelector(selectBaseDetails);
  const comments = baseDetails?.comments;

  const categories = useMemo(
    () => groupCommentsByRoom(comments ?? []),
    [comments],
  );

  return <CommentListUI categories={categories} />;
};
