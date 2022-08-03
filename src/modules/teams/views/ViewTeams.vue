<script setup>
import InviteMemberList from "../components/InviteMemberList.vue";
import RegisterUserList from "../components/RegisterUserList.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import { useToggleContainer } from "@/stores/toggleContainer";

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />
  <main>
    <BaseHeading title="Teams" />
    <div class="teams__container">
      <InviteMemberList />
      <RegisterUserList />
    </div>
  </main>
</template>

<style scoped></style>
