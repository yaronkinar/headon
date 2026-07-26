import { ref } from 'vue'
import { defineStore } from 'pinia'
import { useIncidentsStore } from '@/stores/incidents'
import type { LatLng } from '@/types/incident'

export const FORM_MODE = {
  CREATE: 'create',
  EDIT: 'edit',
} as const

export type FormMode = (typeof FORM_MODE)[keyof typeof FORM_MODE]

export const useIncidentFormStore = defineStore('incidentForm', () => {
  const isFormOpen = ref(false)
  const formMode = ref<FormMode>(FORM_MODE.CREATE)
  const pendingLocation = ref<LatLng | null>(null)

  function openCreateForm() {
    useIncidentsStore().selectIncident(null)
    formMode.value = FORM_MODE.CREATE
    pendingLocation.value = null
    isFormOpen.value = true
  }

  function openEditForm(id: string) {
    const incidentsStore = useIncidentsStore()
    const incident = incidentsStore.incidents.find((item) => item.id === id)
    if (!incident) return
    formMode.value = FORM_MODE.EDIT
    incidentsStore.selectIncident(id)
    pendingLocation.value = { lat: incident.latitude, lng: incident.longitude }
    isFormOpen.value = true
  }

  function closeForm() {
    isFormOpen.value = false
    pendingLocation.value = null
  }

  function setPendingLocation(lat: number, lng: number) {
    pendingLocation.value = { lat, lng }
  }

  return {
    isFormOpen,
    formMode,
    pendingLocation,
    openCreateForm,
    openEditForm,
    closeForm,
    setPendingLocation,
  }
})
