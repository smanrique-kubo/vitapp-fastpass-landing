<script setup lang="ts">
const emit = defineEmits(["closeModal", "update:visible", "logout"]);

const props = defineProps({
  showUpdateDialog: {
    type: Boolean,
    required: true,
  },
});
const store = useOnboardingStore();
const { getLoginUser: userData } = storeToRefs(store);
const route = useRoute();
const router = useRouter();
const { t } = useI18n();

const localePath = useLocalePath();

const drawerVisible = computed({
  get: () => props.showUpdateDialog,
  set: (value) => {
    emit("update:visible", value);
    if (!value) {
      emit("closeModal");
    }
  },
});

const closeDrawer = () => {
  drawerVisible.value = false;
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
watch(userData, async (newVal) => {
  // if (newVal?.user?.id) {
  //   await accountStore.getProfile();
  // } else {
  //   systemStore.setMenuOpen(false);
  // }
});
</script>

<template>
  <div>
    <Drawer
      v-model:visible="drawerVisible"
      :dismissable="true"
      class="general-drawer menu-mobile-drawer"
      position="right"
    >
      <template #header>
        <div class="header-menu flex items-center gap-2">
          <img
            src="/img/logo_vitapp.png"
            alt="logo"
            width="144px"
            height="41"
            class="cursor-pointer"
            @click="router.push(localePath({ name: 'index' }))"
          />
        </div>
      </template>
      <template #closeicon>
        <i
          class="pi pi-times"
          style="color: black; font-size: 16px"
          @click="closeDrawer"
        ></i>
      </template>
      <div class="menu-mobile">
        <nuxt-link
          class="link"
          :to="localePath({ name: 'index' })"
          @click="closeDrawer"
          >{{ t("menu.home") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :to="localePath({ name: 'contact-us' })"
          @click="closeDrawer"
          >{{ t("menu.contactUs") }}
        </nuxt-link>
        <Button
          class="app-general-button app-btn-primary"
          :label="t('button.howWorks')"
          @click="(scrollToSection('how-works-section'), closeDrawer())"
        ></Button>
      </div>
      <div class="social-media">
        <img
          src="/icons/menu/ic_instagram.svg"
          alt="facebook"
          width="24px"
          height="24px"
        />
        <img
          src="/icons/menu/ic_linkedin.svg"
          alt="facebook"
          width="24px"
          height="24px"
        />
      </div>
    </Drawer>
  </div>
</template>

<style lang="scss"></style>
