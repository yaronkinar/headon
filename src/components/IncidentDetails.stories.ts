import type { Meta, StoryObj } from '@storybook/vue3-vite'
import ConfirmDialog from 'primevue/confirmdialog'
import IncidentDetails from './IncidentDetails.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { seedIncidents } from '@/data/seedIncidents'

// IncidentDetails reads the selected incident from the incidents Pinia store rather
// than props, so args here seed that store on render instead of binding to real props.
// ConfirmDialog is mounted alongside it so the delete button's confirmation works.
interface IncidentDetailsArgs {
  selectedIncidentId: string | null
}

const meta: Meta<IncidentDetailsArgs> = {
  title: 'components/IncidentDetails',
  tags: ['autodocs'],
  args: {
    selectedIncidentId: seedIncidents[0]!.id,
  },
  render: (args) => ({
    components: { IncidentDetails, ConfirmDialog },
    setup() {
      const store = useIncidentsStore()
      store.incidents = structuredClone(seedIncidents)
      store.selectedIncidentId = args.selectedIncidentId
      return {}
    },
    template: '<div style="max-width: 24rem"><IncidentDetails /><ConfirmDialog /></div>',
  }),
}

export default meta
type Story = StoryObj<IncidentDetailsArgs>

export const Selected: Story = {}

export const NoSelection: Story = {
  args: { selectedIncidentId: null },
}
