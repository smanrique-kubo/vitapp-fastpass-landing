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
const scrollToSection = (sectionId: string) => {
  const element = document.getElementById(sectionId);
  if (element) {
    element.scrollIntoView({
      behavior: "smooth",
      block: "start",
    });
  }
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
        <nuxt-link class="link" :to="localePath({ name: 'index' })"
          >{{ t("menu.home") }}
        </nuxt-link>
        <nuxt-link class="link" :to="localePath({ name: 'contact-us' })"
          >{{ t("menu.contactUs") }}
        </nuxt-link>
        <Button
          class="app-general-button app-btn-primary"
          :label="t('button.howWorks')"
          @click="
            route?.name?.includes('contact')
              ? (router.push(localePath({ name: 'index' })),
                scrollToSection('how-works-section'))
              : scrollToSection('how-works-section')
          "
        ></Button>
      </div>
      <i class="pi pi-bars icon-responsive" @click="openMenu"></i>
    </header>
    <main class="main-application" :class="{ 'hover-menu': activeHoverMenu }">
      <div class="content-application">
        <slot />
      </div>
    </main>
    <footer class="general-footer">
      <div class="tw-flex tw-flex-col tw-gap-3 max-lg:tw-items-center">
        <img src="/img/logo_vitapp.png" alt="logo" width="100" height="30" />
        <div class="tw-flex tw-items-center tw-gap-4">
          <img
            src="/icons/footer/ic_call.svg"
            alt="ic_call"
            height="20"
            width="20"
          />
          <p>+57 323 8129535</p>
        </div>
        <div class="tw-flex tw-items-center tw-gap-4">
          <img
            src="/icons/footer/ic_envelop.svg"
            alt="ic_call"
            height="20"
            width="20"
          />

          <p>contacto@vitapp.com</p>
        </div>
      </div>
      <div class="tw-flex tw-gap-4">
        <NuxtLink
          to="https://www.instagram.com/vitappoficial/"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="pi pi-instagram"></i>
        </NuxtLink>

        <NuxtLink
          to="https://co.linkedin.com/company/vitapp"
          target="_blank"
          rel="noopener noreferrer"
        >
          <i class="pi pi-linkedin"></i>
        </NuxtLink>
      </div>
    </footer>
    <LayoutsLoginLogout
      :dialog="openLogout"
      @close-modal="openLogout = false"
    />

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
