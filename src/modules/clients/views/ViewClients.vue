<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import ClientList from "../components/ClientList.vue"

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Clients" />
    <ClientList />
  </main>
</template>
