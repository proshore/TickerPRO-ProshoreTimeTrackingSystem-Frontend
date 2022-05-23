<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink :to="{ name: 'logout' }" class="text-dark">Logout</RouterLink>
</template>
