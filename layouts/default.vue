<script setup lang="ts">
import { storeToRefs } from "pinia";
import { onClickOutside } from "@vueuse/core";
/** variables */
const store = useOnboardingStore();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
const activeHoverMenu = ref(false);
const { getLoginUser: userData, getProfileData: profile } = storeToRefs(store);
const menuMobile = ref(false);
const openDeniedDialog = ref(false);
const actualPage = ref("");
const openLogout = ref(false);
const openMenu = () => {
  menuMobile.value = true;
};
const hiddemMenu = () => {
  menuMobile.value = false;
};


onMounted(() => {
  nextTick(async () => {
    if (userData.value?.id) {
      actualPage.value = route.path;
      // await store.getProfile();
    }
  });
});

watch(
  () => route.path,
  (newVal, oldVal) => {
    if (route && oldVal !== newVal) {
      actualPage.value = newVal;
    }
  }
);
</script>
<template>
  <div class="app-wraper">
    <header class="header-content">
      <img
        src="/img/logo_vitapp.png"
        alt="logo"
        width="144px"
        height="41"
        class="cursor-pointer"
        @click="router.push(localePath({ name: 'index' }))"
      />
      <div class="pages-links">
        <nuxt-link
          class="link"
          :to="localePath({ name: 'index' })"
          >{{ t("menu.home") }}
        </nuxt-link>
        <nuxt-link
          v-if="userData?.id"
          class="link"
          :to="localePath({ name: 'contact-us' })"
          >{{ t("menu.contactUs") }}
        </nuxt-link>
        <Button
        class="app-general-button app-btn-primary"
          :label="t('button.howWorks')"
        ></Button>
      </div>
      <i class="pi pi-bars icon-responsive" @click="openMenu"></i>
    </header>
    <main class="main-application" :class="{ 'hover-menu': activeHoverMenu }">
      <div class="content-application">
        <slot />
      </div>
    </main>
    <LayoutsLoginLogout
      :dialog="openLogout"
      @close-modal="openLogout = false"
    />
    <GeneralDialog
      v-if="showDialog"
      v-model:show="showDialog"
      width="559px"
      :title="t('text.locationModal.title')"
    >
      <div class="content-dialog">
        <p>
          {{ t("text.locationModal.text") }}
        </p>
      </div>
      <div class="action-buttons">
        <Button
          :label="t('button.notAllow')"
          style="min-width: 151px"
          class="app-general-button app-btn-disabled"
          type="button"
          @click="showDialog = false"
        />
        <Button
          :label="t('button.allow')"
          style="min-width: 151px"
          class="app-general-button app-btn-primary"
          type="button"
          @click="getLocation()"
        />
      </div>
    </GeneralDialog>
    <GeneralDialog
      v-if="openDeniedDialog"
      v-model:show="openDeniedDialog"
      :title="t('text.deniedPermitionsModal.title')"
      :closable="true"
      width="559px"
    >
      <div class="content-dialog">
        <div>
          <div class="flex gap-2">
            <i class="pi pi-exclamation-triangle"></i>
            <p>{{ t("text.deniedPermitionsModal.message") }}</p>
          </div>

          <div class="instructions-steps">
            <h4>{{ t("text.deniedPermitionsModal.stepsTitle") }}</h4>
            <ol>
              <li>{{ t("text.deniedPermitionsModal.step1") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step2") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step3") }}</li>
              <li>{{ t("text.deniedPermitionsModal.step4") }}</li>
            </ol>
          </div>
        </div>
      </div>

      <div class="action-buttons">
        <Button
          :label="t('button.understood')"
          style="min-width: 100%"
          class="app-general-button app-btn-primary"
          type="button"
          @click="openDeniedDialog = false"
        />
      </div>
    </GeneralDialog>
    <DrawerMenuMobile
      v-model:visible="menuMobile"
      :showUpdateDialog="menuMobile"
      @closeModal="hiddemMenu"
      @logout="openLogout = true"
    />
  </div>
</template>
<style scoped lang="scss">
.search-container {
  position: relative;
  overflow: visible;
  align-items: center;
  .search-wrapper {
    position: relative;
    display: flex;
    align-items: center;
    overflow: visible;
    .search-input-animated {
      display: inline-flex;
      align-items: center;
      transform-origin: right center;
      will-change: transform, opacity, width;
    }
  }
}

.search-expand-enter-active,
.search-expand-leave-active {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}

.search-expand-enter-from {
  opacity: 0;
  transform: scaleX(0) translateX(20px);
  width: 0;

  :deep(.p-inputtext) {
    width: 0;
  }
}

.search-expand-enter-to {
  opacity: 1;
  transform: scaleX(1) translateX(0);
  width: 274px;

  :deep(.p-inputtext) {
    width: 100%;
  }
}

.search-expand-leave-from {
  opacity: 1;
  transform: scaleX(1) translateX(0);
  width: 274px;
}

.search-expand-leave-to {
  opacity: 0;
  transform: scaleX(0) translateX(20px);
  width: 0;

  :deep(.p-inputtext) {
    width: 0;
  }
}

.search-icon-enter-active,
.search-icon-leave-active {
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  transition-delay: 0.1s; 
}

.search-icon-enter-from {
  transform: scale(0) rotate(-180deg);
  opacity: 0;
}

.search-icon-enter-to {
  transform: scale(1) rotate(0);
  opacity: 1;
}

.search-icon-leave-from {
  transform: scale(1) rotate(0);
  opacity: 1;
}

.search-icon-leave-to {
  transform: scale(0) rotate(180deg);
  opacity: 0;
}

@keyframes ripple {
  0% {
    box-shadow: 0 0 0 0 rgba(255, 255, 255, 0.7);
  }
  100% {
    box-shadow: 0 0 0 20px rgba(255, 255, 255, 0);
  }
}

.search-input-animated {
  &.search-expand-enter-active {
    animation: ripple 0.6s ease-out;
  }
}

:deep(.p-iconfield) {
  width: 100%;
  display: flex;
  align-items: center;
}

:deep(.p-inputtext) {
  transition: all 0.4s cubic-bezier(0.4, 0, 0.2, 1);
}
</style>
