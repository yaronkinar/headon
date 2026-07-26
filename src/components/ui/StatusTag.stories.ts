import type { Meta, StoryObj } from '@storybook/vue3-vite'
import StatusTag from './StatusTag.vue'

const meta = {
  title: 'ui/StatusTag',
  component: StatusTag,
  tags: ['autodocs'],
} satisfies Meta<typeof StatusTag>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: { status: 'OPEN' },
}

export const InProgress: Story = {
  args: { status: 'IN_PROGRESS' },
}

export const Resolved: Story = {
  args: { status: 'RESOLVED' },
}
