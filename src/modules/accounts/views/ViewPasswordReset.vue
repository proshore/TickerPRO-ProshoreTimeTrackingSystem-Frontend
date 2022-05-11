<script setup>
import { ref } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validatePasswordConfirm from "@/utils/validatePasswordConfirm";

import { passwordReset } from "../services";

import logo from "@/assets/images/logo.svg";

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

  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    form.value.email
  );
  const { isValid: validPassword, errorMessage: errorPassword } =
    validatePassword(form.value.password);
  const { isValid: validConfirmPassword, errorMessage: errorConfirmPassword } =
    validatePasswordConfirm(
      form.value.passwordConfirmation,
      form.value.password
    );

  if (!validEmail) {
    emailError.value = errorEmail;
    form.value.email = "";
  }

  if (!validPassword) {
    passwordError.value = errorPassword;
    form.value.password = "";
  }

  if (!validConfirmPassword) {
    passwordConfirmationError.value = errorConfirmPassword;
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
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading
      title="Password Reset"
      shortDesc="Reset password to restart your journey with Ticker."
    />

    <!-- Error -->
    <BaseAlert :message="error" hex-font-color="ff0000" />

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

      <div class="d-grid">
        <button type="submit" class="btn btn-primary text-white mt-3">
          Password reset
        </button>
      </div>

      <p class="mt-4">
        Never mind!
        <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal"
          ><u> Take me back to login</u></RouterLink
        >
      </p>
    </form>
  </div>
</template>
