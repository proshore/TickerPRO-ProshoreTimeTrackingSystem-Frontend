<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";

const route = useRoute();
const token = route.query.token;

const form = ref({
  email: "",
  password: "",
  password_confirmation: "",
});
const emailError = ref("");
const passwordError = ref("");
const passwordConfirmationError = ref("");

async function handlePasswordReset() {
  console.log(form.value);
  console.log(token);
}
</script>

<template>
  <BaseFormHeading
    title="Password Reset"
    shortDesc="Enter the following fields to reset password."
  />
  <form @submit.prevent="handlePasswordReset">
    <BaseInput
      type="email"
      name="email"
      label="Email address"
      v-model="form.email"
      :error="emailError"
    />

    <BaseInput
      type="password"
      name="password"
      label="Password"
      v-model="form.password"
      :error="passwordError"
    />

    <BaseInput
      type="password"
      name="password-confirmation"
      label="Confirm password"
      v-model="form.password_confirmation"
      :error="passwordConfirmationError"
    />

    <button type="submit" class="btn btn-primary mt-3">Password reset</button>
  </form>
</template>
