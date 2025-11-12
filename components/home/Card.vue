<script setup lang="ts">
interface DataProps {
  id: number;
  title?: string;
  subtitle?: string;
  linkText?: string;
  imageUrl?: string;
}

interface Props {
  data: DataProps;
}
const {t} = useI18n();


const props = defineProps({
  data: {
    type: Object as () => DataProps,
    required: true,
  },
})

  
const localePath = useLocalePath();
</script>

<template>
  <Card class="luxury-card">
    <template #content>
      <div class="card-wrapper">
        <div class="image-container">
          <img
            :src="data.imageUrl"
            :alt="data.title"
            class="background-image"
          />


          <div class="overlay"></div>

          <div class="card-content">
            <div class="text-content">
              <span class="card-title">{{ data.title }} </span>
              <p class="card-subtitle">{{ data.subtitle }}</p>

              <nuxt-link
                class="experience-link"
                :to="localePath({ name: 'experiences-id', params: { id: data.id } })"
              >
                <p>
                  {{ t('experience.seeExperience') }}
                </p>
                <i class="pi pi-chevron-right"></i>
              </nuxt-link>
            </div>
          </div>
        </div>
      </div>
    </template>
  </Card>
</template>

<style lang="scss" scoped>
.luxury-card {
  @apply tw-overflow-hidden tw-rounded-none;
  box-shadow: 0 4px 20px rgba(0, 0, 0, 0.15);
  :deep(.p-card-body) {
    padding: 0;

    .p-card-content {
      padding: 0;
    }
  }

  .card-wrapper {
    @apply tw-relative tw-w-full tw-h-[375px];

    .image-container {
      @apply tw-relative tw-w-full tw-h-full tw-overflow-hidden;
      .background-image {
        @apply tw-w-full tw-h-full tw-object-cover ;
        transition: transform 0.5s ease;
        z-index: 1;
      }

      .overlay {
        @apply tw-w-full tw-h-full tw-bottom-0 tw-absolute;
        background: url("/icons/home/dark.svg");
        background-position-y: bottom;
        background-repeat: repeat-x;
        background-repeat: no-repeat-y;
        z-index: 2;
      }

      .card-content {
        @apply tw-absolute tw-left-0 tw-bottom-0 tw-w-full tw-h-full tw-flex tw-flex-col tw-justify-end tw-p-8 tw-text-white;
        z-index: 20;
        .text-content {
          .card-title {
            @apply tw-text-2xl tw-font-SourceSans3-Regular;
            letter-spacing: 0.05em;
          }

          .card-subtitle {
            @apply tw-font-SourceSans3-Regular tw-text-base tw-text-white;
            margin: 0 0 12px 0;
          }

          .experience-link {
            @apply tw-inline-flex tw-items-center tw-cursor-pointer;
            transition: all 0.3s ease;
            p {
              @apply tw-gap-2 tw-text-white tw-font-SourceSans3-Regular tw-text-base tw-underline;
            }
            &:hover {
              text-decoration: underline;
              transform: translateX(5px);

              i {
                transform: translateX(3px);
              }
            }

            i {
              font-size: 0.85rem;
              transition: transform 0.3s ease;
            }
          }
        }
      }
    }
  }

  // Efecto hover en toda la tarjeta
  &:hover {
    .image-container .background-image {
      transform: scale(1.05);
    }
  }
}

// Responsive
@media (max-width: 768px) {
  .luxury-card {
    .card-wrapper {
      height: 375px;

      .card-content {
        padding: 1.5rem;

        .text-content {
          .card-title {
            font-size: 1.5rem;
          }

          .card-subtitle {
            font-size: 0.9rem;
          }
        }
      }
    }
  }
}
</style>
