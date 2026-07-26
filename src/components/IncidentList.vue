<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import IncidentListItem from '@/components/IncidentListItem.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useIncidentsStore } from '@/stores/incidents'

const store = useIncidentsStore()
const { t } = useI18n({ useScope: 'global' })
</script>

<template>
  <div class="incident-list" data-testid="incident-list">
    <EmptyState v-if="store.filteredIncidents.length === 0">{{
      t('incidentList.empty')
    }}</EmptyState>
    <IncidentListItem
      v-for="incident in store.filteredIncidents"
      :key="incident.id"
      :incident="incident"
      :is-selected="incident.id === store.selectedIncidentId"
      @select="store.selectIncident"
    />
  </div>
</template>

<style scoped>
.incident-list {
  padding: 0.75rem;
  overflow-y: auto;
  flex: 1;
}
</style>
