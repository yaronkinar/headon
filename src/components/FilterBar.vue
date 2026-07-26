<script setup lang="ts">
import { computed } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSelect from '@/components/ui/AppSelect.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentLabels } from '@/composables/useIncidentLabels'
import { ALL_STATUS_LABEL, ALL_TYPE_LABEL, ALL_OPTION_VALUE } from '@/constants/filterConstants'

const store = useIncidentsStore()
const { t } = useI18n({ useScope: 'global' })
const { statusOptions: baseStatusOptions, typeOptions: baseTypeOptions } = useIncidentLabels()

const statusOptions = computed(() => [
  { value: ALL_OPTION_VALUE, label: t(ALL_STATUS_LABEL) },
  ...baseStatusOptions.value,
])
const typeOptions = computed(() => [
  { value: ALL_OPTION_VALUE, label: t(ALL_TYPE_LABEL) },
  ...baseTypeOptions.value,
])
</script>

<template>
  <div class="filter-bar">
    <AppSelect
      v-model="store.statusFilter"
      :options="statusOptions"
      class="filter-select"
      :aria-label="t('filters.statusAriaLabel')"
      data-testid="status-filter"
    />
    <AppSelect
      v-model="store.typeFilter"
      :options="typeOptions"
      class="filter-select"
      :aria-label="t('filters.typeAriaLabel')"
      data-testid="type-filter"
    />
  </div>
</template>

<style scoped>
.filter-bar {
  display: flex;
  flex-direction: column;
  gap: 0.5rem;
  padding: 0.9rem 0.75rem;
  border-bottom: 1px solid var(--hairline);
}

.filter-select {
  width: 100%;
}
</style>
