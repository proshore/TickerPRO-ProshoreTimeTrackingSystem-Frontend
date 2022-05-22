<script setup>
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import BaseHeading from "@/components/BaseHeading.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import InviteMember from "../components/InviteMember.vue";
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Teams" user-name="Asim" />

    <InviteMember />
    <TheLogoutLink />
  </main>
</template>
