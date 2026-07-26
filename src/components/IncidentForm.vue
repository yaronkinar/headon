<script setup lang="ts">
import { computed, ref, watch } from 'vue'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/ui/AppButton.vue'
import AppSelect from '@/components/ui/AppSelect.vue'
import FormField from '@/components/ui/FormField.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { FORM_MODE, useIncidentFormStore } from '@/stores/incidentForm'
import { useIncidentLabels } from '@/composables/useIncidentLabels'
import type { IncidentStatus, IncidentType } from '@/types/incident'

const store = useIncidentsStore()
const formStore = useIncidentFormStore()
const { t } = useI18n({ useScope: 'global' })
const { typeOptions, statusOptions } = useIncidentLabels()

const title = ref('')
const type = ref<IncidentType>('POWER_OUTAGE')
const status = ref<IncidentStatus>('OPEN')

watch(
  () => formStore.isFormOpen,
  (isOpen) => {
    if (!isOpen) return
    if (formStore.formMode === FORM_MODE.EDIT && store.selectedIncident) {
      title.value = store.selectedIncident.title
      type.value = store.selectedIncident.type
      status.value = store.selectedIncident.status
    } else {
      title.value = ''
      type.value = 'POWER_OUTAGE'
      status.value = 'OPEN'
    }
  },
  { immediate: true },
)

const canSubmit = computed(() => title.value.trim().length > 0 && formStore.pendingLocation !== null)

function handleSubmit() {
  const location = formStore.pendingLocation
  if (title.value.trim().length === 0 || !location) return
  const draft = { title: title.value.trim(), type: type.value, status: status.value }
  if (formStore.formMode === FORM_MODE.EDIT && store.selectedIncident) {
    store.updateIncident(store.selectedIncident.id, draft, location)
  } else {
    store.createIncident(draft, location)
  }
  formStore.closeForm()
}
</script>

<template>
  <div class="incident-form">
    <p class="eyebrow">
      {{
        formStore.formMode === FORM_MODE.EDIT
          ? t('incidentForm.editingEyebrow')
          : t('incidentForm.newEyebrow')
      }}
    </p>
    <h2>{{
      formStore.formMode === FORM_MODE.EDIT ? t('incidentForm.editTitle') : t('incidentForm.newTitle')
    }}</h2>

    <FormField :label="t('incidentForm.titleLabel')" input-id="title">
      <input
        id="title"
        v-model="title"
        type="text"
        :placeholder="t('incidentForm.titlePlaceholder')"
      />
    </FormField>

    <FormField :label="t('incidentForm.typeLabel')" input-id="type">
      <AppSelect id="type" v-model="type" :options="typeOptions" />
    </FormField>

    <FormField :label="t('incidentForm.statusLabel')" input-id="status">
      <AppSelect id="status" v-model="status" :options="statusOptions" />
    </FormField>

    <FormField :label="t('incidentForm.locationLabel')">
      <p v-if="formStore.pendingLocation" class="location-value" dir="ltr">
        {{ formStore.pendingLocation.lat.toFixed(5) }},
        {{ formStore.pendingLocation.lng.toFixed(5) }}
      </p>
      <p v-else class="location-placeholder">{{ t('incidentForm.locationPlaceholder') }}</p>
    </FormField>

    <div class="actions">
      <AppButton variant="primary" :disabled="!canSubmit" @click="handleSubmit">{{
        t('incidentForm.save')
      }}</AppButton>
      <AppButton variant="secondary" @click="formStore.closeForm()">{{
        t('incidentForm.cancel')
      }}</AppButton>
    </div>
  </div>
</template>

<style scoped>
.incident-form {
  padding: 1.25rem;
  display: flex;
  flex-direction: column;
  gap: 1.1rem;
}

.incident-form h2 {
  font-size: 1.25rem;
  margin: 0.25rem 0 0.25rem;
}

input[type='text'] {
  width: 100%;
  padding: 0.55rem 0.75rem;
  font-family: var(--font-body);
  font-size: 0.85rem;
  color: var(--ink);
  background: var(--paper-raised);
  border: 1px solid var(--hairline-strong);
  border-radius: var(--radius);
  transition: border-color 0.15s;
}

input[type='text']:focus-visible {
  border-color: var(--brand);
  outline: none;
}

.location-value {
  font-size: 0.88rem;
}

.location-placeholder {
  font-size: 0.82rem;
  color: var(--ink-muted);
  font-style: italic;
}

.actions {
  display: flex;
  gap: 0.6rem;
  margin-top: 0.5rem;
}
</style>
