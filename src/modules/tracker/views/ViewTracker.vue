<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import TrackerList from "../components/TrackerList.vue";

import TrackerAdd from "../components/TrackerAdd.vue";

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Time Tracker" />

    <TrackerList />
  </main>
</template>
