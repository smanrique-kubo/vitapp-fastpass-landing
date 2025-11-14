<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const activeIndex = ref("0");
const videoVisible = ref(false);
const videoPlayer = ref(null);
const videoUrl = ref(
  "https://dev-kubo.s3.us-west-2.amazonaws.com/mis/media/Vitapp-English-4K.mp4"
);
const steps = [
  {
    icon: "/img/home/steps/ic_step_1.svg",
    title: t("home.works.steps.1.title"),
    description: t("home.works.steps.1.text"),
  },
  {
    icon: "/img/home/steps/ic_step_2.svg",
    title: t("home.works.steps.2.title"),
    description: t("home.works.steps.2.text"),
  },
  {
    icon: "/img/home/steps/ic_step_3.svg",
    title: t("home.works.steps.3.title"),
    description: t("home.works.steps.3.text"),
  },
  {
    icon: "/img/home/steps/ic_step_4.svg",
    title: t("home.works.steps.4.title"),
    description: t("home.works.steps.4.text"),
  },
];
const table = ref<TableFields>({
  headers: [
    {
      header: "",
      field: "title",
    },
    {
      header: t("home.traditional.table.timing"),
      field: "case1",
      icon: "image",
      type: "image",
    },
    {
      header: t("home.traditional.table.monitoring"),
      icon: "image",
      type: "image",
      field: "case2",
    },
    {
      header: t("home.traditional.table.scope"),
      icon: "image",
      type: "image",
      field: "case3",
    },
    {
      header: t("home.traditional.table.personalization"),
      type: "image",
      icon: "image",
      field: "case4",
    },
    {
      header: t("home.traditional.table.accessibility"),
      icon: "image",
      type: "image",
      field: "case5",
    },
    {
      header: t("home.traditional.table.stakeholders"),
      icon: "image",
      type: "image",
      field: "case6",
    },
    {
      header: t("home.traditional.table.impact"),
      icon: "image",
      type: "image",
      field: "case7",
    },
  ],
  empty: "",
  loading: false,
  limit: 0,
  pages: 0,
});
const fields = [
  {
    id: 1,
    title: t("home.traditional.table.vitapp.title"),
    case1: t("home.traditional.table.vitapp.1"),
    case2: t("home.traditional.table.vitapp.2"),
    case3: t("home.traditional.table.vitapp.3"),
    case4: t("home.traditional.table.vitapp.4"),
    case5: t("home.traditional.table.vitapp.5"),
    case6: t("home.traditional.table.vitapp.6"),
    case7: t("home.traditional.table.vitapp.7"),
    image: "/icons/home/ic_circle_check.svg",
  },
  {
    id: 2,
    title: t("home.traditional.table.traditional.title"),
    case1: t("home.traditional.table.traditional.1"),
    case2: t("home.traditional.table.traditional.2"),
    case3: t("home.traditional.table.traditional.3"),
    case4: t("home.traditional.table.traditional.4"),
    case5: t("home.traditional.table.traditional.5"),
    case6: t("home.traditional.table.traditional.6"),
    case7: t("home.traditional.table.traditional.7"),
    image: "/icons/home/ic_circle_error.svg",
  },
];
const carouselImg = [
  "/img/home/carousel/img_1.webp",
  "/img/home/carousel/img_2.webp",
  "/img/home/carousel/img_3.webp",
  "/img/home/carousel/img_4.webp",
];

// Función para abrir el video
const openVideo = () => {
  videoVisible.value = true;
};
</script>

