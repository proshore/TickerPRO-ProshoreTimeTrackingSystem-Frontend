<script setup>
import { ref } from "vue";
import { useRoute, RouterLink } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import signUpPassword from "@/utils/signUpPassword";
import validatePasswordConfirm from "@/utils/validatePasswordConfirm";

import { passwordReset } from "../services";

import logo from "@/assets/images/logo.svg";
import PasswordToggle from "@/components/PasswordToggle.vue";

const route = useRoute();

const token = route.query.token;
const email = route.query.email;

const form = ref({
  email: email,
  password: "",
  passwordConfirmation: "",
});
const emailError = ref("");
const passwordError = ref("");
const passwordConfirmationError = ref("");
const error = ref("");
const passwordResetSuccess = ref(false);

// FOR PASSWORD HIDE/SHOW TOGGLE FUNCTIONALITY
let showPassword = ref(false);
let showConfirmPassword = ref(false);

async function handlePasswordReset() {
  emailError.value = "";
  passwordError.value = "";
  passwordConfirmationError.value = "";
  error.value = "";
  passwordResetSuccess.value = false;

  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    form.value.email
  );
  const { isValid: validPassword, errorMessage: errorPassword } =
    signUpPassword(form.value.password);
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
    error.value.length === 0 &&
    !emailError.value && 
    !passwordError.value &&
    !passwordConfirmationError.value
  ) {
    const data = {
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.passwordConfirmation,
      token,
    };
    try {
      await passwordReset(data);
      passwordResetSuccess.value = true;

      // empty form fields after successful password reset
      form.value.email = "";
      form.value.password = "";
      form.value.passwordConfirmation = "";
    } catch (err) {
      error.value(response.data["message"]);
    }
  }
}
</script>

<template>
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading
      title="Password Reset"
      shortDesc="Reset password to restart your journey with Time Tracker."
    />

    <!-- Reset success -->
    <div v-if="passwordResetSuccess" class="alert alert-success" role="alert">
      Password reset successfully!
      <RouterLink
        :to="{ name: 'login' }"
        class="alert-link text-decoration-underline"
        data-cy="loginAfterResetButton"
        >Login</RouterLink
      >
      to start using Time Tracker.
    </div>

    <!-- Error -->
    <BaseAlert :message="error" hex-font-color="ff0000" />

    <form @submit.prevent="handlePasswordReset">
      <BaseInput
        type="email"
        name="email"
        label="Email address"
        v-model="form.email"
        :error="emailError"
        data-cy="passwordResetEmail"
        :disabled="true"
      />

      <div class="input_form">
        <BaseInput
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="New password"
          v-model="form.password"
          :error="passwordError"
          data-cy="passwordResetPassword"
        />
        <PasswordToggle
          :showPassword="showPassword"
          @togglePassword="showPassword = !showPassword"
        >
        </PasswordToggle>
      </div>
      <div class="input_form_confirmPassword">
        <BaseInput
          :type="showConfirmPassword ? 'text' : 'password'"
          name="password-confirmation"
          label="Confirm password"
          v-model="form.passwordConfirmation"
          :error="passwordConfirmationError"
          data-cy="passwordResetConfirmation"
        />
        <PasswordToggle
          :showPassword="showConfirmPassword"
          @togglePassword="showConfirmPassword = !showConfirmPassword"
        >
        </PasswordToggle>
      </div>

      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-primary text-white mt-3"
          data-cy="passwordResetSubmit"
        >
          Password reset
        </button>
      </div>

      <p class="mt-4">
        Never mind!
        <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal"
          data-cy="backToLoginButton"><u> Take me back to login</u></RouterLink
        >
      </p>
    </form>
  </div>
</template>
