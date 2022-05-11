<script setup>
import { ref, computed } from "vue";
import { useRouter, RouterLink } from "vue-router";

import BaseInput from "@/components/BaseInput.vue";
import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

import { loginUser } from "../services";

import logo from "@/assets/images/logo.svg";

const router = useRouter();

const form = ref({
  email: "",
  password: "",
});
const emailError = ref("");
const passwordError = ref("");
const errors = ref([]);

const disableLoginButton = computed(() => {
  if (form.value.email === "" || form.value.password === "") {
    return true;
  }
  return false;
});

async function handleLogin() {
  errors.value = [];
  emailError.value = "";
  passwordError.value = "";

  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    form.value.email
  );
  const { isValid: validPassword, errorMessage: errorPassword } =
    validatePassword(form.value.password);

  if (!validEmail) {
    emailError.value = errorEmail;
    form.value.email = "";
  }

  if (!validPassword) {
    passwordError.value = errorPassword;
    form.value.password = "";
  }

  // if no errors
  if (errors.value.length === 0 && !passwordError.value && !emailError.value) {
    const userObj = {
      email: form.value.email,
      password: form.value.password,
    };

    try {
      // login user
      const response = await loginUser(userObj);
      const { data, status, statusText } = response;
      if (data && status === 200 && statusText === "OK") {
        router.push({ name: "dashboard" });
      }
    } catch (error) {
      if (error.message === "Network Error") {
        errors.value.push("Something went wrong, please try again later.");
      } else if (error.response.status === 401) {
        errors.value.push("Please enter valid email or password.");
        form.value.email = "";
        form.value.password = "";
      } else {
        errors.value.push("Could not login right now. Please try again later.");
        form.value.email = "";
        form.value.password = "";
      }
    }
  }
}
</script>

<template>
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading title="Log in" shortDesc="Welcome back!" />

    <!-- Show error messages -->
    <div v-if="errors.length">
      <div v-for="error in errors" :key="error">
        <BaseAlert :message="error" hex-font-color="ff0000" />
      </div>
    </div>

    <form @submit.prevent="handleLogin">
      <div class="mb-3">
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
      </div>

      <RouterLink :to="{ name: 'passwordForgot' }" class="forgot-password"
        >Forgot password?</RouterLink
      >

      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-primary text-white"
          :disabled="disableLoginButton"
        >
          Log in
        </button>
      </div>
    </form>
  </div>
</template>

<style>
.forgot-password {
  font-size: 0.8rem;
  color: #9e9c9c;
  display: block;
  margin-bottom: 1em;
}
</style>
