<script setup lang="ts">
import ConfirmDialog from 'primevue/confirmdialog'
import AppHeader from '@/components/AppHeader.vue'
import FilterBar from '@/components/FilterBar.vue'
import IncidentList from '@/components/IncidentList.vue'
import MapView from '@/components/MapView.vue'
import IncidentForm from '@/components/IncidentForm.vue'
import IncidentDetails from '@/components/IncidentDetails.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'

const store = useIncidentsStore()
const formStore = useIncidentFormStore()
</script>

<template>
  <div class="app-shell">
    <AppHeader />

    <main class="app-body">
      <section class="list-panel">
        <FilterBar />
        <IncidentList />
      </section>

      <section class="map-panel">
        <MapView />
      </section>

      <section class="side-panel">
        <Transition name="panel" mode="out-in">
          <IncidentForm v-if="formStore.isFormOpen" :key="`form-${formStore.formMode}`" />
          <IncidentDetails v-else :key="`details-${store.selectedIncidentId ?? 'empty'}`" />
        </Transition>
      </section>
    </main>

    <ConfirmDialog />
  </div>
</template>

<style scoped>
.app-shell {
  display: flex;
  flex-direction: column;
  height: 100vh;
  background: var(--paper);
}

.app-body {
  flex: 1;
  display: grid;
  grid-template-columns: 320px 1fr 340px;
  min-height: 0;
}

.list-panel {
  display: flex;
  flex-direction: column;
  min-height: 0;
  background: var(--paper-sunken);
  border-inline-end: 1px solid var(--hairline);
}

.map-panel {
  display: flex;
  min-height: 0;
  border-inline-end: 1px solid var(--hairline);
}

.side-panel {
  background: var(--paper-raised);
  overflow-x: hidden;
  overflow-y: auto;
  position: relative;
}

/* Below tablet width the fixed 3-column grid has no room for the map;
   stack the panels and let the page scroll instead. */
@media (max-width: 900px) {
  .app-shell {
    height: auto;
    min-height: 100vh;
  }

  .app-body {
    display: flex;
    flex-direction: column;
  }

  .list-panel {
    max-height: 45vh;
    border-inline-end: none;
    border-bottom: 1px solid var(--hairline);
  }

  .map-panel {
    height: 60vh;
    border-inline-end: none;
    border-bottom: 1px solid var(--hairline);
  }

  .side-panel {
    overflow-y: visible;
  }
}

.panel-enter-active,
.panel-leave-active {
  transition:
    transform 0.32s cubic-bezier(0.22, 1, 0.36, 1),
    opacity 0.24s ease;
}

.panel-enter-from {
  transform: translateX(36px);
  opacity: 0;
}

.panel-leave-to {
  transform: translateX(-36px);
  opacity: 0;
}
</style>
