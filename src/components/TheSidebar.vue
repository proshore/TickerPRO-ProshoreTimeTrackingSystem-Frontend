<script setup>
import { RouterLink } from "vue-router";
</script>

<template>
  <nav>
    <RouterLink :to="{ name: 'teams' }">Teams</RouterLink>
    <RouterLink :to="{ name: 'tracker' }">Tracker</RouterLink>
  </nav>
</template>

<style lang="scss">
nav {
  max-width: 200px;
  display: flex;
  justify-content: space-between;
  margin-top: 1rem;
  margin-bottom: 2rem;

  a {
    color: #000;
  }

  .router-link-active {
    border-bottom: 2px solid #fa602d;
  }
}
</style>
