<script setup>
defineProps({
  error: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <span class="error-message" v-if="error">{{ error }}</span>
</template>

<style lang="scss">
.error-message {
  display: block;
  color: red;
  font-weight: 400;
  border: 2px solid red;
  padding: 0.4rem 1.2rem;
  margin: 0.8rem 0;
  border-radius: 5px;
}
</style>
