<script setup lang="ts" generic="T extends string">
defineOptions({ inheritAttrs: false })

const model = defineModel<T>({ required: true })

defineProps<{
  options: { value: T; label: string }[]
  id?: string
}>()

function onChange(event: Event) {
  model.value = (event.target as HTMLSelectElement).value as T
}
</script>

<template>
  <div class="app-select">
    <select :id="id" :value="model" v-bind="$attrs" @change="onChange">
      <option v-for="opt in options" :key="opt.value" :value="opt.value">{{ opt.label }}</option>
    </select>
    <i class="pi pi-chevron-down" aria-hidden="true" />
  </div>
</template>

<style scoped>
.app-select {
  position: relative;
  display: flex;
  min-width: 0;
}

select {
  appearance: none;
  width: 100%;
  min-width: 0;
  padding: 0.55rem 2rem 0.55rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.82rem;
  color: var(--ink);
  background: var(--paper-raised);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius);
  cursor: pointer;
  text-overflow: ellipsis;
  transition: border-color 0.15s;
}

select:hover,
select:focus-visible {
  border-color: var(--brand);
  outline: none;
}

.app-select i {
  position: absolute;
  right: 0.75rem;
  top: 50%;
  transform: translateY(-50%);
  font-size: 0.6rem;
  color: var(--ink-muted);
  pointer-events: none;
}
</style>
