<script setup>
import { ref } from "vue";

const open = ref(false);
</script>

<template>
  <button @click="open = true">Open Modal</button>

  <Teleport to="body">
    <div v-if="open" class="modal">
      <slot></slot>
      <button @click="open = false">Close</button>
    </div>
  </Teleport>
</template>

<style scoped>
.modal {
  color: #fff;
  position: fixed;
  z-index: 999;
  width: 100%;
  height: 100vh;
  background-color: black;
}
</style>
