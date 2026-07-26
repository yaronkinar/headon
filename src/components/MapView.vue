<script setup lang="ts">
import { computed, ref, shallowRef, watch } from 'vue'
import L from 'leaflet'
import { LMap, LTileLayer, LMarker, LPopup } from '@vue-leaflet/vue-leaflet'
import { useI18n } from 'vue-i18n'
import MapClickHint from '@/components/MapClickHint.vue'
import IncidentMapPopup from '@/components/IncidentMapPopup.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { useIncidentLabels } from '@/composables/useIncidentLabels'
import type { Incident, IncidentStatus } from '@/types/incident'

const store = useIncidentsStore()
const formStore = useIncidentFormStore()
const { t } = useI18n({ useScope: 'global' })
const { typeLabel, statusLabel } = useIncidentLabels()

const DEFAULT_CENTER: [number, number] = [32.09, 34.79]
const DEFAULT_ZOOM = 13
const SELECTED_ZOOM = 15

const leafletMap = shallowRef<L.Map | null>(null)
const mapReady = ref(false)

// vue-leaflet's `icon` prop type is narrowed to L.Icon<L.IconOptions>, which doesn't
// structurally include L.DivIcon's options shape — cast is safe, Leaflet accepts any Icon subclass.
const pendingIcon = L.divIcon({
  className: 'pending-marker',
  html: '<div class="pending-marker-dot"></div>',
  iconSize: [18, 18],
}) as unknown as L.Icon<L.IconOptions>

const statusIcons: Record<IncidentStatus, L.Icon<L.IconOptions>> = {
  OPEN: buildStatusIcon('open'),
  IN_PROGRESS: buildStatusIcon('in-progress'),
  RESOLVED: buildStatusIcon('resolved'),
}

const selectedStatusIcons: Record<IncidentStatus, L.Icon<L.IconOptions>> = {
  OPEN: buildStatusIcon('open', true),
  IN_PROGRESS: buildStatusIcon('in-progress', true),
  RESOLVED: buildStatusIcon('resolved', true),
}

function buildStatusIcon(modifier: string, selected = false) {
  if (!selected) {
    return L.divIcon({
      className: 'incident-marker',
      html: `<div class="incident-marker-dot ${modifier}"></div>`,
      iconSize: [16, 16],
    }) as unknown as L.Icon<L.IconOptions>
  }
  return L.divIcon({
    className: 'incident-marker incident-marker--selected',
    html: `<div class="incident-marker-ring"><div class="incident-marker-dot ${modifier}"></div></div>`,
    iconSize: [32, 32],
  }) as unknown as L.Icon<L.IconOptions>
}

function onMapReady(mapInstance: L.Map) {
  leafletMap.value = mapInstance
  mapReady.value = true
}

function onMapClick(event: L.LeafletMouseEvent) {
  if (!formStore.isFormOpen) return
  formStore.setPendingLocation(event.latlng.lat, event.latlng.lng)
}

function onMarkerClick(event: L.LeafletMouseEvent, incidentId: string) {
  if (formStore.isFormOpen) {
    formStore.setPendingLocation(event.latlng.lat, event.latlng.lng)
    return
  }
  store.selectIncident(incidentId)
}

function onMarkerReady(marker: L.Marker, incident: Incident) {
  marker
    .getElement()
    ?.setAttribute(
      'aria-label',
      t('mapView.markerLabel', {
        title: incident.title,
        type: typeLabel(incident.type),
        status: statusLabel(incident.status),
      }),
    )
}

const pendingMarkerPosition = computed<[number, number] | null>(() => {
  if (!formStore.isFormOpen || !formStore.pendingLocation) return null
  return [formStore.pendingLocation.lat, formStore.pendingLocation.lng]
})

const clickHint = computed(() =>
  formStore.pendingLocation ? t('mapView.clickHintUpdate') : t('mapView.clickHint'),
)

