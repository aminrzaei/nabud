<script setup>
import { ref } from "vue";
import ServiceForm from "../components/ServiceForm.vue";
import useServiceStore from "../stores/service";
import SettingIcon from "../assets/icons/setting.svg";

const serviceStore = useServiceStore();
const { serviceDates } = serviceStore;
let shouldModalOpenOnInit = true;
if (serviceDates) {
  shouldModalOpenOnInit = false;
}

const open = ref(shouldModalOpenOnInit);
const closeModal = () => (open.value = false);
</script>

<template>
  <button @click="open = true" class="icon">
    <img alt="تنظیمات" title="تنظیمات" :src="SettingIcon" />
  </button>

  <Teleport to="#app">
    <div v-if="open" @click="open = false" class="overlay">
      <div v-if="open" @click.stop="" class="modal">
        <div class="modal-title">تنظیمات</div>
        <ServiceForm @closeModal="closeModal" />
        <div class="closebtn" @click.stop="open = false">بستن</div>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.icon {
  position: absolute;
  top: 25px;
  right: 25px;
  z-index: 2;
  background: none;
  border: none;
  cursor: pointer;
  transition: all 0.3s linear;
}
.icon:hover {
  transform: rotateZ(30deg);
}
.overlay {
  display: flex;
  justify-content: center;
  align-items: center;
  position: absolute;
  z-index: 999;
  top: 0;
  left: 0;
  width: 100%;
  height: 100vh;
  background-color: #0000008f;
}
.modal {
  position: relative;
  display: flex;
  flex-direction: column;
  align-items: center;
  border-radius: 5px;
  background-color: rgb(23, 23, 23);
  color: #fff;
  width: 350px;
  height: 400px;
  padding: 50px 25px;
  box-shadow: 2px 5px 13px 0px #141414;
}
.modal-title {
  font-size: 20px;
  margin-bottom: 30px;
}
.closebtn {
  position: absolute;
  top: 12px;
  right: 18px;
  cursor: pointer;
  transition: all 0.1s linear;
}
.closebtn:hover {
  color: rgb(210, 174, 12);
}
</style>
