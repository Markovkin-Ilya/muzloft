import type { Meta, StoryObj } from "@storybook/react-webpack5";
import { BaseListUI } from "@widgets/base-list";
import { storyBases } from "../../fixtures/bases";

const meta = {
  title: "Widgets/BaseList",
  component: BaseListUI,
  tags: ["autodocs"],
  args: {
    bases: storyBases.map(({ _id, title, image, address, rating }) => ({
      _id,
      title,
      image,
      address,
      rating,
    })),
    searchValue: "",
    onSearchChange: () => {},
    onBaseSelect: () => {},
  },
} satisfies Meta<typeof BaseListUI>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithBases: Story = {};

export const SearchResults: Story = {
  args: {
    searchValue: "grunge",
    bases: storyBases
      .slice(0, 1)
      .map(({ _id, title, image, address, rating }) => ({
        _id,
        title,
        image,
        address,
        rating,
      })),
  },
};

export const EmptyResults: Story = {
  args: {
    searchValue: "Неизвестная база",
    bases: [],
  },
};
