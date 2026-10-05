import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { EventCardUI } from "@components/eventCard/ui/eventCard";
import guitarImage from "./assets/eventCard/гитарист с электрогитарой.jpg";

const meta = {
  title: "components/eventCard",
  component: EventCardUI,
  tags: ["autodocs"],
  parameters: {
    layout: "centered",
  },
} satisfies Meta<typeof EventCardUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const Default: Story = {
  args: {
    title: "АКЦИЯ НЕДЕЛИ",
    subtitle: "ДВА часа репетиций по цене ОДНОГО по будням",
    description: "Смотри подборку репбаз, участвующих в акции в твоем городе",
    image: guitarImage,
    onClick: () => {},
  },
};
