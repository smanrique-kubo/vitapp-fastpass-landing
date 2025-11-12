<script setup lang="ts">
import type { VehicleTypeDetail } from "~/interfaces/vehicleTypes.interface";
const props = defineProps<{
  vehicle: VehicleTypeDetail;
}>();
const { t } = useI18n();
const router = useRouter();
const route = useRoute();
const localePath = useLocalePath();
</script>
<template>
  <Card style="overflow: hidden" class="general-card card-driver">
    <template #content>
      <div class="left-section">
        <img :src="vehicle.photoUrl" alt="vehicle_photo" />
      </div>
      <div class="right-section">
        <div class="info-driver">
          <div class="flex gap-2">
            <p class="text-s-black">{{ t("home.vehicleCard.driverName") }}:</p>
            <p class="text-info-driver">
              {{ vehicle.driverName }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">{{ t("home.vehicleCard.to") }}:</p>
            <p class="text-info-driver">
              {{
                t("home.carDetail.serviceDetail.to", {
                  hours: useSearchItemJson("minHours", vehicle),
                  price: useFormatPrice(useSearchItemJson("minCost", vehicle)),
                })
              }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">
              {{ t("home.vehicleCard.additionalMinute") }}:
            </p>
            <p class="text-info-driver">
              {{ vehicle.extraMinuteCost }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">{{ t("home.vehicleCard.type") }}:</p>
            <p class="text-info-driver">
              {{ vehicle.vehicleTypeName }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">
              {{ t("home.vehicleCard.dimensions") }}
            </p>
            <p class="text-info-driver">
              {{
                t("home.vehicleCard.dimensionsData", {
                  height: vehicle.dimensions.height,
                  width: vehicle.dimensions.width,
                  large: vehicle.dimensions.length,
                })
              }}:
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">{{ t("home.vehicleCard.weigth") }}:</p>
            <p class="text-info-driver">
              {{ useCalculateWeigth(vehicle.weight) }}
            </p>
          </div>
          <div class="flex gap-2">
            <p class="text-s-black">{{ t("home.vehicleCard.space") }}:</p>
            <p class="text-info-driver flex align-items-center gap-2">
              <img
                src="/icons/ic_box.svg"
                alt="ic_box"
                height="15px"
                width="15px"
              />
              {{ vehicle.capacityDescription }}
            </p>
          </div>
          <span class="general-rating">
            <Rating
              :defaultValue="useSearchItemJson('averageRating', vehicle)"
              disabled
            />
          </span>
        </div>
        <div>
          <Button
            class="app-general-button app-btn-secondary"
            :label="t('button.seeInfo')"
            style="min-width: 151px"
            @click="
              router.push(
                localePath({ name: 'home-id', params: { id: vehicle.id } })
              )
            "
          >
          </Button>
        </div>
      </div>
    </template>
  </Card>
</template>