watch(
  () => store.selectedIncident,
  (incident) => {
    leafletMap.value?.closePopup()
    if (!incident || !leafletMap.value) return
    leafletMap.value.setView([incident.latitude, incident.longitude], SELECTED_ZOOM, {
      animate: true,
    })
  },
)

watch(
  () => formStore.isFormOpen,
  (isOpen) => {
    if (isOpen) leafletMap.value?.closePopup()
  },
)
</script>

<template>
  <div class="map-view" data-testid="map-view">
    <MapClickHint v-if="formStore.isFormOpen">{{ clickHint }}</MapClickHint>
    <LMap
      :zoom="DEFAULT_ZOOM"
      :center="DEFAULT_CENTER"
      :use-global-leaflet="true"
      @ready="onMapReady"
      @click="onMapClick"
    >
      <LTileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution="&copy; OpenStreetMap contributors"
        layer-type="base"
        name="OpenStreetMap"
      />
      <LMarker
        v-for="incident in store.filteredIncidents"
        :key="incident.id"
        :lat-lng="[incident.latitude, incident.longitude]"
        :icon="
          incident.id === store.selectedIncidentId
            ? selectedStatusIcons[incident.status]
            : statusIcons[incident.status]
        "
        :z-index-offset="incident.id === store.selectedIncidentId ? 1000 : 0"
        @click="onMarkerClick($event, incident.id)"
        @ready="(marker: L.Marker) => onMarkerReady(marker, incident)"
      >
        <LPopup v-if="!formStore.isFormOpen">
          <IncidentMapPopup
            :title="incident.title"
            :type-label="typeLabel(incident.type)"
            :status="incident.status"
          />
        </LPopup>
      </LMarker>
      <LMarker v-if="pendingMarkerPosition" :lat-lng="pendingMarkerPosition" :icon="pendingIcon" />
    </LMap>
  </div>
</template>

<style scoped>
.map-view {
  position: relative;
  flex: 1;
  height: 100%;
}

.map-view :deep(.leaflet-container) {
  height: 100%;
  width: 100%;
  background: var(--paper);
  font-family: var(--font-body);
}

.map-view :deep(.leaflet-tile-pane) {
  filter: sepia(18%) saturate(70%) brightness(1.03) contrast(0.96);
}

.map-view :deep(.leaflet-popup-content-wrapper) {
  background: var(--paper-raised);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius);
  box-shadow: var(--shadow-panel);
}

.map-view :deep(.leaflet-popup-tip) {
  background: var(--paper-raised);
  border: 1px solid var(--hairline-strong);
  box-shadow: none;
}

:global(.pending-marker-dot) {
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background: var(--status-progress);
  border: 3px solid var(--paper-raised);
  box-shadow: 0 0 0 2px var(--status-progress);
}

:global(.incident-marker-dot) {
  width: 16px;
  height: 16px;
  border-radius: 50%;
  border: 2.5px solid var(--paper-raised);
  box-shadow: 0 1px 4px rgba(24, 24, 27, 0.35);
}

:global(.incident-marker-dot.open) {
  background: var(--status-open);
}

:global(.incident-marker-dot.in-progress) {
  background: var(--status-progress);
}

:global(.incident-marker-dot.resolved) {
  background: var(--status-resolved);
}

:global(.incident-marker-ring) {
  width: 32px;
  height: 32px;
  display: flex;
  align-items: center;
  justify-content: center;
  border-radius: 50%;
  box-shadow: 0 0 0 2px var(--brand);
  animation: incident-marker-pulse 1.6s ease-out infinite;
}

:global(.incident-marker-ring .incident-marker-dot) {
  width: 16px;
  height: 16px;
}

@keyframes incident-marker-pulse {
  0% {
    box-shadow:
      0 0 0 2px var(--brand),
      0 0 0 2px rgba(31, 61, 46, 0.35);
  }
  70% {
    box-shadow:
      0 0 0 2px var(--brand),
      0 0 0 10px rgba(31, 61, 46, 0);
  }
  100% {
    box-shadow:
      0 0 0 2px var(--brand),
      0 0 0 2px rgba(31, 61, 46, 0);
  }
}
</style>
