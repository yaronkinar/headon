<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import StatusTag from '@/components/ui/StatusTag.vue'
import type { Incident } from '@/types/incident'
import { useIncidentLabels } from '@/composables/useIncidentLabels'

defineProps<{
  incident: Incident
  isSelected: boolean
}>()

const emit = defineEmits<{ select: [id: string] }>()

const { locale } = useI18n({ useScope: 'global' })
const { typeLabel } = useIncidentLabels()
</script>

<template>
  <div
    class="incident-item"
    :class="{ selected: isSelected }"
    :data-testid="`incident-item-${incident.id}`"
    role="button"
    tabindex="0"
    :aria-current="isSelected ? 'true' : undefined"
    @click="emit('select', incident.id)"
    @keydown.enter="emit('select', incident.id)"
    @keydown.space.prevent="emit('select', incident.id)"
  >
    <div class="incident-item-header">
      <span class="incident-title">{{ incident.title }}</span>
      <StatusTag :status="incident.status" />
    </div>
    <div class="incident-item-meta">
      <span>{{ typeLabel(incident.type) }}</span>
      <span>{{ new Date(incident.createdAt).toLocaleDateString(locale) }}</span>
    </div>
  </div>
</template>

<style scoped>
.incident-item {
  padding: 0.85rem 0.9rem;
  background: var(--paper-raised);
  border: 1px solid var(--hairline);
  border-inline-start: 3px solid transparent;
  border-radius: var(--radius);
  margin-bottom: 0.5rem;
  cursor: pointer;
  transition:
    border-color 0.15s,
    background-color 0.15s;
}

.incident-item:hover,
.incident-item:focus-visible {
  border-color: var(--hairline-strong);
  border-inline-start-color: var(--brand);
  outline: none;
}

.incident-item.selected {
  border-inline-start-color: var(--brand);
  background-color: var(--brand-tint);
}

.incident-item-header {
  display: flex;
  justify-content: space-between;
  align-items: baseline;
  gap: 0.6rem;
  margin-bottom: 0.4rem;
}

.incident-title {
  font-family: var(--font-display);
  font-weight: 600;
  font-size: 0.95rem;
  line-height: 1.3;
}

.incident-item-meta {
  display: flex;
  justify-content: space-between;
  font-size: 0.75rem;
  color: var(--ink-muted);
}
</style>
