import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import type { IncidentStatus, IncidentType } from '@/types/incident'
import { INCIDENT_STATUS_VALUES, INCIDENT_TYPE_VALUES } from '@/types/incident'

export function useIncidentLabels() {
  const { t } = useI18n({ useScope: 'global' })

  function typeLabel(type: IncidentType) {
    return t(`incidentTypes.${type}`)
  }

  function statusLabel(status: IncidentStatus) {
    return t(`incidentStatuses.${status}`)
  }

  const typeOptions = computed(() =>
    INCIDENT_TYPE_VALUES.map((value) => ({ value, label: typeLabel(value) })),
  )

  const statusOptions = computed(() =>
    INCIDENT_STATUS_VALUES.map((value) => ({ value, label: statusLabel(value) })),
  )

  return { typeLabel, statusLabel, typeOptions, statusOptions }
}
