import { ref } from "vue";
import { defineStore } from "pinia";

const useServiceStore = defineStore("counter", () => {
  const serviceEndDate = ref(window.localStorage.getItem("nabud"));
  const setServiceEndDate = function (date) {
    window.localStorage.setItem("nabud", JSON.stringify(date));
    serviceEndDate.value = date;
  };

  return { serviceEndDate, setServiceEndDate };
});

export default useServiceStore;
