<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
/** emits */
const emit = defineEmits(["return"]);
const router = useRouter();
const { t } = useI18n();
const props = defineProps(["user"]);
const localePath = useLocalePath();

const { handleSubmit, errorBag, values, meta } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      password: z
        .string()
        .nonempty("require")
        .min(8, { message: "min" })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d*]+$/, {
          message: "validation",
        }),
      confirmPassword: z.string().refine((value) => value === values.password, {
        message: "mask",
      }),
    })
  ),
});

// variables
const iconPassword = ref(false);
const iconPasswordConfirm = ref(false);
const { value: password } = useField<string>("password");
const { value: confirmPassword } = useField<string>("confirmPassword");

// method

const validateErrors = (input: string, text: string) => {
  let validate = false;

  if (values[input] && errorBag.value[input]) {
    const error = errorBag.value[input];
    if (!error?.includes(text)) {
      validate = true;
    }
  }

  if (values[input] && !errorBag.value[input]) {
    validate = true;
  }

  return validate;
};

const getValidationIcon = (field: string, errorType?: string) => {
  if (!values[field]) {
    return "/icons/icon_password_validation.svg";
  }

  if (errorBag.value[field]) {
    return "/icons/icon_password_false.svg";
  }

  if (field === "password") {
    const hasMinLength = validateErrors("password", "min");
    const hasValidFormat = validateErrors("password", "validation");
    if (hasMinLength && hasValidFormat) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  if (field === "confirmPassword") {
    const isMatching = validateErrors("confirmPassword", "mask");
    if (isMatching) {
      return "/icons/icon_password_true.svg";
    } else {
      return "/icons/icon_password_false.svg";
    }
  }

  return "/icons/icon_password_validation.svg";
};

const onSubmit = handleSubmit(async (values) => {
  useLoading(true);

  const formData = { ...values };
  const encripPass = useEncrypt(formData.password);
  formData.password = encripPass.password;
  formData.iv = encripPass.iv;

  const result = await useOnboardingStore().updatePassword({
    ...formData,
    pushToken: "",
    version: "1.0.0",
  });

  if (result.status && result.code === 100) {
    useShowAlert({
      type: "success",
      message: result.message,
    });
    useCheckTrue();

    useCheckFalse(() => {
      router.push(localePath({ name: "login" }));
    });
  } else {
    useShowAlert({
      type: "error",
      message: result.message,
    });
  }
  useLoading(false);
});
</script>
<template>
  <form @submit.prevent="onSubmit">
    <div class="flex">
      <div class="back-icon">
        <i class="pi pi-arrow-left" @click="emit('return')"></i>
      </div>
      <div>
        <h1 class="h3-primary">
          {{ t("title.changePassword") }}
        </h1>
        <p class="color-white mt-3">{{ t("text.changePassword") }}</p>
      </div>
    </div>

    <span class="general-input solo-login my-4" style="margin-left: 50px">
      <label for="password">
        {{ t("form.passwordNew.label") }}
      </label>
      <IconField icon-position="right">
        <InputText
          v-model="password"
          placeholder="********"
          :type="iconPassword ? 'text' : 'password'"
          aria-describedby="text-error"
        />
        <InputIcon class="cursor-pointer" @click="iconPassword = !iconPassword">
          <img
            :src="`/icons/${!iconPassword ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
            alt="show"
          />
        </InputIcon>
      </IconField>
      <div class="flex flex-column gap-2 tw-mt-10 tw-mb-14">
        <small class="flex align-items-center gap-2 color-white text-xs">
          <img
            :src="getValidationIcon('password')"
            alt="validation"
            height="9px"
            width="9px"
          />
          {{ t("rule.validation.password.valid") }}
        </small>
      </div>
    </span>
    <span class="general-input solo-login" style="margin-left: 50px">
      <label for="password">
        {{ t("form.confirmPassword.label") }}
      </label>

      <IconField icon-position="right">
        <InputText
          v-model="confirmPassword"
          placeholder="********"
          :type="iconPasswordConfirm ? 'text' : 'password'"
          aria-describedby="text-error"
        />
        <InputIcon
          class="cursor-pointer"
          @click="iconPasswordConfirm = !iconPasswordConfirm"
        >
          <img
            :src="`/icons/${!iconPasswordConfirm ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
            alt="show"
          />
        </InputIcon>
      </IconField>
      <div class="flex flex-column tw-mt-8">
        <small class="flex align-items-center gap-2 color-white text-xs">
          <img
            :src="getValidationIcon('confirmPassword')"
            alt="validation"
            height="9px"
            width="9px"
          />
          {{ t("rule.validation.password.confirm") }}
        </small>
      </div>
    </span>
    <div class="flex justify-content-center mt-5" style="margin-left: 50px">
      <Button
        type="submit"
        class="app-general-button w-full"
        :class="{
          'app-btn-disabled': !meta.valid,
          ' app-btn-primary': meta.valid,
        }"
        style="max-width: 343px"
        :label="t('button.savePassword')"
      />
    </div>
  </form>
</template>
