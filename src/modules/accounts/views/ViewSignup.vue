<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter } from "vue-router";

import BaseInput from "@/components/BaseInput.vue";
import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validateName from "@/utils/validateName";
import validateConfirmPassword from "@/utils/validateConfirmPassword";

import { signupUser } from "../services";

import logo from "@/assets/images/logo.svg";

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
    form.value.passwordConfirmation === ""
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
    try {
      await signupUser(data);
      router.push({ name: "login" });
    } catch (error) {
      if (error.response.status === 401) {
        errors.value.push("Please enter an valid email.");
        form.value.email = "";
      } else {
        errors.value.push("Something went wrong, please try again later.");
        form.value.password = "";
        form.value.passwordConfirmation = "";
      }
    }
  }
}
</script>

<template>
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading title="Sign up" shortDesc="Start using Ticker for free." />

    <!-- Show error messages -->
    <div v-if="errors.length">
      <div v-for="error in errors" :key="error">
        <BaseAlert :message="error" hex-font-color="ff0000" />
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
          name="confirm-password"
          label="Confirm password"
          v-model="form.passwordConfirmation"
          :error="confirmPasswordError"
        />
      </div>

      <div class="d-grid">
        <button
          type="submit"
          class="btn btn-primary text-white"
          :disabled="disableSignupButton"
        >
          Sign up
        </button>
      </div>

      <p class="mt-4">
        Already have an account?
        <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal"
          ><u>Login</u></RouterLink
        >
      </p>
    </form>
  </div>
</template>