<template>
  <article>
    <section class="home-main">
      <div class="home-content-main">
        <h1 class="h1-title">
          {{ t("home.main.title") }}
        </h1>
        <p>
          {{ t("home.main.text") }}
        </p>
        <Button
          class="app-general-button app-btn-primary tw-mt-6"
          :label="t('button.requestDemo')"
          @click="router.push(localePath({ name: 'contact-us' }))"
        ></Button>
      </div>
    </section>
    <section class="welcome-section">
      <div class="welcome-section-container">
        <div>
          <img
            src="/img/home/img_welcome.webp"
            alt="welcome_img"
            class="welcome-video"
            @click="openVideo"
            width="564"
            height="564"
          />
        </div>
        <div
          class="lg:tw-w-1/2 lg:tw-max-w-[564px] max-lg:tw-w-full max-lg:tw-my-10"
        >
          <h2 class="h1-title !tw-text-left">
            {{ t("home.welcome.title") }}
          </h2>
          <p class="tw-text-white tw-mt-4">
            {{ t("home.welcome.text") }}
          </p>
        </div>
      </div>
    </section>
    <section id="how-works-section" class="works-section">
      <div
        class="tw-flex tw-flex-col tw-w-full tw-justify-center tw-items-center lg:tw-gap-4 max-lg:tw-gap-2 tw-px-4"
      >
        <h3>
          {{ t("home.works.title") }}
        </h3>
        <p>
          {{ t("home.works.text") }}
        </p>
      </div>
      <div class="steps-container">
        <div
          class="tw-flex tw-flex-wrap tw-justify-center tw-items-stretch tw-gap-6"
        >
          <div v-for="(step, index) in steps" :key="index" class="tw-flex">
            <Card class="step-card" style="max-width: 263px">
              <template #title>
                <div class="step-icon">
                  <img
                    :src="step.icon"
                    width="50"
                    height="50px"
                    style="color: #4d09ce"
                  />
                </div>
                <p class="step-number">
                  {{ t(`home.works.steps.${index + 1}.name`).toUpperCase() }}
                </p>
              </template>

              <template #content>
                <h3 class="step-title">{{ step.title }}</h3>
                <p class="step-description">{{ step.description }}</p>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <section class="why-vitapp-section">
      <div
        class="tw-w-full tw-flex max-lg:tw-flex-column tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4"
      >
        <div
          class="lg:tw-w-1/2 max-lg:tw-w-full tw-flex tw-justify-center tw-items-center"
        >
          <Carousel
            :value="carouselImg"
            :numVisible="1"
            :numScroll="1"
            orientation="horizontal"
            class="general-carousel"
            circular
            verticalViewPortHeight="330px"
            :autoplayInterval="3000"
          >
            <template #item="slotProps">
              <img
                :src="slotProps.data"
                :alt="slotProps.data.name"
                class="tw-rounded-lg"
                width="262"
                height="410"
              />
            </template>
          </Carousel>
        </div>
        <div class="lg:tw-w-1/2 max-lg:tw-w-full tw-flex tw-flex-col tw-gap-2">
          <h4>
            {{ t("home.why.title") }}
          </h4>
          <p class="tw-mb-3">
            {{ t("home.why.text") }}
          </p>
          <div v-for="(text, i) in 4" :key="i" class="tw-my-2">
            <div class="tw-flex tw-gap-2">
              <img
                src="/icons/home/ic_check.svg"
                alt="check"
                width="16px"
                height="16px"
              />
              <p>{{ t(`home.why.checks.${i + 1}`) }}</p>
            </div>
          </div>
        </div>
      </div>
    </section>
    <section class="t-v-section">
      <h5>
        {{ t("home.traditional.title") }}
      </h5>
      <GeneralTable
        class="max-lg:tw-hidden"
        :headers="table.headers"
        :fields="fields"
        :empty="table.empty"
        :loading="table.loading"
        :limit="100"
        :pages="100"
        :offset="0"
      />
      <div class="tw-w-full lg:tw-hidden">
        <Accordion :value="activeIndex" class="general-accordion">
          <AccordionPanel
            v-for="(field, index) in fields"
            :key="field.id"
            :value="index.toString()"
          >
            <AccordionHeader :class="index === 0 ? 'vitapp' : 'traditional'">
              {{ field.title }}
            </AccordionHeader>
            <AccordionContent>
              <div class="accordion-item-list">
                <div
                  v-for="header in table.headers.filter(
                    (h) => h.field !== 'title'
                  )"
                  :key="header.field"
                  class="accordion-item"
                >
                  <div class="item-row">
                    <img
                      :src="field.image"
                      :alt="header.header"
                      width="16"
                      height="16"
                    />
                    <div class="item-content">
                      <h4 class="item-title">{{ header.header }}</h4>
                      <p class="item-description">{{ field[header.field] }}</p>
                    </div>
                  </div>
                </div>
              </div>
            </AccordionContent>
          </AccordionPanel>
        </Accordion>
      </div>
      <p class="tw-">
        {{ t("home.traditional.note") }}
      </p>
    </section>
    <div class="inner-section">
      <div class="text-container">
        <span>
          {{ t("home.innerSection") }}
        </span>
      </div>
    </div>
    <section class="map-section">
      <div
        class="tw-w-full tw-flex max-lg:tw-flex-column tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4"
      >
        <div>
          <img src="/img/home/img_map.webp" alt="map_img" class="map-image" />
        </div>
        <div
          class="lg:tw-w-1/2 lg:tw-max-w-[564px] max-lg:tw-w-full max-lg:tw-my-10 tw-flex tw-flex-col tw-gap-4"
        >
          <h6 class="h1-title !tw-text-black !tw-text-left">
            {{ t("home.map.title") }}
          </h6>
          <p class="tw-mt-4">
            {{ t("home.map.text") }}
          </p>
          <div v-for="(text, i) in 3" :key="i">
            <div class="tw-flex tw-gap-2 tw-items-center">
              <i class="pi pi-circle-on" style="font-size: 5px"></i>
              <p>{{ t(`home.map.${i + 1}`) }}</p>
            </div>
          </div>
          <div>
            <Button
              class="app-general-button app-btn-primary tw-mt-6"
              :label="t('button.getStarted')"
              @click="router.push(localePath({ name: 'contact-us' }))"
            ></Button>
          </div>
        </div>
      </div>
    </section>
    <section class="benefits-section">
      <div
        class="tw-w-full tw-flex max-lg:tw-flex-column tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4"
      >
        <div
          class="lg:tw-w-1/2 lg:tw-max-w-[564px] max-lg:tw-w-full max-lg:tw-my-10 tw-flex tw-flex-col tw-gap-4"
        >
          <span class="h1-title !tw-text-[2.5rem] !tw-text-black !tw-text-left">
            {{ t("home.benefits.title") }}
          </span>
          <p class="tw-mt-4">
            {{ t("home.benefits.text") }}
          </p>
          <div v-for="(text, i) in 4" :key="i">
            <div class="tw-flex tw-gap-2 tw-items-center">
              <div class="img-benefit-container">
                <img
                  :src="`/icons/home/benefits/ic_benefit_${i + 1}.svg`"
                  alt="icon"
                  width="24"
                  height="24"
                />
              </div>
              <div class="tw-flex tw-flex-col tw-ml-4 tw-gap-3">
                <span class="tw-text-[1.25rem] tw-font-semibold">{{
                  t(`home.benefits.${i + 1}.title`)
                }}</span>
                <p>{{ t(`home.benefits.${i + 1}.text`) }}</p>
              </div>
            </div>
          </div>
        </div>
        <div>
          <img
            src="/img/home/img_benefits.webp"
            alt="map_img"
            class="benefit-image"
          />
        </div>
      </div>
    </section>
    <section class="custom-section">
      <img
        src="/img/home/custom/ic_custom.svg"
        alt="custom_ic"
        width="50"
        height="50"
      />
      <span class="h1-title !tw-text-[2.5rem] !tw-text-black !tw-text-left">
        {{ t("home.custom.title") }}
      </span>
      <p>
        {{ t("home.custom.text") }}
      </p>
      <div>
        <div
          class="tw-flex tw-flex-wrap tw-justify-center tw-items-stretch tw-gap-6"
        >
          <div v-for="(step, index) in 4" :key="index" class="tw-flex">
            <Card
              class="custom-card"
              style="max-width: 263px"
              :style="{
                maxWidth: '263px',
                backgroundImage: `linear-gradient(rgba(0, 0, 0, 0.5), rgba(0, 0, 0, 0.5)), url('/img/home/custom/img_${index + 1}.webp')`,
                backgroundSize: 'cover',
                backgroundPosition: 'center',
                backgroundRepeat: 'no-repeat',
              }"
            >
              <template #content>
                <span>
                  {{ t(`home.custom.${index + 1}.title`) }}
                </span>
                <p class="step-description">
                  {{ t(`home.custom.${index + 1}.text`) }}
                </p>
              </template>
            </Card>
          </div>
        </div>
      </div>
    </section>
    <section class="final-section">
      <div class="tw-flex tw-flex-col tw-gap-5">
        <p
          class="h1-title lg:!tw-text-[2.5rem] max-lg:!tw-text-[24px] tw-text-left"
        >
          {{ t("home.smart.title") }}
        </p>
        <p class="tw-text-center">{{ t("home.smart.text") }}</p>
      </div>
      <Button
        class="app-general-button app-btn-primary tw-mt-6 tw-max-h-16 max-lg:tw-w-full"
        :label="t('button.requestDemo')"
        @click="router.push(localePath({ name: 'contact-us' }))"
      ></Button>
    </section>
    <Dialog
      v-model:visible="videoVisible"
      modal
      dismissableMask
      :style="{ width: '90vw', maxWidth: '1200px' }"
      :showHeader="false"
      :pt="{
        root: { class: 'video-dialog' },
        content: { class: 'p-0' },
      }"
    >
      <div class="video-container">
        <video
          ref="videoPlayer"
          :src="videoUrl"
          controls
          autoplay
          class="w-full"
        >
          Tu navegador no soporta la reproducción de videos.
        </video>
        <i class="pi pi-times" @click="videoVisible = false"></i>
      </div>
    </Dialog>
  </article>
