import { computed, ref, watch } from 'vue'
import { defineStore } from 'pinia'
import type { Incident, IncidentDraft, IncidentStatus, IncidentType, LatLng } from '@/types/incident'
import { seedIncidents } from '@/data/seedIncidents'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { ALL_OPTION_VALUE } from '@/constants/filterConstants'

export const STORAGE_KEY = 'incidents'

function loadInitialIncidents(): Incident[] {
  const raw = localStorage.getItem(STORAGE_KEY)
  if (!raw) return structuredClone(seedIncidents)
  try {
    const parsed = JSON.parse(raw)
    if (Array.isArray(parsed)) return parsed as Incident[]
  } catch {
    // fall through to seed data on parse failure
  }
  return structuredClone(seedIncidents)
}

export const useIncidentsStore = defineStore('incidents', () => {
  const incidents = ref<Incident[]>(loadInitialIncidents())
  const selectedIncidentId = ref<string | null>(null)
  const statusFilter = ref<IncidentStatus | 'ALL'>(ALL_OPTION_VALUE)
  const typeFilter = ref<IncidentType | 'ALL'>(ALL_OPTION_VALUE)

  watch(
    incidents,
    (value) => {
      localStorage.setItem(STORAGE_KEY, JSON.stringify(value))
    },
    { deep: true },
  )

  const filteredIncidents = computed(() =>
    incidents.value.filter(
      (incident) =>
        (statusFilter.value === ALL_OPTION_VALUE || incident.status === statusFilter.value) &&
        (typeFilter.value === ALL_OPTION_VALUE || incident.type === typeFilter.value),
    ),
  )

  const selectedIncident = computed(
    () => incidents.value.find((incident) => incident.id === selectedIncidentId.value) ?? null,
  )

  function selectIncident(id: string | null) {
    selectedIncidentId.value = id
  }

  function createIncident(draft: IncidentDraft, location: LatLng) {
    const incident: Incident = {
      id: crypto.randomUUID(),
      title: draft.title,
      type: draft.type,
      status: draft.status,
      latitude: location.lat,
      longitude: location.lng,
      createdAt: new Date().toISOString(),
    }
    incidents.value.push(incident)
    selectIncident(incident.id)
  }

  function updateIncident(id: string, draft: IncidentDraft, location: LatLng) {
    const index = incidents.value.findIndex((item) => item.id === id)
    const existing = incidents.value[index]
    if (!existing) return
    incidents.value[index] = {
      ...existing,
      title: draft.title,
      type: draft.type,
      status: draft.status,
      latitude: location.lat,
      longitude: location.lng,
    }
  }

  function deleteIncident(id: string) {
    incidents.value = incidents.value.filter((item) => item.id !== id)
    if (selectedIncidentId.value === id) selectedIncidentId.value = null
  }

  function resetToSeedData() {
    incidents.value = structuredClone(seedIncidents)
    selectedIncidentId.value = null
    useIncidentFormStore().closeForm()
  }

  return {
    incidents,
    selectedIncidentId,
    statusFilter,
    typeFilter,
    filteredIncidents,
    selectedIncident,
    selectIncident,
    createIncident,
    updateIncident,
    deleteIncident,
    resetToSeedData,
  }
})
