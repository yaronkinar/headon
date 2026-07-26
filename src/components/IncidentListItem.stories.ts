import type { Meta, StoryObj } from '@storybook/vue3-vite'
import { fn } from 'storybook/test'
import IncidentListItem from './IncidentListItem.vue'
import { seedIncidents } from '@/data/seedIncidents'

const meta = {
  title: 'components/IncidentListItem',
  component: IncidentListItem,
  tags: ['autodocs'],
  args: {
    incident: seedIncidents[0],
    isSelected: false,
    onSelect: fn(),
  },
  render: (args) => ({
    components: { IncidentListItem },
    setup: () => ({ args }),
    template: '<div style="max-width: 22rem"><IncidentListItem v-bind="args" /></div>',
  }),
} satisfies Meta<typeof IncidentListItem>

export default meta
type Story = StoryObj<typeof meta>

export const Open: Story = {
  args: { incident: seedIncidents[0] },
}

export const InProgress: Story = {
  args: { incident: seedIncidents[1] },
}

export const Resolved: Story = {
  args: { incident: seedIncidents[2] },
}

export const Selected: Story = {
  args: { incident: seedIncidents[0], isSelected: true },
}
