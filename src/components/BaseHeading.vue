<script setup>
defineProps({
  title: {
    type: String,
    required: true,
  },
  userName: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="base-heading mb-4">
    <h1 class="fs-3 fw-bolder" v-text="title" />
    <h4 class="text-secondary fs-5" v-text="userName" />
  </div>
</template>

<style lang="scss">
.base-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
