import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { CommentListUI } from "@widgets/comment-list";
import { storyComments } from "../../fixtures/comments";

const categories = [
  {
    name: "Все",
    comments: storyComments.map((comment) => ({ comment })),
  },
  ...Array.from(new Set(storyComments.map((comment) => comment.room))).map(
    (name) => ({
      name,
      comments: storyComments
        .filter((comment) => comment.room === name)
        .map((comment) => ({ comment })),
    }),
  ),
];

const meta = {
  title: "Widgets/CommentList",
  component: CommentListUI,
  tags: ["autodocs"],
  args: {
    categories,
  },
} satisfies Meta<typeof CommentListUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const GroupedByRoom: Story = {};

export const NoComments: Story = {
  args: {
    categories: [{ name: "Все", comments: [] }],
  },
};
