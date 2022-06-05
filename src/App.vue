<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

const storeContainerStatus = useToggleContainer();

storeContainerStatus.userStatus = true;
</script>

<template>
  <div :class="{ container: storeContainerStatus.userStatus }">
    <router-view></router-view>
  </div>
</template>

<style lang="scss">
@import "@/assets/scss/main.scss";
</style>
