<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import H1Text from "@/components/H1Text.vue";
import BaseSpan from "@/components/BaseSpan.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseErrorUI from "@/components/BaseErrorUI.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validateName from "@/utils/validateName";
import validateConfirmPassword from "@/utils/validateConfirmPassword";

import { signupUser } from "../services";

const router = useRouter();
const route = useRoute();

const token = route.params.token;
const email = route.query.email;

const form = ref({
  name: "",
  email: email,
  password: "",
  passwordConfirmation: "",
});

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const errors = ref([]);

const disableSignupButton = computed(() => {
  if (
    form.value.name === "" ||
    form.value.email === "" ||
    form.value.password === "" ||
    form.value.password !== form.value.passwordConfirmation
  ) {
    return true;
  }
  return false;
});

async function handleSignup() {
  errors.value = [];
  nameError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmPasswordError.value = "";

  //Name validation
  const { isValid: validN, errorMessage: errorN } = validateName(
    form.value.name
  );

  if (!validN) {
    nameError.value = errorN;
    form.value.name = "";
  }

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

  // Confirm Password validation
  const { isValid: validCP, errorMessage: errorCP } = validateConfirmPassword(
    form.value.password,
    form.value.passwordConfirmation
  );

  if (!validCP) {
    confirmPasswordError.value = errorCP;
    form.value.password = "";
    form.value.passwordConfirmation = "";
  }

  if (
    errors.value.length === 0 &&
    !nameError.value &&
    !passwordError.value &&
    !emailError.value &&
    !confirmPasswordError.value
  ) {
    const data = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.passwordConfirmation,
      token,
    };
    console.log(data);
    try {
      await signupUser(data);
      router.push({ name: "login" });
    } catch (error) {
      // console.log(error)
      if (error.response.status === 401) {
        errors.value.push("Invalid password.");
        form.value.password = "";
      } else {
        errors.value.push(error);
        form.value.email = "";
        form.value.password = "";
        form.value.passwordConfirmation = "";
      }
    }
  }
}
</script>
<template>
  <H1Text text="Sign Up" />
  <p>
    Already a member?
    <a href="login"> <BaseSpan text="Log In" class="login" /></a>
  </p>

  <!-- Show error messages -->
  <div v-if="errors.length">
    <div v-for="error in errors" :key="error">
      <BaseErrorUI :error="error" />
    </div>
  </div>

  <form @submit.prevent="handleSignup">
    <div class="mb-3">
      <BaseInput
        type="name"
        name="name"
        label="Full Name"
        v-model="form.name"
        :error="nameError"
      />

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
        name="confirm_password"
        label="Confirm Password"
        v-model="form.passwordConfirmation"
        :error="confirmPasswordError"
      />
    </div>
    <button
      type="submit"
      class="btn btn-primary"
      :disabled="disableSignupButton"
    >
      Sign Up
    </button>
  </form>
</template>

<style>
.login {
  color: rgb(18, 124, 245);
  cursor: pointer;
  font-weight: bold;
}
</style>
