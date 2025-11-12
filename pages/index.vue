<script setup lang="ts">
const router = useRouter();
const localePath = useLocalePath();
const { t } = useI18n();
const steps = [
  {
    icon: '/img/home/steps/ic_step_1.svg',
    title: 'Comprehensive Health Assessment',
    description:
      'Quick individual surveys enriched with health data, lab results and medical records provide a complete view of each individual’s health.'
  },
  {
    icon: '/img/home/steps/ic_step_2.svg',
    title: 'Advanced Risk Detection',
    description:
      'Vitapp’s proprietary algorithm powered by AI analyzes more than 500 health risk segments, continuously tracking changes and improvements.'
  },
  {
    icon: '/img/home/steps/ic_step_3.svg',
    title: 'Continuous Guidance & Reporting',
    description:
      'Individuals receive personalized alerts and recommendations, while doctors access detailed digital reports for better clinical decisions.'
  },
  {
    icon: '/img/home/steps/ic_step_4.svg',
    title: 'Organizational & Population Insights',
    description:
      'At scale, Vitapp provides dashboards for organizations, hospitals, and governments — helping track population health trends and outcomes.'
  }
]
const carouselImg = [
  '/img/home/carousel/img_1.webp',
  '/img/home/carousel/img_2.webp',
  '/img/home/carousel/img_3.webp',
  '/img/home/carousel/img_4.webp',
  '/img/home/carousel/img_5.webp',
]
onMounted(() => {
  nextTick(() => {
    router.push(localePath({ name: "home" }));
  });
});
</script>

<template>
  <article>
    <section class="home-main">
      <div class="home-content-main">
        <h1 class="h1-title">
          {{ t('home.main.title') }}
        </h1>
        <p>
          {{ t('home.main.text') }}
        </p>
        <Button class="app-general-button app-btn-primary tw-mt-6" :label="t('button.requestDemo')"
          @click="router.push(localePath({ name: 'contact-us' }))"></Button>
      </div>
    </section>
    <section class="welcome-section">
      <div
        class="tw-w-full tw-flex max-lg:tw-flex-column tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4">
        <div>
          <img src="/img/home/img_welcome.webp" alt="welcome_img" width="564" height="564" />
        </div>
        <div class="tw-w-1/2 tw-max-w-[564px]">
          <h2 class="h1-title tw-text-white !tw-text-left">
            {{ t('home.welcome.title') }}
          </h2>
          <p class="tw-text-white tw-mt-4 ">
            {{ t('home.welcome.text') }}
          </p>
        </div>
      </div>
    </section>
    <section class="works-section">
      <div class="tw-flex tw-flex-col tw-w-full tw-justify-center tw-items-center lg:tw-gap-4 max-lg:tw-gap-2 tw-px-4">
        <h3>
          {{ t('home.works.title') }}
        </h3>
        <p>
          {{ t('home.works.text') }}
        </p>
      </div>
      <div class="steps-container">
        <div class="tw-flex tw-flex-wrap tw-justify-center tw-items-stretch tw-gap-6">
          <div v-for="(step, index) in steps" :key="index" class="tw-flex">
            <Card class="step-card" style="max-width: 263px;">
              <template #title>
                <div class="step-icon">
                  <img :src="step.icon" width="50" height="50px" style="color: #4d09ce" />
                </div>
                <p class="step-number">STEP {{ index + 1 }}</p>
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
        class="tw-w-full tw-flex max-lg:tw-flex-column tw-justify-center tw-items-center tw-h-full tw-px-20 tw-gap-10 max-lg:tw-flex-col max-lg:tw-px-4">
        <div class="tw-w-1/2 tw-h-[410px]">
          <Carousel :value="carouselImg" :numVisible="1" :numScroll="1" orientation="horizontal"
            verticalViewPortHeight="330px" containerClass="flex items-center">
            <template #item="slotProps">
              <img :src="slotProps.data" :alt="slotProps.data.name" class=" rounded" width="262" height="410" />
            </template>
          </Carousel>
        </div>
        <div class="tw-w-1/2">
          Why Vitapp is Different
          We offer a comprehensive range of advanced features designed to streamline your processes and boost
          efficiency.
          From intuitive user interface to seamless integration, our software provides everything you need to optimize
          your
          workflow and achieve exceptional results.

          500+ health risk segments analyzed.
          500,000+ individuals with personalized risk profiles.
          Real-time dashboards for medical staff.
          Risk & intervention reports for organizations.
        </div>
      </div>
    </section>
  </article>
</template>
<style lang="scss" scoped>
.home-main {
  @apply lg:tw-h-screen tw-py-5 tw-pt-20;
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
  @apply lg:tw-h-screen tw-py-5;
  min-height: 100%;
  min-width: 100%;
  background: linear-gradient(90deg, rgb(77, 9, 206) 0%, rgb(29, 194, 255) 100%);
  background-size: cover;
  background-position: center;
}

.works-section {
  @apply tw-py-20 tw-text-center lg:tw-min-h-screen;
  background-color: $color-f7faff;
  height: 100%;
  min-width: 100%;

  h3 {
    @apply tw-text-[32px];
    font-family: 'Inter', sans-serif;
    font-weight: 600;
  }

  p {
    font-family: 'Inter', sans-serif;
    font-weight: 600;

  }

  .steps-container {
    background-color: #f7f8fc;
    padding: 3rem 1rem;
    display: flex;
    justify-content: center;

    .step-card {
      @apply lg:tw-max-w-[263px] max-lg:tw-w-full;
      background-color: #fff;
      border-radius: 12px;
      text-align: center;
      padding: 2rem 1.5rem;
      box-shadow: 0 5px 15px rgba(0, 0, 0, 0.1);
      transition: transform 0.3s ease, box-shadow 0.3s ease;
      height: 100%;

      &:hover {
        transform: scale(1.05);
        box-shadow: 0 8px 25px rgba(0, 0, 0, 0.15);
      }

      .step-icon {
        width: 100%;
        display: flex;
        justify-content: center;
        align-items: center;
      }

      .step-number {
        font-weight: 600;
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
        font-size: 0.95rem;
        color: #555;
        line-height: 1.5;
      }
    }
  }

}

.why-vitapp-section {
  @apply tw-py-20 lg:tw-min-h-screen;
  height: 100%;
  min-width: 100%;
  background-color: $color-white;
}
</style>