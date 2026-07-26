import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppSelect from './AppSelect.vue'

// AppSelect is a generic SFC (`generic="T extends string"`), which Storybook's
// Meta<typeof Component> inference can't resolve — args are typed loosely here instead.
interface AppSelectArgs {
  modelValue: string
  options: { value: string; label: string }[]
}

const statusOptions = [
  { value: 'OPEN', label: 'Open' },
  { value: 'IN_PROGRESS', label: 'In Progress' },
  { value: 'RESOLVED', label: 'Resolved' },
]

const meta: Meta<AppSelectArgs> = {
  title: 'ui/AppSelect',
  tags: ['autodocs'],
  args: {
    modelValue: 'OPEN',
    options: statusOptions,
  },
  render: (args) => ({
    components: { AppSelect },
    setup: () => ({ args }),
    template: '<div style="max-width: 12rem"><AppSelect v-bind="args" /></div>',
  }),
}

export default meta
type Story = StoryObj<AppSelectArgs>

export const Default: Story = {}

export const NarrowContainerLongLabels: Story = {
  args: {
    modelValue: 'INFRASTRUCTURE_DAMAGE',
    options: [
      { value: 'ALL', label: 'All Types' },
      { value: 'POWER_OUTAGE', label: 'Power Outage' },
      { value: 'INFRASTRUCTURE_DAMAGE', label: 'Infrastructure Damage' },
    ],
  },
  render: (args) => ({
    components: { AppSelect },
    setup: () => ({ args }),
    template: '<div style="width: 8rem"><AppSelect v-bind="args" /></div>',
  }),
}
