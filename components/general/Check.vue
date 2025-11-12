<script setup lang="ts">
import { storeToRefs } from "pinia";

/** stores */
const mainStore = useMainStore();

/** variables */
const { check } = storeToRefs(mainStore);
</script>

<template>
  <div v-if="check" class="viewCheck">
    <img
      src="/ic_check.svg"
      alt="Completado - Click para cerrar"
      class="check-icon"
    />
  </div>
</template>

<style lang="scss">
.viewCheck {
  position: fixed;
  z-index: 1500;
  width: 100vw;
  height: 100vh;
  background-color: rgb(0, 35, 90, 0.7);
  backdrop-filter: blur(2px);
  display: flex;
  flex-direction: column;
  justify-content: center;
  align-items: center;
  align-content: center;
}
</style>
