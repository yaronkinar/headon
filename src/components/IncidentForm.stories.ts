import type { Meta, StoryObj } from '@storybook/vue3-vite'
import IncidentForm from './IncidentForm.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { seedIncidents } from '@/data/seedIncidents'
import type { LatLng } from '@/types/incident'

// IncidentForm reads its editing state from the incidents and incidentForm Pinia
// stores rather than props, so args here seed those stores on render instead of
// binding to real component props.
interface IncidentFormArgs {
  formMode: 'create' | 'edit'
  pendingLocation: LatLng | null
  selectedIncidentId: string | null
}

const meta: Meta<IncidentFormArgs> = {
  title: 'components/IncidentForm',
  tags: ['autodocs'],
  args: {
    formMode: 'create',
    pendingLocation: null,
    selectedIncidentId: null,
  },
  render: (args) => ({
    components: { IncidentForm },
    setup() {
      const store = useIncidentsStore()
      const formStore = useIncidentFormStore()
      store.incidents = structuredClone(seedIncidents)
      store.selectedIncidentId = args.selectedIncidentId
      formStore.formMode = args.formMode
      formStore.pendingLocation = args.pendingLocation
      formStore.isFormOpen = true
      return {}
    },
    template: '<div style="max-width: 24rem"><IncidentForm /></div>',
  }),
}

export default meta
type Story = StoryObj<IncidentFormArgs>

export const NewIncidentAwaitingLocation: Story = {}

export const NewIncidentWithLocation: Story = {
  args: { pendingLocation: { lat: 32.0853, lng: 34.7818 } },
}

export const EditIncident: Story = {
  args: {
    formMode: 'edit',
    selectedIncidentId: seedIncidents[0]!.id,
    pendingLocation: { lat: seedIncidents[0]!.latitude, lng: seedIncidents[0]!.longitude },
  },
}
