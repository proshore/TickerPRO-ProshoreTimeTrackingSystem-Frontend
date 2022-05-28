<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import BaseHeading from "@/components/BaseHeading.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import InviteMemberList from "../components/InviteMemberList.vue";

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Teams" />

    <InviteMemberList />
  </main>
</template>
