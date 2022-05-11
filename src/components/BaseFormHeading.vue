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
  <h2 class="form-heading-title" v-text="title" />
  <p class="form-heading-description" v-text="shortDesc" />
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
