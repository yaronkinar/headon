import { beforeEach, describe, expect, it } from 'vitest'
import { nextTick } from 'vue'
import { createPinia, setActivePinia } from 'pinia'
import { STORAGE_KEY, useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { seedIncidents } from '@/data/seedIncidents'

const LOCATION = { lat: 32.1, lng: 34.8 }

describe('useIncidentsStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('loads the seed incidents when localStorage is empty', () => {
    const store = useIncidentsStore()
    expect(store.incidents).toEqual(seedIncidents)
  })

  it('loads incidents from localStorage when present', () => {
    const stored = [seedIncidents[0]]
    localStorage.setItem(STORAGE_KEY, JSON.stringify(stored))

    const store = useIncidentsStore()

    expect(store.incidents).toEqual(stored)
  })

  it('falls back to seed data when localStorage holds invalid JSON', () => {
    localStorage.setItem(STORAGE_KEY, '{not json')

    const store = useIncidentsStore()

    expect(store.incidents).toEqual(seedIncidents)
  })

  it('persists incidents to localStorage on mutation', async () => {
    const store = useIncidentsStore()

    store.createIncident({ title: 'Persisted', type: 'SAFETY_ISSUE', status: 'OPEN' }, LOCATION)
    await nextTick()

    const stored = JSON.parse(localStorage.getItem(STORAGE_KEY) ?? '[]')
    expect(stored).toHaveLength(seedIncidents.length + 1)
  })

  describe('filteredIncidents', () => {
    it('returns everything when both filters are ALL', () => {
      const store = useIncidentsStore()
      expect(store.filteredIncidents).toHaveLength(seedIncidents.length)
    })

    it('filters by status', () => {
      const store = useIncidentsStore()
      store.statusFilter = 'RESOLVED'
      expect(store.filteredIncidents).toEqual(
        seedIncidents.filter((incident) => incident.status === 'RESOLVED'),
      )
    })

    it('filters by type', () => {
      const store = useIncidentsStore()
      store.typeFilter = 'ROAD_BLOCKAGE'
      expect(store.filteredIncidents).toEqual(
        seedIncidents.filter((incident) => incident.type === 'ROAD_BLOCKAGE'),
      )
    })

    it('combines status and type filters', () => {
      const store = useIncidentsStore()
      store.statusFilter = 'OPEN'
      store.typeFilter = 'ROAD_BLOCKAGE'
      expect(store.filteredIncidents).toEqual([])
    })
  })

  describe('selection', () => {
    it('selectedIncident is null until something is selected', () => {
      const store = useIncidentsStore()
      expect(store.selectedIncident).toBeNull()
    })

    it('selectIncident sets selectedIncident to the matching incident', () => {
      const store = useIncidentsStore()
      store.selectIncident(seedIncidents[0]!.id)
      expect(store.selectedIncident).toEqual(seedIncidents[0])
    })
  })

  describe('createIncident', () => {
    it('adds an incident at the given location and selects it', () => {
      const store = useIncidentsStore()

      store.createIncident({ title: 'New fire', type: 'SAFETY_ISSUE', status: 'OPEN' }, LOCATION)

      expect(store.incidents).toHaveLength(seedIncidents.length + 1)
      const created = store.incidents.at(-1)!
      expect(created).toMatchObject({
        title: 'New fire',
        type: 'SAFETY_ISSUE',
        status: 'OPEN',
        latitude: LOCATION.lat,
        longitude: LOCATION.lng,
      })
      expect(store.selectedIncidentId).toBe(created.id)
    })
  })

  describe('updateIncident', () => {
    it('updates title, type, status, and location for an existing incident', () => {
      const store = useIncidentsStore()
      const target = seedIncidents[0]!

      store.updateIncident(
        target.id,
        { title: 'Updated title', type: 'INFRASTRUCTURE_DAMAGE', status: 'RESOLVED' },
        LOCATION,
      )

      const updated = store.incidents.find((incident) => incident.id === target.id)
      expect(updated).toMatchObject({
        title: 'Updated title',
        type: 'INFRASTRUCTURE_DAMAGE',
        status: 'RESOLVED',
        latitude: LOCATION.lat,
        longitude: LOCATION.lng,
      })
      expect(updated?.createdAt).toBe(target.createdAt)
    })

    it('does nothing when the incident id does not exist', () => {
      const store = useIncidentsStore()

      store.updateIncident(
        'missing-id',
        { title: 'Nope', type: 'SAFETY_ISSUE', status: 'OPEN' },
        LOCATION,
      )

      expect(store.incidents).toEqual(seedIncidents)
    })
  })

  describe('deleteIncident', () => {
    it('removes the incident from the list', () => {
      const store = useIncidentsStore()
      const target = seedIncidents[0]!

      store.deleteIncident(target.id)

      expect(store.incidents.find((incident) => incident.id === target.id)).toBeUndefined()
    })

    it('clears the selection when the deleted incident was selected', () => {
      const store = useIncidentsStore()
      const target = seedIncidents[0]!
      store.selectIncident(target.id)

      store.deleteIncident(target.id)

      expect(store.selectedIncidentId).toBeNull()
    })

    it('leaves the selection untouched when a different incident is deleted', () => {
      const store = useIncidentsStore()
      const selected = seedIncidents[0]!
      const other = seedIncidents[1]!
      store.selectIncident(selected.id)

      store.deleteIncident(other.id)

      expect(store.selectedIncidentId).toBe(selected.id)
    })
  })

  describe('resetToSeedData', () => {
    it('restores the seed incidents, clears selection, and closes the form', () => {
      const store = useIncidentsStore()
      const formStore = useIncidentFormStore()
      store.createIncident({ title: 'Temp', type: 'SAFETY_ISSUE', status: 'OPEN' }, LOCATION)
      store.selectIncident(store.incidents.at(-1)!.id)
      formStore.openCreateForm()

      store.resetToSeedData()

      expect(store.incidents).toEqual(seedIncidents)
      expect(store.selectedIncidentId).toBeNull()
      expect(formStore.isFormOpen).toBe(false)
    })
  })
})
