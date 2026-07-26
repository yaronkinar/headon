<script setup lang="ts">
defineProps<{ label: string; inputId?: string }>()
</script>

<template>
  <div class="field">
    <label :for="inputId">{{ label }}</label>
    <slot />
  </div>
</template>

<style scoped>
.field {
  display: flex;
  flex-direction: column;
  gap: 0.4rem;
}

.field label {
  font-weight: 600;
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  color: var(--ink-muted);
}
</style>
