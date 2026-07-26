import type { Incident } from '@/types/incident'

export const seedIncidents: Incident[] = [
  {
    id: '1',
    title: 'Power outage near city center',
    type: 'POWER_OUTAGE',
    status: 'OPEN',
    latitude: 32.0853,
    longitude: 34.7818,
    createdAt: '2026-07-15T08:30:00Z',
  },
  {
    id: '2',
    title: 'Blocked road following construction work',
    type: 'ROAD_BLOCKAGE',
    status: 'IN_PROGRESS',
    latitude: 32.095,
    longitude: 34.801,
    createdAt: '2026-07-16T10:15:00Z',
  },
  {
    id: '3',
    title: 'Damaged electrical cabinet',
    type: 'INFRASTRUCTURE_DAMAGE',
    status: 'RESOLVED',
    latitude: 32.071,
    longitude: 34.769,
    createdAt: '2026-07-17T13:45:00Z',
  },
  {
    id: '4',
    title: 'Unsafe cable reported by resident',
    type: 'SAFETY_ISSUE',
    status: 'OPEN',
    latitude: 32.105,
    longitude: 34.79,
    createdAt: '2026-07-18T07:20:00Z',
  },
]
