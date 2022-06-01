<script setup>
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import ViewAddProjectList from "./viewAddProjectList.vue";

import ViewAddProject from "./ViewAddProject.vue";
</script>

<template>
  <TheSidebar />
  <main>
    <BaseHeading title="Projects" user-name="Bimlendra" />
    <ViewAddProject />
    <TheLogoutLink />
    <ViewAddProjectList />
  </main>
</template>
