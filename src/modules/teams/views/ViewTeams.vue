<script setup>
import InviteMemberList from "../components/InviteMemberList.vue";
import AllUserList from "../components/AllUsersList.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import { useToggleContainer } from "@/stores/toggleContainer";

import BaseHeading from "@/components/BaseHeading.vue";
import TheSidebar from "@/components/TheSidebar.vue";

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
      <AllUserList />
    </div>
  </main>
</template>

<style scoped></style>