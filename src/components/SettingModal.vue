<script setup>
import { ref } from "vue";
import useServiceStore from "../stores/service";

const serviceStore = useServiceStore();
const { serviceEndDate } = serviceStore;
let shouldModalOpenOnInit = true;
if (serviceEndDate) {
  shouldModalOpenOnInit = false;
}

const open = ref(shouldModalOpenOnInit);
</script>

<template>
  <button @click="open = true" class="icon">Setting</button>

  <Teleport to="#app">
    <div v-if="open" @click="open = false" class="overlay">
      <div v-if="open" class="modal">
        Setting
        <button @click.stop="open = false">Close</button>
      </div>
    </div>
  </Teleport>
</template>

<style scoped>
.icon {
  position: absolute;
  top: 30px;
  left: 30px;
  z-index: 2;
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
  background-color: transparent;
}
.modal {
  border-radius: 5px;
  background-color: black;
  color: #fff;
  width: 350px;
  height: 400px;
}
</style>
