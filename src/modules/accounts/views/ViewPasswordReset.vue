<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validatePasswordConfirm from "@/utils/validatePasswordConfirm";

import { passwordReset } from "../services";

const route = useRoute();
const router = useRouter();

const token = route.query.token;

const form = ref({
  email: "",
  password: "",
  passwordConfirmation: "",
});
const emailError = ref("");
const passwordError = ref("");
const passwordConfirmationError = ref("");
const error = ref("");

async function handlePasswordReset() {
  emailError.value = "";
  passwordError.value = "";
  passwordConfirmationError.value = "";
  error.value = "";

  const { isValid: validE, errorMessage: errorE } = validateEmail(
    form.value.email
  );
  const { isValid: validP, errorMessage: errorP } = validatePassword(
    form.value.password
  );
  const { isValid: validPC, errorMessage: errorPC } = validatePasswordConfirm(
    form.value.passwordConfirmation,
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
    form.value.passwordConfirmation = "";
  }

  // if no errors
  if (
    (emailError.value === "") & (passwordError.value === "") &&
    passwordConfirmationError.value === ""
  ) {
    const data = {
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.passwordConfirmation,
      token,
    };
    try {
      await passwordReset(data);
      router.push({ name: "login" });
    } catch (err) {
      error.value = "Something went wrong, please try again later.";
    }
  }
}
</script>

<template>
  <BaseFormHeading
    title="Password Reset"
    shortDesc="Enter the following fields to reset password."
  />

  <!-- Error -->
  <div v-if="error" class="alert alert-danger text-danger" role="alert">
    {{ error }}
  </div>

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
      label="New password"
      v-model="form.password"
      :error="passwordError"
    />

    <BaseInput
      type="password"
      name="password-confirmation"
      label="Confirm password"
      v-model="form.passwordConfirmation"
      :error="passwordConfirmationError"
    />

    <button type="submit" class="btn btn-primary mt-3">Password reset</button>
  </form>
</template>
