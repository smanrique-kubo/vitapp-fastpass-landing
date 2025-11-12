<script setup lang="ts">
import { storeToRefs } from 'pinia'
import { useField, useForm } from 'vee-validate'
import { toTypedSchema } from '@vee-validate/zod'
import { z } from 'zod'
import { RoleAdmin } from '~/interfaces/Enums.interface'
/** stores */
const administratorsStore = useAdministratorsStore()
/** emits */
const emit = defineEmits(['closeModal', 'onSubmit'])
/** props */
const props = defineProps({
  id: {
    type: [String, Number],
    required: true,
  },
})
/** variables */
const { admin } = storeToRefs(administratorsStore)
const open = ref(true)
const { t } = useI18n()
const iconPassword = ref(false)
const iconPasswordConfirm = ref(false)
const roles = Object.entries(RoleAdmin).map(([key, value]) => ({
  key: t(`table.enums.role.${key}`) || key, // Valor por defecto si t() retorna null o undefined
  value,
}))
/** define form validate */

const { handleSubmit, errors, meta, errorBag, values, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      fullname: z.string().nonempty(`${t('rule.validation.email')}`),
      email: z
        .string()
        .email({ message: `${t('rule.validation.email')}` })
        .min(1, { message: `${t('rule.validation.require')}` }),
      password: z
        .string()
        .nonempty('require')
        .min(8, { message: 'min' })
        .regex(/^(?=.*[a-z])(?=.*[A-Z])(?=.*\d)[a-zA-Z\d*]+$/, {
          message: 'validation',
        })
        .optional(),
      confirmPassword: z
        .string()
        .refine(
          (value) => {
            if (values.password) {
              return value === values.password
            }
            return true
          },
          {
            message: 'mask',
          },
        )
        .default(''),
      role: z.string().nonempty(`${t('rule.validation.email')}`),
    }),
  ),
})
const { value: fullname } = useField<string>('fullname')
const { value: email } = useField<string>('email')
const { value: password } = useField<string>('password')
const { value: confirmPassword } = useField<string>('confirmPassword')
const { value: role } = useField<string>('role')

/** methods */
const onSubmit = handleSubmit(async (values: any) => {
  useLoading(true)
  const password = useEncrypt(values.password)
  const sendData = {
    fullname: values.fullname,
    email: values.email,
    password: password.password,
    iv: password.iv,
    role: values.role,
  }

  const response = await administratorsStore.editAdministrator(
    String(props.id),
    sendData,
  )

  if (response.status && response.code === 100) {
    useShowAlert({
      type: 'success',
      message: response.message,
    })
    emit('onSubmit')
  } else {
    useShowAlert({
      type: 'error',
      message: response.message,
    })
  }

  useLoading(false)
})

onMounted(() => {
  nextTick(async () => {
    useLoading(true)
    await administratorsStore.getAdministrator(String(props.id))
    resetForm({
      values: {
        fullname: admin.value.fullname,
        email: admin.value.email,
        role: admin.value.role,
      },
    })
    useLoading(false)
  })
})
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
      <h2 class="title-dialog">{{ t('text.admins.edit.title') }}</h2>
      <Button class="close-modal" @click="emit('closeModal')">
        <template #icon>
          <i class="pi pi-times" />
        </template>
      </Button>
    </template>
    <div class="flex flex-column gap-4">
      <span class="general-input solo-login">
        <label for="fullname">{{ t('form.fullname.label') }}</label>
        <InputText
          v-model="fullname"
          type="text"
          :placeholder="t('form.fullname.placeholder')"
        />
        <GeneralInputError :error="errors['fullname']" />
      </span>
      <span class="general-input solo-login">
        <label for="email">{{ t('form.email.label') }}</label>
        <InputText
          v-model="email"
          type="email"
          placeholder="ej.:correo@ejemplo.com"
        />
        <GeneralInputError :error="errors['email']" />
      </span>
      <span class="general-dropwdown solo-login">
        <label for="role">{{ t('form.role.label') }}</label>
        <Select
          v-model="role"
          option-label="key"
          option-value="value"
          :options="roles"
          :placeholder="t('form.role.placeholder')"
        />
        <GeneralInputError :error="errors['role']" />
      </span>
      <span class="general-input solo-login">
        <label for="password">
          {{ t('form.passwordNew.label') }}
        </label>
        <IconField icon-position="right">
          <InputText
            v-model="password"
            placeholder="********"
            :type="iconPassword ? 'text' : 'password'"
            aria-describedby="text-error"
          />
          <InputIcon
            class="cursor-pointer"
            @click="iconPassword = !iconPassword"
          >
            <img
              :src="`/icons/${!iconPassword ? 'ic_eye_hidden' : 'ic_eye_not_hidden'}.svg`"
              alt="show"
            />
          </InputIcon>
        </IconField>
        <div class="flex flex-column gap-2">
          <small class="flex align-items-center gap-2 color-gray text-xs">
            <i
              class="pi"
              :class="{
                'pi-check-circle active':
                  useValidatePassword(errorBag, values, 'password', 'min') &&
                  useValidatePassword(
                    errorBag,
                    values,
                    'password',
                    'validation',
                  ),
                'pi-circle-fill text-xs':
                  !useValidatePassword(errorBag, values, 'password', 'min') &&
                  !useValidatePassword(
                    errorBag,
                    values,
                    'password',
                    'validation',
                  ),
              }"
            />
            {{ t('rule.validation.password.valid') }}
          </small>
        </div>
      </span>
      <span class="general-input solo-login">
        <label for="password">
          {{ t('form.confirmPassword.label') }}
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
        <div class="flex flex-column">
          <small class="flex align-items-center gap-2 color-gray text-xs">
            <i
              class="pi"
              :class="{
                'pi-check-circle tw-font-bold': useValidatePassword(
                  errorBag,
                  values,
                  'confirmPassword',
                  'mask',
                ),
                'pi-circle-fill text-xs': !useValidatePassword(
                  errorBag,
                  values,
                  'confirmPassword',
                  'mask',
                ),
              }"
            />
            {{ t('rule.validation.password.confirm') }}
          </small>
        </div>
      </span>
    </div>

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