</template>
<style lang="scss" scoped>
.home-main {
  @apply lg:tw-h-screen lg:tw-py-5 max-lg:tw-py-36 lg:tw-pt-20;
  position: relative;
  background: url("/img/home/img_main.webp") no-repeat center center;
  background-size: cover;
  background-position: 52% 46%;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;

  &::after {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 100%;
    background-color: rgba(0, 0, 0, 0.4);
    z-index: 0;
  }

  .home-content-main {
    @apply max-lg:tw-px-4 tw-text-center;
    position: relative;
    z-index: 1;
    display: flex;
    justify-content: center;
    align-items: center;
    flex-direction: column;
    height: 100%;
    width: 100dvh;

    p {
      @apply tw-text-center;
      color: $color-white;
      word-wrap: break-word;
      font-size: 16px;
    }
  }
}

.welcome-section {
  @apply lg:tw-h-screen tw-py-5 lg:tw-max-h-[700px];
  min-height: 100%;
  min-width: 100%;
  background: linear-gradient(
    90deg,
    rgb(77, 9, 206) 0%,
    rgb(29, 194, 255) 100%
  );
  background-size: cover;
  background-position: center;
  .welcome-section-container {
    @apply tw-w-full tw-flex tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4;
    .welcome-video {
      @apply tw-cursor-pointer;
    }
  }
}

