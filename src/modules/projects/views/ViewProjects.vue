<script setup>
import { useToggleContainer } from "@/stores/toggleContainer";

import TheSidebar from "@/components/TheSidebar.vue";
import BaseHeading from "@/components/BaseHeading.vue";

import ProjectList from "../components/ProjectList.vue";

import ProjectAdd from "../components/ProjectAdd.vue";
import ProjectOpen from "../components/ProjectOpen.vue";
import { ref } from "vue";

const showProject = ref(false);

function OpenProjects(){
showProject.value = !showProject.value;
}

// toggle bootstrap container
const storeToggleContainer = useToggleContainer();
storeToggleContainer.userStatus = false;
</script>

<template>
  <TheSidebar />
  <main>
    <div v-if="showProject">
      <ProjectOpen />
      
    </div>
    <div v-else>
      <BaseHeading title="Projects" />
      <ProjectAdd />
      <ProjectList :OpenProjects="OpenProjects" />
    </div>
  </main>
</template>
