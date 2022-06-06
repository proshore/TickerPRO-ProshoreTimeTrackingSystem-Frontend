<script setup>
  import TheSidebar from "@/components/TheSidebar.vue";
  import BaseHeading from "@/components/BaseHeading.vue";

  import TrackerList from "../components/TrackerList.vue";
  
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Time Tracker" />

  <TrackerList />
  </main>
 </template>