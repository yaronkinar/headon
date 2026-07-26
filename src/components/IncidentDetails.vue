<script setup lang="ts">
import { computed } from 'vue'
import { useConfirm } from 'primevue/useconfirm'
import { useI18n } from 'vue-i18n'
import AppButton from '@/components/ui/AppButton.vue'
import StatusTag from '@/components/ui/StatusTag.vue'
import DetailRow from '@/components/ui/DetailRow.vue'
import EmptyState from '@/components/ui/EmptyState.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'
import { useIncidentLabels } from '@/composables/useIncidentLabels'
import { SEVERITY, REJECT_PROPS } from '@/constants/confirmDialog'

const store = useIncidentsStore()
const formStore = useIncidentFormStore()
const confirm = useConfirm()
const { t, locale } = useI18n({ useScope: 'global' })
const { typeLabel } = useIncidentLabels()

const selectedIncident = computed(() => store.selectedIncident)

function handleDelete() {
  const incident = selectedIncident.value
  if (!incident) return
  confirm.require({
    message: t('incidentDetails.deleteDialog.message', { title: incident.title }),
    header: t('incidentDetails.deleteDialog.header'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: { label: t('incidentDetails.deleteDialog.confirm'), severity: SEVERITY.DANGER },
    rejectProps: { ...REJECT_PROPS, label: t('incidentDetails.deleteDialog.cancel') },
    accept: () => store.deleteIncident(incident.id),
  })
}
</script>

<template>
  <div v-if="selectedIncident" class="incident-details" data-testid="incident-details">
    <p class="eyebrow">{{ t('incidentDetails.eyebrow') }}</p>
    <h2>{{ selectedIncident.title }}</h2>

    <dl>
      <DetailRow :label="t('incidentDetails.type')">{{
        typeLabel(selectedIncident.type)
      }}</DetailRow>

      <DetailRow :label="t('incidentDetails.status')">
        <StatusTag :status="selectedIncident.status" />
      </DetailRow>

      <DetailRow :label="t('incidentDetails.location')">
        <span dir="ltr"
          >{{ selectedIncident.latitude.toFixed(5) }},
          {{ selectedIncident.longitude.toFixed(5) }}</span
        >
      </DetailRow>

      <DetailRow :label="t('incidentDetails.filed')">{{
        new Date(selectedIncident.createdAt).toLocaleString(locale)
      }}</DetailRow>
    </dl>

    <div class="actions">
      <AppButton
        variant="secondary"
        icon="pi-pencil"
        @click="formStore.openEditForm(selectedIncident.id)"
        >{{ t('incidentDetails.edit') }}</AppButton
      >
      <AppButton variant="danger" icon="pi-trash" @click="handleDelete">{{
        t('incidentDetails.delete')
      }}</AppButton>
    </div>
  </div>
  <EmptyState v-else :eyebrow="t('incidentDetails.eyebrow')">{{
    t('incidentDetails.emptyState')
  }}</EmptyState>
</template>

<style scoped>
.incident-details {
  padding: 1.25rem;
}

.incident-details h2 {
  font-size: 1.25rem;
  margin: 0.25rem 0 1.25rem;
  line-height: 1.3;
}

dl {
  display: grid;
  grid-template-columns: auto 1fr;
  gap: 0.65rem 1.25rem;
  margin-bottom: 1.75rem;
  padding-bottom: 1.5rem;
  border-bottom: 1px solid var(--hairline);
}

.actions {
  display: flex;
  gap: 0.6rem;
}
</style>
