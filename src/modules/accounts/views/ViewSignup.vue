<script setup>
import { ref, computed } from "vue";
import { useRoute } from "vue-router";

import BaseInput from "@/components/BaseInput.vue";
import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import signUpPassword from "@/utils/signUpPassword";
import validateName from "@/utils/validateName";
import validatePasswordConfirm from "@/utils/validatePasswordConfirm";
import PasswordToggle from "@/components/PasswordToggle.vue";

import { signupUser } from "../services";
import { useToast } from "vue-toast-notification";
import logo from "@/assets/images/logo.svg";

const route = useRoute();

const token = route.params.token;
const email = route.query.email;
const name = route.query.name;

let showPassword = ref(false);
let showConfirmPassword = ref(false);
const $toast = useToast();
const passwordConfirmationError = ref("");

const form = ref({
  name: name,
  email: email,
  password: "",
  passwordConfirmation: "",
});

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmPasswordError = ref("");
const errors = ref([]);
const signupSuccess = ref(false);

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
  passwordConfirmationError.value = "";
  signupSuccess.value = false;

  const { isValid: validName, errorMessage: errorName } = validateName(
    form.value.name
  );
  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    form.value.email
  );
  const { isValid: validPassword, errorMessage: errorPassword } =
    signUpPassword(form.value.password);
  const { isValid: validConfirmPassword, errorMessage: errorConfirmPassword } =
  validatePasswordConfirm(
      form.value.password,
      form.value.passwordConfirmation
    );

  if (!validName) {
    nameError.value = errorName;
    form.value.name = "";
  }

  if (!validEmail) {
    emailError.value = errorEmail;
    form.value.email = "";
  }

  if (!validPassword) {
    passwordError.value = errorPassword;
    form.value.password = "";
  }

  if (!validConfirmPassword) {
    confirmPasswordError.value = errorConfirmPassword;
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
      signupSuccess.value = true;

      // empty form fields after successful signup
      form.value.name = "";
      form.value.email = "";
      form.value.password = "";
      form.value.passwordConfirmation = "";
    } catch (error) {
      if (error.response.status === 401) {
        errors.value.push("Please enter an valid email.");
        form.value.email = "";
      } 
      else {
        $toast.error("You have been revoked");
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
    <BaseFormHeading title="Sign up" shortDesc="Start using Time Tracker for free."  />

    <!-- Signup success -->
    <div v-if="signupSuccess" class="alert alert-success" role="alert" >
      Signup successfully!
      <RouterLink :to="{ name: 'login' }" class="alert-link text-decoration-underline" >Login</RouterLink>
      to start using Time Tracker.
    </div>

    <!-- Reset success -->
    <div v-if="passwordResetSuccess" class="alert alert-success" role="alert" >
      Password reset successfully!
      <RouterLink :to="{ name: 'login' }" class="alert-link text-decoration-underline">Login</RouterLink>
      to start using Time Tracker.
    </div>

    <!-- Show error messages -->
    <div v-if="errors.length">
      <div v-for="error in errors" :key="error">
        <BaseAlert :message="error" hex-font-color="ff0000" />
      </div>
    </div>

    <form @submit.prevent="handleSignup">
      <div class="mb-3">
          <div v-if = '!form.name'>
            <BaseInput
            type="text"
            name="name"
            label="Full Name"
            v-model="form.name"
            :error="nameError"
            :disabled = false
            data-cy="signUpName" />
          </div>
          <div v-else>
            <BaseInput
            type="text"
            name="name"
            label="Full Name"
            v-model="form.name"
            :error="nameError"
            :disabled = true
            data-cy="signUpName" />
          </div>

          <div v-if = '!form.email'>
            <BaseInput
            type="text"
            name="email"
            label="Email Adress"
            v-model="form.email"
            :error="emailError"
            :disabled = false
            data-cy="signUpEmail" />
          </div>
          <div v-else>
            <BaseInput
            type="text"
            name="email"
            label="Email Address"
            v-model="form.email"
            :error="emailError"
            :disabled = true
            data-cy="signUpEmail" />
          </div>
          
      <div class="input_form">
        <BaseInput
          :type="showPassword ? 'text' : 'password'"
          name="password"
          label="Password"
          v-model="form.password"
          :error="passwordError"
          data-cy="signUpPassword"
        />
        <PasswordToggle
          :showPassword="showPassword"
          @togglePassword="showPassword = !showPassword"
          >
        </PasswordToggle>
      </div>
      <div class="input_form">
        <BaseInput
        :type="showConfirmPassword ? 'text' : 'password'"
        name="confirm-password"
        label="Confirm password"
        v-model="form.passwordConfirmation"
        :error="confirmPasswordError"
        data-cy="signUpConfirmPassword"
            />
            <PasswordToggle
              :showPassword="showConfirmPassword"
              @togglePassword="showConfirmPassword = !showConfirmPassword"
              >
            </PasswordToggle>
        </div>
        </div>
          
          <div class="d-grid">
        <button type="submit" class="btn btn-primary text-white" :disabled="disableSignupButton" data-cy="signUpSubmit">
          Sign up
        </button>
      </div>

      <p class="mt-4">
        Already have an account?
        <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal" ><u>Login</u></RouterLink>
      </p>
    </form>
    </div>
</template>
