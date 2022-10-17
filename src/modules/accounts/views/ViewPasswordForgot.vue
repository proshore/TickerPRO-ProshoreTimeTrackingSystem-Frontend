<script setup>
import { ref } from "vue";
import { useRouter, RouterLink } from "vue-router";

import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";

import { passwordResetSend } from "../services";

import logo from "@/assets/images/logo.svg";

const email = ref("");
const emailError = ref("");
const errors = ref([]);

const router = useRouter();

async function handlePasswordForgot() {
  emailError.value = "";
  errors.value = [];

  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    email.value
  );

  if (!validEmail) {
    emailError.value = errorEmail;
    email.value = "";
  }

  if (emailError.value === "" && errors.value.length === 0) {
    try {
      const response = await passwordResetSend(email.value);
      const { status, statusText } = response;
      if (status === 200 && statusText === "OK") {
        router.push({ name: "passwordResetSent" });
      }
    } catch (error) {
      if (error.response.status === 404) {
        errors.value.push(error.response.data.message);
      } else {
        errors.value.push("Something went wrong, please try again later");
      }
      email.value = email;
    }
  }
}
</script>

<template>
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading
      title="Reset password"
      shortDesc="To reset your password, enter the email address you use to login."
    />

    <!-- Show error messages -->
    <div v-if="errors.length">
      <div v-for="error in errors" :key="error">
        <BaseAlert :message="error" hex-font-color="ff0000"/>
      </div>
    </div>

    <form @submit.prevent="handlePasswordForgot">
      <div v-if="form.email">
      <BaseInput
        type="email"
        name="email"
        label="Email address"
        v-model= "form.email"
        :error="emailError"
        data-cy="forgetPasswordEmail"
      />
    </div>

      <div class="d-grid">
        <button class="btn btn-primary mt-3 text-white" data-cy="forgetPasswordResetButton">Get reset link</button>
      </div>
    </form>
    <p class="mt-4">
      Never mind!
      <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal" 
        ><u> Take me back to login</u></RouterLink
      >
    </p>
  </div>
</template>
