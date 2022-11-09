<script setup>
import { onMounted, ref } from "vue";
import useServiceStore from "../stores/service";
const emit = defineEmits(["closeModal"]);
const serviceStore = useServiceStore();
const { setServiceDates, serviceDates } = serviceStore;
const startYear = ref(0);
const startMonth = ref(0);
const startDay = ref(0);
const endYear = ref(0);
const endMonth = ref(0);
const endDay = ref(0);

const handleSubmit = () => {
  const dates = {
    start: {
      year: startYear.value,
      month: startMonth.value,
      day: startDay.value,
    },
    end: {
      year: endYear.value,
      month: endMonth.value,
      day: endDay.value,
    },
  };
  setServiceDates(dates);
  emit("closeModal");
  window.location.reload();
};
onMounted(() => {
  if (serviceDates) {
    const dates = JSON.parse(serviceDates);
    const { start, end } = dates;
    startYear.value = start.year;
    startMonth.value = start.month;
    startDay.value = start.day;
    endYear.value = end.year;
    endMonth.value = end.month;
    endDay.value = end.day;
  }
});
</script>

<template>
  <div>
    <div>{{ startYear }}/{{ startMonth }}/{{ startDay }}</div>
    <input type="number" v-model="startYear" />
    <input type="number" v-model="startMonth" />
    <input type="number" v-model="startDay" />
    <div>{{ endYear }}/{{ endMonth }}/{{ endDay }}</div>
    <input type="number" v-model="endYear" />
    <input type="number" v-model="endMonth" />
    <input type="number" v-model="endDay" />
    <button @click="handleSubmit">ok</button>
  </div>
</template>

<style scoped></style>
