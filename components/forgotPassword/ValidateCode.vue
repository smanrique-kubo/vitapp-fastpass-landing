<script setup lang="ts">
/** props */
const props = defineProps(["user"]);
/** emits */
const emit = defineEmits(["change", "return", "otpCompleted", "resendCode"]);

/** variables */
const { t } = useI18n();
const code = ref("");
const time = ref(30);
const interval = ref();
const isCountdownFinished = ref(false);
let intervalId = null;

/** methods */
const handleOnComplete = async () => {
  if (code.value.length === 4) {
    emit("otpCompleted", code.value);
  }
};

const startCountdown = () => {
  time.value = 30;
  isCountdownFinished.value = false;
  intervalId = setInterval(() => {
    if (time.value > 0) {
      time.value--;
    } else {
      isCountdownFinished.value = true;
      clearInterval(intervalId);
    }
  }, 1000);
};

const sendCode = async () => {
  emit("resendCode");
  time.value = 30;
  startCountdown();
};

onMounted(() => {
  startCountdown();
});
</script>
<template>
  <form class="grid">
    <div class="col-12 flex gap-1 justify-content-center">
      <p class="color-h app-font-arial-regular mb-0">
        {{ t("text.validateDescription") }}
      </p>
      <span class="app-font-arial-bold">
        {{ user.phone }}
      </span>
    </div>
    <div class="col-12">
      <div class="flex flex-column align-items-center mt-5">
        {{ user.code }}
        <InputOtp v-model="code" class="otp-input" @change="handleOnComplete" />
        <span class="general-slider login my-5">
          <Slider v-model="time" class="w-56" :max="30" />
        </span>
        <p class="flex flex-column align-items-center gap-2 my-0 underline">
          {{ $t("text.code") }}
          <template v-if="!isCountdownFinished">
            <p class="color-p">
              {{ " " + $t("text.segs", { data: time }) }}
            </p>
          </template>
          <template v-else>
            <Button
              class="app-general-button app-btn-transparent w-full"
              :label="t('button.resendCode')"
              style="width: 85px !important"
              @click="sendCode"
            />
          </template>
        </p>
      </div>
    </div>
  </form>
</template>
<style lang="scss">
.pie {
  width: px;
  height: 60px;
  border-radius: 50%;
  position: relative;
  display: flex;
  justify-content: center;
  align-items: center;
  .number {
    position: relative;
    z-index: 10;
    font-size: 18px;
    color: $color-25282b;
    font-family: "app-font-semibold";
  }
  .shadow {
    width: 50px;
    height: 50px;
    border-radius: 50%;
    background-color: transparent;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    display: flex;
    justify-content: center;
    align-items: center;
  }
  .left-side,
  .right-side {
    display: none;
  }
}
</style>
