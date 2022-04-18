<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import H1Text from "@/components/H1Text.vue";
import PText from "@/components/PText.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseErrorUI from "@/components/BaseErrorUI.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

import API from "@/services/API";

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

  // Email validation
  const { isValid: validE, errorMessage: errorE } = validateEmail(
    form.value.email
  );

  if (!validE) {
    emailError.value = errorE;
    form.value.email = "";
  }

  // Password validation
  const { isValid: validP, errorMessage: errorP } = validatePassword(
    form.value.password
  );

  if (!validP) {
    passwordError.value = errorP;
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
      const response = await API.post("/api/user/login", userObj);
      const { data, status, statusText } = response;
      if (data && status === 200 && statusText === "OK") {
        router.push({ name: "dashboard" });
      }
    } catch (error) {
      if (error.response.status === 401) {
        errors.value.push("Invalid email or password.");
        form.value.email = "";
        form.value.password = "";
      }
    }
  }
}
</script>

<template>
  <H1Text text="Log in to Ticker." />
  <PText text="Welcome back!" />

  <!-- Show error messages -->
  <div v-if="errors.length">
    <div v-for="error in errors" :key="error">
      <BaseErrorUI :error="error" />
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

    <button
      type="submit"
      class="btn btn-secondary"
      :disabled="disableLoginButton"
    >
      Log in
    </button>
  </form>
</template>

<style>
.error-list {
  color: red;
}
</style>
