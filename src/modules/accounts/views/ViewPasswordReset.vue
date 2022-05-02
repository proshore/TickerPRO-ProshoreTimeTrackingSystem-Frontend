<script setup>
import { ref } from "vue";
import { useRoute } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validatePasswordConfirm from "@/utils/validatePasswordConfirm";

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

/**
 * TODO: Remove novalidate from FORM
 */
async function handlePasswordReset() {
  emailError.value = "";
  passwordError.value = "";
  passwordConfirmationError.value = "";

  const { isValid: validE, errorMessage: errorE } = validateEmail(
    form.value.email
  );
  const { isValid: validP, errorMessage: errorP } = validatePassword(
    form.value.password
  );
  const { isValid: validPC, errorMessage: errorPC } = validatePasswordConfirm(
    form.value.password_confirmation,
    form.value.password
  );

  if (!validE) {
    emailError.value = errorE;
    form.value.email = "";
  }

  if (!validP) {
    passwordError.value = errorP;
    form.value.password = "";
  }

  if (!validPC) {
    passwordConfirmationError.value = errorPC;
    form.value.password_confirmation = "";
  }

  // if no errors
  if (
    (emailError.value === "") & (passwordError.value === "") &&
    passwordConfirmationError.value === ""
  ) {
    console.log("Form submitted successfully");
  }
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
