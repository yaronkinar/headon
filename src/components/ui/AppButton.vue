<script setup lang="ts">
withDefaults(
  defineProps<{
    variant?: 'primary' | 'secondary' | 'danger'
    icon?: string
    disabled?: boolean
    type?: 'button' | 'submit'
  }>(),
  {
    variant: 'primary',
    disabled: false,
    type: 'button',
  },
)
</script>

<template>
  <button :type="type" class="app-button" :class="variant" :disabled="disabled">
    <i v-if="icon" :class="['pi', icon]" aria-hidden="true" />
    <span><slot /></span>
  </button>
</template>

<style scoped>
.app-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 0.45rem;
  padding: 0.6rem 1.1rem;
  font-family: var(--font-body);
  font-size: 0.72rem;
  font-weight: 600;
  letter-spacing: 0.08em;
  text-transform: uppercase;
  border-radius: var(--radius);
  border: 1px solid transparent;
  cursor: pointer;
  transition:
    background-color 0.15s,
    border-color 0.15s,
    color 0.15s,
    transform 0.1s;
}

.app-button:active:not(:disabled) {
  transform: translateY(1px);
}

.app-button:disabled {
  cursor: not-allowed;
  opacity: 0.4;
}

.app-button.primary {
  background: var(--brand);
  border-color: var(--brand);
  color: var(--paper-raised);
}

.app-button.primary:hover:not(:disabled) {
  background: var(--brand-strong);
  border-color: var(--brand-strong);
}

.app-button.secondary {
  background: transparent;
  border-color: var(--hairline-strong);
  color: var(--ink);
}

.app-button.secondary:hover:not(:disabled) {
  border-color: var(--ink);
  background: var(--brand-tint);
}

.app-button.danger {
  background: transparent;
  border-color: var(--danger);
  color: var(--danger);
}

.app-button.danger:hover:not(:disabled) {
  background: var(--status-open-tint);
}

@media (max-width: 640px) {
  .app-button {
    min-height: 44px;
    padding: 0.6rem 1rem;
  }
}
</style>
