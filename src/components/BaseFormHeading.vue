<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  shortDesc: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <h1>{{ title }}</h1>
  <p>{{ shortDesc }}</p>
</template>
