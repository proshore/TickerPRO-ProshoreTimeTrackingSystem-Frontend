<script setup>
import BaseHeading from "@/components/BaseHeading.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import InviteMemberList from "../components/InviteMemberList.vue";
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Teams" />

    <InviteMemberList />
  </main>
</template>
