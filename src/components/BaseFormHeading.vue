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
  <h1 class="form-heading-title">{{ title }}</h1>
  <p class="form-heading-description">{{ shortDesc }}</p>
</template>

<style lang="scss">
.form-heading-title {
  margin-top: 1em;
  font-weight: 600;
}

.form-heading-description {
  margin-bottom: 1em;
  color: #9e9c9c;
}
</style>