.works-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[900px] tw-px-4;
  background-color: $color-f7faff;
  height: 100%;
  min-width: 100%;

  h3 {
    @apply tw-text-[32px];
    font-family: "Inter", sans-serif;
    font-weight: 600;
  }

  p {
    @apply tw-text-center;
    font-family: "Inter", sans-serif;
    color: $color-black;
    font-weight: 500;
    font-size: 18px;
  }

  .steps-container {
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;

    .step-card {
      @apply lg:tw-max-w-[263px] max-lg:tw-w-full;
      background-color: #fff;
      border-radius: 12px;
      text-align: center;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition:
        transform 0.3s ease,
        box-shadow 0.3s ease;
      height: 100%;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0px 50px 50px -30px #00000070;
      }

      .step-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .step-number {
        font-weight: 400;
        color: #777;
        margin-bottom: 1rem;
      }

      .step-title {
        font-weight: 700;
        font-size: 1.2rem;
        margin-bottom: 0.75rem;
        color: #1a1a1a;
      }

      .step-description {
        @apply max-lg:tw-font-medium;
        font-size: 1rem;
        color: #555;
        line-height: 2rem;
      }
    }
  }
}
.why-vitapp-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[750px];
  height: 100%;
  min-width: 100%;
  background-color: $color-white;
  h4 {
    @apply tw-text-[24px];
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }
  p {
    @apply max-lg:tw-font-light lg:tw-font-thin;
    font-family: "Ubuntu", sans-serif;
  }
}
.t-v-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[750px] tw-px-4;
  height: 100%;
  min-width: 100%;
  background-color: $color-white;
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  h5 {
    @apply lg:tw-text-[32px] max-lg:tw-text-[24px] lg:tw-my-4 max-lg:tw-my-2;
    font-family: "Inter", sans-serif;
    font-weight: 500;
  }
}
.inner-section {
  @apply tw-w-full tw-flex tw-justify-center tw-items-center;
  padding-top: 112px;
  padding-bottom: 112px;
  padding-left: 40px;
  padding-right: 40px;

  background: linear-gradient(
    90deg,
    rgb(77, 9, 206) 0%,
    rgba(155, 81, 224, 0.5) 100%
  );
  .text-container {
    @apply tw-text-center tw-text-2xl tw-text-white lg:tw-max-w-[770px];
    word-wrap: break-word;
    font-family: "Inter", sans-serif;
  }
}
.map-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[750px] tw-px-4;
  height: 100%;
  min-width: 100%;
  .map-image {
    @apply tw-w-full tw-h-full tw-object-cover tw-max-w-[574px] tw-min-h-[510px] tw-rounded-3xl;
    box-shadow: 0px 50px 50px -30px #00000070;
  }
  p {
    @apply max-lg:tw-font-light lg:tw-font-thin;

    font-family: "Ubuntu", sans-serif;
  }
}
.benefits-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[900px] tw-px-4;
  height: 100%;
  min-width: 100%;
  .benefit-image {
    @apply tw-w-full tw-h-full tw-object-cover tw-max-w-[556px] tw-min-h-[661px] tw-rounded-3xl;
    box-shadow: 0px 50px 50px -30px #00000070;
  }
  p {
    @apply max-lg:tw-font-light lg:tw-font-thin;

    font-family: "Ubuntu", sans-serif;
  }
  .img-benefit-container {
    @apply tw-flex tw-w-[56px] tw-h-[56px] tw-justify-center tw-items-center;
    background: #f7faff;
    border-radius: 50%;
  }
}
.custom-section {
  @apply lg:tw-py-20 max-lg:tw-py-10 lg:tw-min-h-full lg:tw-max-h-[900px] tw-px-4;
  @apply tw-flex tw-flex-col tw-gap-4 tw-items-center;
  height: 100%;
  min-width: 100%;
  .custom-card {
    @apply lg:tw-w-[285px] tw-h-[518px] tw-flex tw-flex-col tw-justify-center tw-items-center;

    transition:
      transform 0.3s ease,
      box-shadow 0.3s ease;
    &:hover {
      transform: scale(1.05);
      box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
    }
    span {
      @apply tw-text-white tw-text-3xl tw-text-center tw-font-semibold tw-flex  tw-justify-center;
    }
    p {
      @apply tw-text-white  tw-text-center;
    }
  }
}
.final-section {
  @apply tw-flex tw-justify-evenly tw-items-center tw-relative max-lg:tw-flex-col;
  background: linear-gradient(
    90deg,
    rgb(77, 9, 206) 0%,
    rgb(29, 194, 255) 100%
  );
  padding-top: 112px;
  padding-bottom: 112px;

  p {
    @apply tw-text-white;
  }

  &::before {
    content: "";
    position: absolute;
    top: 0;
    left: 0;
    width: 100%;
    height: 50px;
    background-image: url("/img/home/final/ic_transition.svg");
    background-repeat: no-repeat;
    background-size: cover;
    background-position: center;
    z-index: 1;
  }

  > * {
    position: relative;
    z-index: 2;
  }
}
</style>
