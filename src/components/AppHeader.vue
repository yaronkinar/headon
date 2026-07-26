<script setup lang="ts">
import { useI18n } from 'vue-i18n'
import { useConfirm } from 'primevue/useconfirm'
import AppButton from '@/components/ui/AppButton.vue'
import LanguageSwitch from '@/components/LanguageSwitch.vue'
import { useIncidentsStore } from '@/stores/incidents'
import { useIncidentFormStore } from '@/stores/incidentForm'

const store = useIncidentsStore()
const formStore = useIncidentFormStore()
const confirm = useConfirm()
const { t } = useI18n({ useScope: 'global' })

function handleReset() {
  confirm.require({
    message: t('app.resetDialog.message'),
    header: t('app.resetDialog.header'),
    icon: 'pi pi-exclamation-triangle',
    acceptProps: { label: t('app.resetDialog.confirm'), severity: 'danger' },
    rejectProps: { label: t('app.resetDialog.cancel'), severity: 'secondary', outlined: true },
    accept: () => store.resetToSeedData(),
  })
}
</script>

<template>
  <header class="app-header">
    <div class="masthead">
      <p class="eyebrow">{{ t('app.eyebrow') }}</p>
      <h1>{{ t('app.title') }}</h1>
    </div>
    <div class="header-actions">
      <LanguageSwitch />
      <AppButton variant="secondary" @click="handleReset">{{ t('app.resetSampleData') }}</AppButton>
      <AppButton variant="primary" icon="pi-plus" @click="formStore.openCreateForm()">{{
        t('app.newIncident')
      }}</AppButton>
    </div>
  </header>
</template>

<style scoped>
.app-header {
  display: flex;
  justify-content: space-between;
  align-items: flex-end;
  padding: 1rem 1.5rem;
  background: var(--paper-raised);
  border-bottom: 2px solid var(--ink);
  box-shadow: 0 1px 0 var(--hairline);
}

.masthead h1 {
  font-size: 1.5rem;
  letter-spacing: -0.01em;
}

.masthead .eyebrow {
  margin-bottom: 0.15rem;
}

.header-actions {
  display: flex;
  align-items: center;
  gap: 0.6rem;
}

@media (max-width: 640px) {
  .app-header {
    flex-direction: column;
    align-items: stretch;
    gap: 0.75rem;
    padding: 0.85rem 1rem;
  }

  .masthead h1 {
    font-size: 1.25rem;
  }

  .header-actions {
    flex-wrap: wrap;
    gap: 0.5rem;
  }

  .header-actions > * {
    flex: 1 1 auto;
  }
}
</style>
