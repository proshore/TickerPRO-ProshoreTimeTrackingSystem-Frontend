<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <RouterLink :to="{ name: 'logout' }">Logout</RouterLink>
</template>
