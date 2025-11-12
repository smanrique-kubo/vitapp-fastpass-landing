<script setup lang="ts">
import { storeToRefs } from "pinia";
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
import { RoleAdmin } from "~/interfaces/Enums.interface";
/** stores */
const administratorsStore = useAdministratorsStore();
/** emits */
const emit = defineEmits(["closeModal", "onSubmit"]);
/** props */
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
});
/** variables */
const { admin } = storeToRefs(administratorsStore);
const open = ref(true);
const { t } = useI18n();
const iconPassword = ref(false);
const iconPasswordConfirm = ref(false);
const roles = Object.entries(RoleAdmin).map(([key, value]) => ({
  key: t(`table.enums.role.${key}`) || key, // Valor por defecto si t() retorna null o undefined
  value,
}));
/** define form validate */

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      otpCode: z.string().nonempty(t("rule.validation.email")),
    })
  ),
});
const { value: otpCode } = useField<string>("otpCode");

/** methods */
const onSubmit = handleSubmit(async (values: any) => {
  useLoading(true);
  emit("onSubmit", values.otpCode);

  useLoading(false);
});
</script>
<template>
  <Dialog
    v-model:visible="open"
    class="general-dialog"
    :modal="true"
    :closable="false"
    :draggable="false"
    :pt="{
      root: {
        style: {
          width: '563px',
        },
      },
    }"
  >
    <template #header>
      <h2 class="title-dialog">{{ t("text.admins.edit.title") }}</h2>
      <Button class="close-modal" @click="emit('closeModal')">
        <template #icon>
          <i class="pi pi-times" />
        </template>
      </Button>
    </template>
    <div class="flex flex-column gap-4"></div>

    <template #footer>
      <Button
        class="app-general-button dialog-button-full w-full"
        :class="{
          'app-btn-disabled': !meta.valid,
          ' app-btn-primary': meta.valid,
        }"
        :label="t('button.update')"
        @click="onSubmit"
      />
    </template>
  </Dialog>
</template>
