<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import ProjectList from "../components/ProjectList.vue";

import ProjectAdd from "../components/ProjectAdd.vue";

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />
  <main>
    <BaseHeading title="Projects" />
    <ProjectAdd />
    <ProjectList />
  </main>
</template>
