<script setup>
import renderEnv from "./utils/renderEnv";
import { onMounted } from "vue";

onMounted(() => {
  const nabudLocalStorag = window.localStorage.getItem("nabud");
  if (nabudLocalStorag) {
    alert("LS hast");
  } else {
    alert("Ls Nist");
  }
  renderEnv().run();
});
</script>

<template>
  <div id="env"></div>
</template>

<style scoped></style>
