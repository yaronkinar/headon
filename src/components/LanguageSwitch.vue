<script setup lang="ts">
import { watchEffect } from 'vue'
import { useI18n } from 'vue-i18n'
import AppSelect from '@/components/ui/AppSelect.vue'
import { SUPPORTED_LOCALES } from '@/i18n'

const { t, locale } = useI18n({ useScope: 'global' })

const languageOptions = SUPPORTED_LOCALES.map((entry) => ({
  value: entry.code,
  label: entry.label,
}))

watchEffect(() => {
  const activeLocale = SUPPORTED_LOCALES.find((entry) => entry.code === locale.value)
  document.documentElement.lang = locale.value
  document.documentElement.dir = activeLocale?.dir ?? 'ltr'
  document.title = t('app.title')
})
</script>

<template>
  <AppSelect v-model="locale" :options="languageOptions" class="language-select" />
</template>

<style scoped>
.language-select {
  width: 8rem;
}
</style>
