import type { Meta, StoryObj } from '@storybook/vue3-vite'
import IncidentList from './IncidentList.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { seedIncidents } from '@/data/seedIncidents'
import type { Incident, IncidentStatus, IncidentType } from '@/types/incident'

// IncidentList reads its data from the incidents Pinia store rather than props,
// so args here seed that store on render instead of binding to real component props.
interface IncidentListArgs {
  incidents: Incident[]
  statusFilter: IncidentStatus | 'ALL'
  typeFilter: IncidentType | 'ALL'
  selectedIncidentId: string | null
}

const meta: Meta<IncidentListArgs> = {
  title: 'components/IncidentList',
  tags: ['autodocs'],
  args: {
    incidents: seedIncidents,
    statusFilter: 'ALL',
    typeFilter: 'ALL',
    selectedIncidentId: null,
  },
  argTypes: {
    incidents: { table: { disable: true } },
  },
  render: (args) => ({
    components: { IncidentList },
    setup() {
      const store = useIncidentsStore()
      store.incidents = args.incidents.map((incident) => ({ ...incident }))
      store.statusFilter = args.statusFilter
      store.typeFilter = args.typeFilter
      store.selectedIncidentId = args.selectedIncidentId
      return {}
    },
    template:
      '<div style="max-width: 22rem; height: 28rem; display: flex; flex-direction: column;"><IncidentList /></div>',
  }),
}

export default meta
type Story = StoryObj<IncidentListArgs>

export const Default: Story = {}

export const WithSelection: Story = {
  args: { selectedIncidentId: seedIncidents[1]!.id },
}

export const NoMatchesForFilter: Story = {
  args: { statusFilter: 'RESOLVED', typeFilter: 'SAFETY_ISSUE' },
}

export const Empty: Story = {
  args: { incidents: [] },
}
