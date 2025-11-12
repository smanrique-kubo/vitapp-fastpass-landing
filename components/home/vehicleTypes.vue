<script setup lang="ts">
import type { VehicleTypes } from "~/interfaces/vehicleTypes.interface";
const emit = defineEmits(["getId"]);
const props = defineProps<{
  vehicles: VehicleTypes;
}>();
const sendId = (_id: Number) => {
  emit("getId", _id);
};
</script>
<template>
  <Card class="general-card vehicle-types" @click="sendId(vehicles.id)">
    <template #header>
      <img :src="vehicles.photoUrl" :alt="vehicles.name"
    /></template>
    <template #content>
      <div>
        <span class="title-vehicle-type">
          {{ vehicles.name }}
        </span>
        <p>
          {{ truncateText(vehicles.description, 10) }}
        </p>
      </div>
    </template>
  </Card>
</template>
