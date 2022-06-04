<script setup>
import InviteMemberList from "../components/InviteMemberList.vue";
import AllUserList from "../components/AllUsersList.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";
</script>
<style scoped></style>
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
