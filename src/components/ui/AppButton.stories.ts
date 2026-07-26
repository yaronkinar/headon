import type { Meta, StoryObj } from '@storybook/vue3-vite'
import AppButton from './AppButton.vue'

const meta = {
  title: 'ui/AppButton',
  component: AppButton,
  tags: ['autodocs'],
  argTypes: {
    variant: { control: 'select', options: ['primary', 'secondary', 'danger'] },
    icon: { control: 'text', description: 'primeicons class suffix, e.g. "pi-plus"' },
    disabled: { control: 'boolean' },
    default: { control: 'text', description: 'Button label (default slot)' },
  },
  args: {
    variant: 'primary',
    disabled: false,
    default: 'Save',
  },
} satisfies Meta<typeof AppButton>

export default meta
type Story = StoryObj<typeof meta>

export const Primary: Story = {
  args: { variant: 'primary' },
}

export const Secondary: Story = {
  args: { variant: 'secondary', default: 'Cancel' },
}

export const Danger: Story = {
  args: { variant: 'danger', icon: 'pi-trash', default: 'Delete' },
}

export const WithIcon: Story = {
  args: { variant: 'primary', icon: 'pi-plus', default: 'New Incident' },
}

export const Disabled: Story = {
  args: { variant: 'primary', disabled: true },
}
