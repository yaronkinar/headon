<script setup lang="ts">
defineProps<{ label: string }>()
</script>

<template>
  <dt>{{ label }}</dt>
  <dd><slot /></dd>
</template>

<style scoped>
dt {
  font-weight: 600;
  color: var(--ink-muted);
  font-size: 0.72rem;
  letter-spacing: 0.06em;
  text-transform: uppercase;
  padding-top: 0.1rem;
}

dd {
  font-size: 0.9rem;
}
</style>
