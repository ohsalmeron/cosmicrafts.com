import './style.css';
import '@fortawesome/fontawesome-free/css/all.min.css';

import { createApp, watch } from 'vue';
import App from './App.vue';
import router from './router';
import { createPinia } from 'pinia';

import { createI18n } from 'vue-i18n';
import en from '@/locales/en.json';
import es from '@/locales/es.json';
import fr from '@/locales/fr.json';
import de from '@/locales/de.json';
import pt from '@/locales/pt.json';
import ru from '@/locales/ru.json';
import ar from '@/locales/ar.json';
import vi from '@/locales/vi.json';
import ko from '@/locales/ko.json';
import ja from '@/locales/ja.json';
import zh from '@/locales/zh.json';
import tr from '@/locales/tr.json';

import AccountManagement from '@/components/wallet/AccountManagement.vue';
import NotificationSystem from '@/components/notifications/NotificationSystem.vue';

import clarityService from '@/services/clarity';

const i18n = createI18n({
  legacy: false,
  locale: 'en',
  fallbackLocale: 'en',
  messages: {
    en, es, fr, de, pt, ru, ar, vi, ko, ja, zh, tr,
  },
});

const app = createApp(App);
const pinia = createPinia();
app.use(pinia);

app.component('AccountManagement', AccountManagement);
app.component('NotificationSystem', NotificationSystem);

import { useNotificationStore } from '@/stores/notification';

app.config.globalProperties.$notify = {
  success: (message, options = {}) => {
    const store = useNotificationStore();
    return store.success(message, options);
  },
  error: (message, options = {}) => {
    const store = useNotificationStore();
    return store.error(message, options);
  },
  info: (message, options = {}) => {
    const store = useNotificationStore();
    return store.info(message, options);
  },
  warning: (message, options = {}) => {
    const store = useNotificationStore();
    return store.warning(message, options);
  },
  achievement: (message, options = {}) => {
    const store = useNotificationStore();
    return store.achievement(message, options);
  },
  reward: (message, options = {}) => {
    const store = useNotificationStore();
    return store.reward(message, options);
  },
  fromApiResponse: (success, message, options = {}) => {
    const store = useNotificationStore();
    return store.fromApiResponse(success, message, options);
  }
};

app.use(i18n);
app.use(router);
app.mount('#app');

clarityService.init();

import('@/stores/language').then(({ useLanguageStore }) => {
  const languageStore = useLanguageStore();
  languageStore.loadLanguage().then(() => {
    watch(
      () => languageStore.currentLanguage,
      (newLang) => {
        i18n.global.locale.value = newLang;
      },
      { immediate: true }
    );
  }).catch(() => {
    languageStore.detectLanguage().then(detectedLang => {
      languageStore.setLanguage(detectedLang || 'en');
    });
  });
});
