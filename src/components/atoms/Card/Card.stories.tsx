import { Meta, StoryObj } from '@storybook/react-webpack5';
import { Card } from './Card.component';

const meta: Meta<typeof Card> = {
  title: 'Atoms/Card',
  component: Card,
  tags: ['autodocs'],
  parameters: {
    layout: 'centered',
  },
};

export default meta;
type Story = StoryObj<typeof Card>;

export const Default: Story = {
  args: {
    title: 'Casino Game',
    studio: 'Game Studio',
    thumbnail: '/casino.png', // Using the image from public folder
    rating: 4.5,
  },
};

export const LongTitle: Story = {
  args: {
    title:
      'This is a very long title that should be truncated when displayed in the card',
    studio: 'Game Studio',
    thumbnail: '/casino.png',
    rating: 3,
  },
};

export const LowRating: Story = {
  args: {
    title: 'Low-Rated Game',
    studio: 'Game Studio',
    thumbnail: '/casino.png',
    rating: 2,
  },
};
