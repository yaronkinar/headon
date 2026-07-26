<script setup lang="ts">
import StatusTag from '@/components/ui/StatusTag.vue'
import type { IncidentStatus } from '@/types/incident'

defineProps<{
  title: string
  typeLabel: string
  status: IncidentStatus
}>()
</script>

<template>
  <div class="popup-content">
    <p class="eyebrow">{{ typeLabel }}</p>
    <strong>{{ title }}</strong>
    <StatusTag :status="status" />
  </div>
</template>

<style scoped>
.popup-content {
  display: flex;
  flex-direction: column;
  align-items: flex-start;
  gap: 0.3rem;
  font-family: var(--font-body);
  min-width: 10rem;
}

.popup-content strong {
  font-family: var(--font-display);
  font-size: 0.95rem;
}
</style>
