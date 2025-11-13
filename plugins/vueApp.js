import { defineNuxtPlugin } from "#app";
export default defineNuxtPlugin((nuxtApp) => {
  const config = useRuntimeConfig();

  nuxtApp.hook("app:beforeMount", async () => {
    await generateAccessToken();
  });
});
