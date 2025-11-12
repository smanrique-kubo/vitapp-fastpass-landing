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
            src="/img/ic_logo_drawer.png"
            alt="logo"
            width="73px"
            height="56px"
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
          :class="{
            active: route.path.includes(localePath({ name: 'experiences' })),
          }"
          :to="localePath({ name: 'experiences' })"
          @click="emit('closeModal')"
          >{{ t("menu.experiences") }}
        </nuxt-link>

        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'treasures' })),
          }"
          :to="localePath({ name: 'treasures' })"
          @click="emit('closeModal')"
          >{{ t("menu.treasures") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'gifts' })),
          }"
          :to="localePath({ name: 'gifts' })"
          @click="emit('closeModal')"
          >{{ t("menu.gifts") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'invitations' })),
          }"
          :to="localePath({ name: 'invitations' })"
          @click="emit('closeModal')"
          >{{ t("menu.invitations") }}
        </nuxt-link>
        <nuxt-link
          class="link"
          :class="{
            active: route.path.includes(localePath({ name: 'myActivites' })),
          }"
          :to="localePath({ name: 'myActivites' })"
          @click="emit('closeModal')"
          >{{ t("menu.myActivites") }}
        </nuxt-link>
        <nuxt-link
          v-if="userData?.id"
          class="link"
          :class="{ active: route.path.includes('profile') }"
          :to="localePath({ name: 'profile' })"
          @click="emit('closeModal')"
          >{{ t("menu.profile") }}
        </nuxt-link>
        <Button
          v-if="userData?.id"
          class="app-general-button app-btn-transparent black p-0"
          :pt="{
            label: 'text-s-black',
          }"
          @click="emit('logout')"
          :label="t('menu.logout')"
        >
        </Button>
        <div v-else class="tw-flex tw-flex-col tw-gap-4">
          <nuxt-link
            class="link"
            :class="{ active: route.path.includes('login') }"
            :to="localePath({ name: 'login' })"
            >{{ t("button.login") }}
          </nuxt-link>
          <nuxt-link
            class="link"
            :class="{ active: route.path.includes('register') }"
            :to="localePath({ name: 'register' })"
            >{{ t("button.register") }}
          </nuxt-link>
        </div>
      </div>
      <div class="social-media">
        <img
          src="/icons/menu/ic_facebook.svg"
          alt="facebook"
          width="24px"
          height="24px"
        />
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
        <img
          src="/icons/menu/ic_x.svg"
          alt="facebook"
          width="24px"
          height="24px"
        />
      </div>
    </Drawer>
  </div>
</template>

<style lang="scss"></style>
