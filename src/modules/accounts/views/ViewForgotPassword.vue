<script setup>
import { ref } from "vue";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseErrorUI from "@/components/BaseErrorUI.vue";

import validateEmail from "@/utils/validateEmail";

import { resetPassword } from "../services";

const email = ref("");
const emailError = ref("");
const errors = ref([]);

async function handleResetPassword() {
  emailError.value = "";
  errors.value = [];

  const { isValid: validE, errorMessage: errorE } = validateEmail(email.value);

  if (!validE) {
    emailError.value = errorE;
    email.value = "";
  }

  if (emailError.value === "" && errors.value.length === 0) {
    try {
      const response = await resetPassword(email.value);
      const { status, statusText } = response;
      if (status === 200 && statusText === "OK") {
        console.log("Email send successfully");
      }
    } catch (error) {
      errors.value.push("Something went wrong, please try again later");
      email.value = "";
    }
  }
}
</script>

<template>
  <BaseFormHeading
    title="Reset password"
    shortDesc="Forgotten your password? Enter your email address below, and we'll email instructions for setting a new one."
  />

  <!-- Show error messages -->
  <div v-if="errors.length">
    <div v-for="error in errors" :key="error">
      <BaseErrorUI :error="error" />
    </div>
  </div>

  <form @submit.prevent="handleResetPassword">
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
