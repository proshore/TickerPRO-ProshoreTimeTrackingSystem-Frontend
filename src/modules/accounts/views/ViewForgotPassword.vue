<script setup>
import { ref } from "vue";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";

const email = ref("");
const emailError = ref("");
</script>

<template>
  <BaseFormHeading
    title="Reset password"
    shortDesc="Forgotten your password? Enter your email address below, and we'll email instructions for setting a new one."
  />

  <form>
    <BaseInput
      type="email"
      name="email"
      label="Email address"
      v-model="email"
      :error="emailError"
    />

    <button class="btn btn-secondary mt-3">Reset password</button>
  </form>
</template>
