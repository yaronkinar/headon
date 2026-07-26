import type { Meta, StoryObj } from '@storybook/vue3-vite'
import EmptyState from './EmptyState.vue'

const meta = {
  title: 'ui/EmptyState',
  component: EmptyState,
  tags: ['autodocs'],
  args: {
    default: 'No incidents match the current filters.',
  },
} satisfies Meta<typeof EmptyState>

export default meta
type Story = StoryObj<typeof meta>

export const MessageOnly: Story = {}

export const WithEyebrow: Story = {
  args: {
    eyebrow: 'Incident Record',
    default: 'Select an incident from the list or map to view its details.',
  },
}
