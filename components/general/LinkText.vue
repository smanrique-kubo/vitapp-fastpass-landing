<script setup="" lang="ts">
const route = useRoute();
const localePath = useLocalePath();
const { t } = useI18n();
const title = ref("");
const routePath = ref([]);

watch(
  () => route.fullPath,
  (newVal: string) => {
    validatePage(newVal);
    // routePath.value = validatePage(newVal)
  }
);

onMounted(() => {
  nextTick(() => {
    routePath.value = validatePage(route.fullPath);
  });
});

/** methods */
const validatePage = (_page: string) => {
  let route = [];

  if (_page.includes("dashboard")) {
    route = [
      {
        text: t("menu.dashboard"),
        class: "principal-title",
        goTo: { name: "dashboard" },
      },
    ];
    title.value = t("menu.dashboard");
  } else if (_page.includes("administrators")) {
    route = [
      {
        text: t("menu.admin"),
        class: "principal-title",
        goTo: { name: "administrators" },
      },
    ];
    title.value = t("menu.admin");
  }

  // ? Sección por defecto
  else {
    route = [
      {
        text: t("menu.notFound"),
        class: "principal-title",
        goTo: "",
      },
    ];
    title.value = t("menu.notFound");
  }

  return route;
};

watch(
  () => route.fullPath,
  (newVal) => {
    routePath.value = validatePage(newVal);
  }
);
</script>
<template>
  <div>
    <h1 v-show="routePath.length > 0" class="breadcrumb-page">
      <nuxt-link
        v-for="(item, index) in routePath"
        :key="index"
        :class="{ title: true, [item.class]: true }"
        :to="localePath(item.goTo)"
      >
        <span class="p-mr-2 text-link">{{ item.text }}</span>
        <span v-if="index + 1 < routePath.length" class="p-mr-3 div-icon" />
      </nuxt-link>
    </h1>
  </div>
</template>
<style lang="scss">
.breadcrumb-page {
  margin: 0;
  .title {
    font-size: 20px;
    font-weight: bold;
    text-decoration: none;
    .text-link {
      font-size: 20px;
    }
  }
  .div-icon {
    border-left: 1px solid;
  }
  .principal-title {
    color: $color-1a1a29 !important;
  }
  .secondary-title {
    color: $color-575e6b !important;
  }
}
</style>
