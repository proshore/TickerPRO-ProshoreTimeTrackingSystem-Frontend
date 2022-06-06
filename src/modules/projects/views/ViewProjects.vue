<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import ViewAddProjectList from "./viewAddProjectList.vue";

import ViewAddProject from "./ViewAddProject.vue";

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />
  <main>
    <BaseHeading title="Projects" />
    <ViewAddProject />
    <TheLogoutLink />
    <ViewAddProjectList />
  </main>
</template>
