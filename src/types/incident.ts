export type IncidentType =
  | 'POWER_OUTAGE'
  | 'ROAD_BLOCKAGE'
  | 'INFRASTRUCTURE_DAMAGE'
  | 'SAFETY_ISSUE'

export type IncidentStatus = 'OPEN' | 'IN_PROGRESS' | 'RESOLVED'

export interface Incident {
  id: string
  title: string
  type: IncidentType
  status: IncidentStatus
  latitude: number
  longitude: number
  createdAt: string
}

export interface IncidentDraft {
  title: string
  type: IncidentType
  status: IncidentStatus
}

export interface LatLng {
  lat: number
  lng: number
}

export const INCIDENT_TYPE_VALUES: IncidentType[] = [
  'POWER_OUTAGE',
  'ROAD_BLOCKAGE',
  'INFRASTRUCTURE_DAMAGE',
  'SAFETY_ISSUE',
]

export const INCIDENT_STATUS_VALUES: IncidentStatus[] = ['OPEN', 'IN_PROGRESS', 'RESOLVED']

export const INCIDENT_STATUS_SEVERITY: Record<IncidentStatus, 'danger' | 'warn' | 'success'> = {
  OPEN: 'danger',
  IN_PROGRESS: 'warn',
  RESOLVED: 'success',
}
