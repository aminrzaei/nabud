<script setup>
import { onMounted, ref } from "vue";
import useServiceStore from "../stores/service";
const emit = defineEmits(["closeModal"]);
const serviceStore = useServiceStore();
const { setServiceEndDate, serviceEndDate } = serviceStore;
const year = ref(0);
const month = ref(0);
const day = ref(0);
const handleSubmit = () => {
  const date = {
    year: year.value,
    month: month.value,
    day: day.value,
  };
  setServiceEndDate(date);
  emit("closeModal");
  window.location.reload();
};
onMounted(() => {
  if (serviceEndDate) {
    const date = JSON.parse(serviceEndDate);
    year.value = date.year;
    month.value = date.month;
    day.value = date.day;
  }
});
</script>

<template>
  <div>{{ year }}/{{ month }}/{{ day }}</div>
  <div>
    <input type="number" v-model="year" />
    <input type="number" v-model="month" />
    <input type="number" v-model="day" />
    <button @click="handleSubmit">ok</button>
  </div>
</template>

<style scoped></style>
