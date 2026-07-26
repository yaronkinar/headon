import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FormField from './FormField.vue'
import AppSelect from './AppSelect.vue'

const meta = {
  title: 'ui/FormField',
  component: FormField,
  tags: ['autodocs'],
  args: {
    label: 'Title',
    inputId: 'title',
  },
  render: (args) => ({
    components: { FormField },
    setup: () => ({ args }),
    template: `
      <FormField :label="args.label" :input-id="args.inputId">
        <input
          :id="args.inputId"
          type="text"
          placeholder="Incident title"
          style="width: 100%; padding: 0.55rem 0.75rem; border: 1px solid var(--hairline-strong); border-radius: var(--radius); font-family: var(--font-body); font-size: 0.85rem;"
        />
      </FormField>
    `,
  }),
} satisfies Meta<typeof FormField>

export default meta
type Story = StoryObj<typeof meta>

export const TextInput: Story = {}

export const WithSelect: Story = {
  args: { label: 'Type', inputId: 'type' },
  render: (args) => ({
    components: { FormField, AppSelect },
    setup: () => ({
      args,
      value: 'POWER_OUTAGE',
      options: [
        { value: 'POWER_OUTAGE', label: 'Power Outage' },
        { value: 'ROAD_BLOCKAGE', label: 'Road Blockage' },
      ],
    }),
    template: `
      <FormField :label="args.label" :input-id="args.inputId">
        <AppSelect :id="args.inputId" v-model="value" :options="options" />
      </FormField>
    `,
  }),
}
