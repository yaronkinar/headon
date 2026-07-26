<template>
  <p class="map-hint"><slot /></p>
</template>

<style scoped>
.map-hint {
  position: absolute;
  top: 0.75rem;
  left: 50%;
  transform: translateX(-50%);
  z-index: 1000;
  background: var(--brand);
  color: var(--paper-raised);
  padding: 0.45rem 1rem;
  border-radius: var(--radius);
  font-size: 0.78rem;
  font-weight: 600;
  letter-spacing: 0.04em;
}
</style>
