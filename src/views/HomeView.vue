<script setup>
import SettingModal from "../components/SettingModal.vue";
import InfoModal from "../components/InfoModal.vue";
import AboutModal from "../components/AboutModal.vue";

import renderEnv from "../utils/renderEnv";
import useServiceStore from "../stores/service";
import { onMounted } from "vue";

onMounted(() => {
  const serviceStore = useServiceStore();
  const { serviceEndDate } = serviceStore;
  if (serviceEndDate) {
    renderEnv().run(serviceEndDate);
  }
});
</script>

<template>
  <SettingModal />
  <InfoModal />
  <AboutModal />
  <div id="env" />
</template>

<style>
#env {
  position: absolute;
}
</style>
