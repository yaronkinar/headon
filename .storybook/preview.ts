import type { Preview } from "@storybook/vue3-vite";
import { setup } from "@storybook/vue3-vite";
import { createPinia } from "pinia";
import PrimeVue from "primevue/config";
import ConfirmationService from "primevue/confirmationservice";
import Aura from "@primevue/themes/aura";
import { i18n } from "../src/i18n";
import "../src/assets/main.css";
import "leaflet/dist/leaflet.css";
import "primeicons/primeicons.css";

setup((app) => {
  app.use(createPinia());
  app.use(i18n);
  app.use(PrimeVue, { theme: { preset: Aura } });
  app.use(ConfirmationService);
});

const preview: Preview = {
  parameters: {
    backgrounds: {
      default: "paper",
      values: [{ name: "paper", value: "#ffffff" }],
    },
    controls: {
      matchers: {
        color: /(background|color)$/i,
        date: /Date$/i,
      },
    },

    a11y: {
      // 'todo' - show a11y violations in the test UI only
      // 'error' - fail CI on a11y violations
      // 'off' - skip a11y checks entirely
      test: "todo",
    },
  },
};

export default preview;
