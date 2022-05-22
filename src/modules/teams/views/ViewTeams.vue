<script setup>
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import InviteMemberList from "../components/InviteMemberList.vue";
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Teams" user-name="Asim" />

    <TheLogoutLink />

    <InviteMemberList />
  </main>
</template>
