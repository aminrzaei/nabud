import { ref } from "vue";
import { defineStore } from "pinia";

const useServiceStore = defineStore("service", () => {
  const serviceDates = ref(window.localStorage.getItem("nabud"));
  const setServiceDates = function (dates) {
    window.localStorage.setItem("nabud", JSON.stringify(dates));
  };
  return { serviceDates, setServiceDates };
});

export default useServiceStore;
