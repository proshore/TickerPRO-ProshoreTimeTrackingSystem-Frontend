<script setup>
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import ViewAddProject from "./ViewAddProject.vue";
</script>

<template>
  <TheSidebar />

  <main>
    <BaseHeading title="Projects" user-name="Asim" />
    <ViewAddProject />
    <TheLogoutLink />
  </main>
</template>
