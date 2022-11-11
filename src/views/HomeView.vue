<script setup>
import { onMounted } from "vue";
import SettingModal from "../components/SettingModal.vue";
import renderEnv from "../utils/renderEnv";
import useServiceStore from "../stores/service";
import timeCalculator from "../utils/timeCalculator";

import GithubIcon from "../assets/icons/github.svg";

const serviceStore = useServiceStore();
const { serviceDates } = serviceStore;

onMounted(() => {
  if (serviceDates) {
    const calculatedTimes = timeCalculator(serviceDates);
    renderEnv().init(calculatedTimes);
  }
});
</script>

<template>
  <SettingModal />
  <div class="githublink">
    <a target="_blank" href="https://github.com/aminrzaei">
      <img alt="Github (aminrzaei)" title="Github" :src="GithubIcon" />
    </a>
  </div>
  <div id="env" />
</template>

<style>
#env {
  position: absolute;
}
.githublink {
  position: absolute;
  bottom: 20px;
  left: 25px;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.2s linear;
}
.githublink:hover {
  transform: scale(1.2);
}
img {
  height: 25px;
}
</style>
