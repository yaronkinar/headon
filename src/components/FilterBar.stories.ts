import type { Meta, StoryObj } from '@storybook/vue3-vite'
import FilterBar from './FilterBar.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { seedIncidents } from '@/data/seedIncidents'
import type { IncidentStatus, IncidentType } from '@/types/incident'

// FilterBar reads and writes its filters directly on the incidents Pinia store,
// so args here seed that store on render instead of binding to real component props.
interface FilterBarArgs {
  statusFilter: IncidentStatus | 'ALL'
  typeFilter: IncidentType | 'ALL'
}

const meta: Meta<FilterBarArgs> = {
  title: 'components/FilterBar',
  tags: ['autodocs'],
  args: {
    statusFilter: 'ALL',
    typeFilter: 'ALL',
  },
  render: (args) => ({
    components: { FilterBar },
    setup() {
      const store = useIncidentsStore()
      store.incidents = structuredClone(seedIncidents)
      store.statusFilter = args.statusFilter
      store.typeFilter = args.typeFilter
      return {}
    },
    template: '<div style="max-width: 24rem"><FilterBar /></div>',
  }),
}

export default meta
type Story = StoryObj<FilterBarArgs>

export const Default: Story = {}

export const StatusAndTypeSelected: Story = {
  args: { statusFilter: 'IN_PROGRESS', typeFilter: 'ROAD_BLOCKAGE' },
}
