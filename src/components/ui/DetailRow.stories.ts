import type { Meta, StoryObj } from '@storybook/vue3-vite'
import DetailRow from './DetailRow.vue'
import StatusTag from './StatusTag.vue'

const meta = {
  title: 'ui/DetailRow',
  component: DetailRow,
  tags: ['autodocs'],
  args: {
    label: 'Type',
    default: 'Power Outage',
  },
  decorators: [
    (story) => ({
      components: { story },
      template:
        '<dl style="display:grid;grid-template-columns:auto 1fr;gap:0.5rem 1rem;max-width:20rem;"><story /></dl>',
    }),
  ],
} satisfies Meta<typeof DetailRow>

export default meta
type Story = StoryObj<typeof meta>

export const TextValue: Story = {}

export const WithStatusTag: Story = {
  args: { label: 'Status' },
  render: (args) => ({
    components: { DetailRow, StatusTag },
    setup: () => ({ args }),
    template: `<DetailRow :label="args.label"><StatusTag status="RESOLVED" /></DetailRow>`,
  }),
}
