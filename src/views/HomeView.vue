<script setup>
import SettingModal from "../components/SettingModal.vue";
import InfoModal from "../components/InfoModal.vue";
import AboutModal from "../components/AboutModal.vue";

import renderEnv from "../utils/renderEnv";
import useServiceStore from "../stores/service";
import { onMounted } from "vue";

import { gregorianToJalali } from "../utils/dateConvertor";
import Duration from "../utils/duration";

const serviceStore = useServiceStore();
const { serviceDates } = serviceStore;

const calculateRemain = (dates) => {
  const { start: startDate, end: endDate } = JSON.parse(dates);
  const now = new Date();
  const nowYear = now.getFullYear();
  const nowMonth = now.getMonth() + 1;
  const nowDay = now.getDate();

  const [persianNowYear, persianNowMonth, persianNowDay] = gregorianToJalali(
    nowYear,
    nowMonth,
    nowDay
  );
  const nowDate = {
    year: persianNowYear,
    month: persianNowMonth,
    day: persianNowDay,
  };
  const tillNowDuration = new Duration(startDate);
  const spetDays = tillNowDuration.diff(nowDate);

  const totalDuration = new Duration(startDate);
  const totalDays = totalDuration.diff(endDate);

  const remainDays = totalDays - spetDays;
  const percentage = Math.floor((spetDays / totalDays) * 100);
  return { spent: spetDays, total: totalDays, remain: remainDays, percentage };
};

onMounted(() => {
  if (serviceDates) {
    const durations = calculateRemain(serviceDates);
    renderEnv().init(durations);
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
