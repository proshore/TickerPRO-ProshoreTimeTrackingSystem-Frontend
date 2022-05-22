<script setup>
import { ref } from "vue";
import getUser from "@/utils/getUser.js";

const userExists = ref(getUser());
</script>

<template>
  <div :class="{ container: !userExists }">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
