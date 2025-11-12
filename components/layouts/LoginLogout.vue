<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
/** emits */
const emit = defineEmits(["closeModal", "logout"]);

/** props */
defineProps({
  dialog: {
    type: Boolean,
    required: true,
  },
});

/** methods */
const closeModal = () => {
  emit("closeModal");
};
const logoutUser = async () => {
  useLoading(true);
  await logout(true);
  closeModal()
  useLoading(false);
};
</script>

<template>
  <Dialog
    id="logout-modal"
    :visible="dialog"
    :style="{ width: '474px' }"
    :modal="true"
    :closable="false"
    :draggable="false"
  >
    <h2>{{ $t("title.logout") }}</h2>
    <template #footer>
      <Button
        class="app-general-button app-btn-disabled w-full"
        :label="$t('button.cancel')"
        style="max-width: 151px"
        @click="closeModal"
      />
      <Button
        class="app-general-button app-btn-primary w-full"
        style="max-width: 151px"
        :label="$t('button.logout')"
        autofocus
        @click="logoutUser"
      />
    </template>
  </Dialog>
</template>

<style lang="scss">
#logout-modal {
  border-radius: 13px !important;

  h2 {
    color: #182a48;
    font-size: 32px !important;
    margin: 0;
    font-family: "Arial-Medium";
    text-align: center;
    font-weight: 10;
  }

  .p-dialog-header {
    border-top-right-radius: 11px !important;
    border-top-left-radius: 11px !important;
    padding: 10px;
  }
  .p-dialog-footer {
    border-bottom-right-radius: 11px !important;
    border-bottom-left-radius: 11px !important;
    display: flex;
    justify-content: center;
    align-items: center;
    padding: 40px;

    button {
      margin: 0 !important;
    }
  }

  .p-dialog-content {
    padding: 0 40px;
  }

  .button-modal {
    color: white;
    padding: 12px 43px;
    border-radius: 5px;
    width: 100%;
    span {
      font-family: "OpenSans-Bold" !important;
    }
    &.modal__no {
      background: rgba(153, 153, 153, 0.2) !important;
      border-radius: 0px 0px 0px 11px;
      border: none;
      span {
        color: #666666;
      }
    }
    &.modal__yes {
      background: #ec8490 0% 0% no-repeat padding-box;
      border-radius: 0px 0px 11px 0px;
      border: none;
    }
  }
}
.p-dialog-mask.p-component-overlay {
  background-color: rgba(15, 27, 46, 1);
}
</style>
