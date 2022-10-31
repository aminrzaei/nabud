<script setup>
import SettingModal from "../components/SettingModal.vue";
import InfoModal from "../components/InfoModal.vue";
import AboutModal from "../components/AboutModal.vue";

import renderEnv from "../utils/renderEnv";
import { onMounted } from "vue";

onMounted(() => {
  // const nabudLocalStorag = window.localStorage.getItem("nabud");
  // if (nabudLocalStorag) {
  //   alert("LS hast");
  // } else {
  //   alert("Ls Nist");
  // }
  renderEnv().run();
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
