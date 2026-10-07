import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { Comment } from "../components/comment";
import { TComment } from "@utils/types";
import guitaristAvatar from "./assets/profile/guitarist.jpg";

const comment: TComment = {
  _id: "review-1",
  artistid: "artist-1",
  author: {
    login: "Багровый фантомас",
  },
  room: "Green",
  scores: 5,
  date: "2026-09-05",
  comment:
    "Оборудование свежее, видно только открылись. Персонал приятный, работают чётко",
};

const meta = {
  title: "components/Comment",
  component: Comment,
  tags: ["autodocs"],
  args: {
    comment,
  },
} satisfies Meta<typeof Comment>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithoutAvatar: Story = {
  args: {
    comment,
  },
};

export const WithAvatar: Story = {
  args: {
    comment: {
      ...comment,
      author: {
        login: "Багровый фантомас",
        avatar: guitaristAvatar,
      },
    },
  },
};
