<script setup>
import { onMounted, ref } from "vue";
import useServiceStore from "../stores/service";
const emit = defineEmits(["closeModal"]);
const serviceStore = useServiceStore();
const { setServiceDates, serviceDates } = serviceStore;
const startYear = ref(1400);
const startMonth = ref(4);
const startDay = ref(1);
const endYear = ref(1402);
const endMonth = ref(4);
const endDay = ref(1);

const handleSubmit = () => {
  if (startDay.value < 1 || endDay.value < 1) return;
  if (startDay.value > 31 || endDay.value > 31) return;
  if (startMonth.value < 1 || endMonth.value < 1) return;
  if (startMonth.value > 12 || endMonth.value > 12) return;
  if (startYear.value < 1400 || endYear.value < 1400) return;
  if (startYear.value > 1500 || endYear.value > 1500) return;

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
  <div class="form-container">
    <div>
      <div class="inputbox-title">
        <div>{{ startYear }} / {{ startMonth }} / {{ startDay }}</div>
        <div>تاریخ اعزام</div>
      </div>
      <div class="inputbox">
        <input type="number" min="1400" max="1500" v-model="startYear" />
        <input type="number" min="1" max="12" v-model="startMonth" />
        <input type="number" min="1" max="31" v-model="startDay" />
      </div>
    </div>
    <div>
      <div>
        <div class="inputbox-title">
          <div>{{ endYear }} / {{ endMonth }} / {{ endDay }}</div>
          <div>تاریخ ترخیص</div>
        </div>
      </div>
      <div class="inputbox">
        <input type="number" min="1400" max="1500" v-model="endYear" />
        <input type="number" min="1" max="12" v-model="endMonth" />
        <input type="number" min="1" max="31" v-model="endDay" />
      </div>
    </div>
    <button @click="handleSubmit" class="submitbtn">ثبت تغییرات</button>
  </div>
</template>

<style scoped>
.form-container {
  display: flex;
  flex-direction: column;
  width: 85%;
}
.inputbox-title {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin: 10px 0;
}
.inputbox {
  display: flex;
  justify-content: space-between;
  margin-bottom: 20px;
}
.submitbtn {
  font-size: 18px;
  margin-top: 30px;
  background-color: rgb(247, 247, 247);
  border: none;
  border-radius: 3px;
  cursor: pointer;
  transition: all 0.1s ease-in;
}
.submitbtn:hover {
  transform: translateX(-4px);
  transform: translateY(-2px);
  box-shadow: 2px 3px 2px 1px #b30a2a;
}
input {
  width: 80px;
  font-weight: 600;
  font-size: 16px;
  text-align: center;
  padding: 4px 0 2px 0;
  background-color: rgb(55, 55, 55);
  color: white;
  border: none;
  border-radius: 2px;
}
/* Chrome, Safari, Edge, Opera */
input::-webkit-outer-spin-button,
input::-webkit-inner-spin-button {
  -webkit-appearance: none;
  margin: 0;
}

/* Firefox */
input[type="number"] {
  -moz-appearance: textfield;
}
</style>
