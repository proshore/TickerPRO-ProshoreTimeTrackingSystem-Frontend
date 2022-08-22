<script setup>
import { ref } from "vue";

let showPassword = ref(false);
</script>

<template>
  <span class="toggle_button">
    <i class="bi toggle_icon" :class="showPassword ? 'bi-eye' : 'bi-eye-slash'" id="showPassword"
      @click="showPassword = !showPassword"></i>
  </span>
</template>

<style>
.input_form {
  position: relative;
}

.toggle_button {
  position: absolute;
  top: 4.25rem;
  right: 1rem;
}

.toggle_icon {
  cursor: pointer;
}
</style>
