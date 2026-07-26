import { beforeEach, describe, expect, it } from 'vitest'
import { createPinia, setActivePinia } from 'pinia'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { useIncidentsStore } from '@/stores/incidents'
import { seedIncidents } from '@/data/seedIncidents'

describe('useIncidentFormStore', () => {
  beforeEach(() => {
    localStorage.clear()
    setActivePinia(createPinia())
  })

  it('starts closed with no pending location', () => {
    const formStore = useIncidentFormStore()

    expect(formStore.isFormOpen).toBe(false)
    expect(formStore.formMode).toBe('create')
    expect(formStore.pendingLocation).toBeNull()
  })

  describe('openCreateForm', () => {
    it('opens the form in create mode with no pending location', () => {
      const formStore = useIncidentFormStore()
      formStore.setPendingLocation(1, 2)

      formStore.openCreateForm()

      expect(formStore.isFormOpen).toBe(true)
      expect(formStore.formMode).toBe('create')
      expect(formStore.pendingLocation).toBeNull()
    })
  })

  describe('openEditForm', () => {
    it('opens the form in edit mode, seeded with the incident location, and selects it', () => {
      const formStore = useIncidentFormStore()
      const incidentsStore = useIncidentsStore()
      const target = seedIncidents[0]!

      formStore.openEditForm(target.id)

      expect(formStore.isFormOpen).toBe(true)
      expect(formStore.formMode).toBe('edit')
      expect(formStore.pendingLocation).toEqual({ lat: target.latitude, lng: target.longitude })
      expect(incidentsStore.selectedIncidentId).toBe(target.id)
    })

    it('does nothing when the incident id does not exist', () => {
      const formStore = useIncidentFormStore()

      formStore.openEditForm('missing-id')

      expect(formStore.isFormOpen).toBe(false)
    })
  })

  describe('closeForm', () => {
    it('closes the form and clears the pending location', () => {
      const formStore = useIncidentFormStore()
      formStore.openCreateForm()
      formStore.setPendingLocation(1, 2)

      formStore.closeForm()

      expect(formStore.isFormOpen).toBe(false)
      expect(formStore.pendingLocation).toBeNull()
    })
  })

  describe('setPendingLocation', () => {
    it('sets the pending location', () => {
      const formStore = useIncidentFormStore()

      formStore.setPendingLocation(32.5, 34.9)

      expect(formStore.pendingLocation).toEqual({ lat: 32.5, lng: 34.9 })
    })
  })
})
