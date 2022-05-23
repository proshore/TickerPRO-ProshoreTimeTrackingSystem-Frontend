<script setup>
import { ref, onBeforeMount } from "vue";
import getUser from "@/utils/getUser.js";

const userExists = ref(true);

onBeforeMount(() => {
  if (getUser()) {
    userExists.value = true;
  } else {
    userExists.value = false;
  }
});
</script>

<template>
  <div :class="{ container: !userExists }">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
