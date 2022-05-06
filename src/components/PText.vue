<script setup>
defineProps({
  text: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <p class="mb-5">{{ text }}</p>
</template>
