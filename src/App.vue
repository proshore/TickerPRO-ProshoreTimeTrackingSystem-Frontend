<script setup></script>

<template>
  <router-link :to="{ name: 'home' }">Home</router-link>
  <router-link :to="{ name: 'addTeam' }">Add Team</router-link>
  <router-view></router-view>
</template>

<style></style>
