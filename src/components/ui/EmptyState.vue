<script setup lang="ts">
defineProps<{ eyebrow?: string }>()
</script>

<template>
  <div class="empty-state">
    <p v-if="eyebrow" class="eyebrow">{{ eyebrow }}</p>
    <p class="message"><slot /></p>
  </div>
</template>

<style scoped>
.empty-state {
  padding: 1.25rem;
  color: var(--ink-muted);
  font-size: 0.88rem;
}

.message {
  font-style: italic;
}

.eyebrow + .message {
  margin-top: 0.75rem;
}
</style>
