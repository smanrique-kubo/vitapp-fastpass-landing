<script setup lang="ts">
import { useField, useForm } from "vee-validate";
import { toTypedSchema } from "@vee-validate/zod";
import { z } from "zod";
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();

const { handleSubmit, errors, meta, resetForm } = useForm({
  validationSchema: toTypedSchema(
    z.object({
      firstName: z
        .string({ message: t("rule.validation.requireForm") })
        .min(1, { message: t("rule.validation.requireForm") }),
      surname: z
        .number({ message: t("rule.validation.requireForm") })
        .min(1, { message: t("rule.validation.requireForm") }),
      email: z
        .string({ message: t("rule.validation.requireEmail") })
        .email({ message: t("rule.validation.email") })
        .min(1, { message: t("rule.validation.requireEmail") }),
      message: z
        .string({ message: t("rule.validation.requireEmail") })
        .min(1, { message: t("rule.validation.requireEmail") }),
    })
  ),
});

const { value: firstName } = useField<string>("firstName");
const { value: surname } = useField<string>("surname");
const { value: email } = useField<string>("email");
const { value: message } = useField<string>("message");
</script>
<template>
  <article>
    <section class="contact-main">
      <div class="contact-content-main">
        <h1 class="h1-title">
          {{ t("contact.main.title") }}
        </h1>
        <p>
          {{ t("contact.main.text") }}
        </p>
      </div>
    </section>
    <section class="form-section">
      <div
        class="tw-flex tw-w-full tw-items-cemter tw-justify-center max-lg:tw-flex-col"
      >
        <div class="tw-w-1/2 tw-flex tw-flex-col tw-gap-4 tw-max-w-[590px]">
          <h2 class="form-title">
            {{ t("contact.form.title") }}
          </h2>
          <div class="tw-flex tw-items-center tw-gap-3">
            <img
              src="/icons/contact/ic_location.svg"
              alt="ic_call"
              width="15"
              height="20"
            />
            <p>{{ t("contact.form.colombia").toUpperCase() }}</p>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <img
              src="/icons/contact/ic_call.svg"
              alt="ic_call"
              width="15"
              height="20"
            />
            <p>+57 323 8129535</p>
          </div>
          <div class="tw-flex tw-items-center tw-gap-3">
            <img
              src="/icons/contact/ic_envelope.svg"
              alt="ic_call"
              width="15"
              height="20"
            />
            <p>CONTACTO@VITAPP.COM</p>
          </div>
          <img
            src="/img/contact/img_contact.webp"
            alt="img_doctors"
            class="contact-image"
          />
        </div>
        <form class="form-container">
          <h2 class="form-title">
            {{ t("contact.form.fields.title") }}
          </h2>
          <p>
            {{ t("contact.form.fields.text") }}
          </p>
          <div class="tw-mt-3 tw-flex tw-gap-5">
            <span class="general-input solo-form tw-w-1/2">
              <label for="firstName">{{
                t("contact.form.fields.firstName")
              }}</label>
              <InputText
                v-model="firstName"
                v-keyfilter="/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/"
                type="text"
              />
              <GeneralInputError :error="errors['firstName']" />
            </span>
            <span class="general-input solo-form tw-w-1/2">
              <label for="lastName">{{
                t("contact.form.fields.lastName")
              }}</label>
              <InputText
                v-model="surname"
                v-keyfilter="/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/"
                type="text"
              />
              <GeneralInputError :error="errors['surname']" />
            </span>
          </div>
          <span class="general-input solo-form">
            <label for="email">{{ t("contact.form.fields.email") }}</label>
            <InputText
              v-model="email"
              v-keyfilter="/^[a-zA-ZáéíóúÁÉÍÓÚñÑüÜ\s]+$/"
              type="email"
            />
            <GeneralInputError :error="errors['email']" />
          </span>
          <span class="general-input solo-form">
            <label for="message">{{ t("contact.form.fields.message") }}</label>
            <Textarea
              v-model="message"
              style="resize: none; height: 204px"
            ></Textarea>
          </span>
        </form>
      </div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.contact-main {
  @apply tw-pt-[155px] tw-pb-[112px];
  background: linear-gradient(
    90deg,
    rgb(77, 9, 206) 0%,
    rgb(29, 194, 255) 100%
  );
  .contact-content-main {
    p {
      @apply tw-text-center;
      color: $color-white;
      word-wrap: break-word;
      font-size: 16px;
    }
  }
}
.form-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[900px] tw-px-4;
  @apply tw-flex tw-justify-center max-lg:tw-flex-col;
  height: 100%;
  min-width: 100%;
  .contact-image {
    @apply tw-w-[518px] tw-h-[518px] tw-rounded-3xl;
  }
  .form-container {
    @apply tw-w-1/2 tw-rounded-md tw-p-10 tw-gap-3 tw-flex tw-flex-col;
    @apply tw-max-w-[590px];
    box-shadow: 0px 4px 8px -2px rgba(0, 0, 0, 0.1);
    background: linear-gradient(
      90deg,
      rgb(255, 255, 255) 0%,
      rgb(219, 205, 245) 100%
    );
  }
}
.form-title {
  font-size: 2.5rem;
  font-family: "Inter", sans-serif;
  line-height: 1.3em;
  font-weight: 600;
}
</style>
