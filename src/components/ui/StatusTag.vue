<script setup lang="ts">
import type { IncidentStatus } from '@/types/incident'
import { useIncidentLabels } from '@/composables/useIncidentLabels'

defineProps<{ status: IncidentStatus }>()

const { statusLabel } = useIncidentLabels()
</script>

<template>
  <span class="status-tag" :class="status.toLowerCase()">
    <span class="dot" />
    {{ statusLabel(status) }}
  </span>
</template>

<style scoped>
.status-tag {
  display: inline-flex;
  align-items: center;
  gap: 0.4rem;
  font-size: 0.68rem;
  font-weight: 600;
  letter-spacing: 0.07em;
  text-transform: uppercase;
  white-space: nowrap;
  flex-shrink: 0;
}

.dot {
  width: 7px;
  height: 7px;
  border-radius: 50%;
  flex-shrink: 0;
}

.status-tag.open {
  color: var(--status-open);
}
.status-tag.open .dot {
  background: var(--status-open);
}

.status-tag.in_progress {
  color: var(--status-progress);
}
.status-tag.in_progress .dot {
  background: var(--status-progress);
}

.status-tag.resolved {
  color: var(--status-resolved);
}
.status-tag.resolved .dot {
  background: var(--status-resolved);
}
</style>
