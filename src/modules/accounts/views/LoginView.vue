<script setup>
import { ref } from "vue";

import H1Text from "@/components/H1Text.vue";
import PText from "@/components/PText.vue";
import BaseInput from "@/components/BaseInput.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";

import Api from "@/services/API";

const form = ref({
  email: "",
  password: "",
});
const errors = ref([]);

async function handleLogin() {
  errors.value = [];

  // Email validation
  const { isValid: validE, errorMessage: errorE } = validateEmail(
    form.value.email
  );

  if (!validE) {
    errors.value.push(errorE);
  }

  // Password validation
  const { isValid: validP, errorMessage: errorP } = validatePassword(
    form.value.password
  );

  if (!validP) {
    errors.value.push(errorP);
  }

  // if no errors
  if (errors.value.length === 0) {
    const userObj = {
      email: form.value.email,
      password: form.value.password,
    };

    // TODO: Services directory and cors error
    try {
      // CSRF cookie request
      const firstResponse = await Api.get("/sanctum/csrf-cookie");
      console.log(firstResponse);

      // login user
      const response = await Api.post(
        "/api/user/login",
        JSON.stringify(userObj)
      );
      console.log(response);
    } catch (error) {
      console.log(error);
    }
  }
}
</script>

<template>
  <H1Text text="Log in to Ticker." />
  <PText text="Welcome back!" />

  <!-- Show error messages -->
  <ul v-if="errors.length">
    <li v-for="error in errors" :key="error">
      {{ error }}
    </li>
  </ul>

  <form @submit.prevent="handleLogin">
    <div class="mb-3">
      <BaseInput
        type="email"
        name="email"
        label="Email address"
        v-model="form.email"
      />
      <BaseInput
        type="password"
        name="password"
        label="Password"
        v-model="form.password"
      />
    </div>

    <button type="submit" class="btn btn-secondary">Log in</button>
  </form>
</template>
