<script setup>
import { ref, computed } from "vue";
import { useRouter } from "vue-router";

import H1Text from "@/components/H1Text.vue";
import BaseSpan from "@/components/BaseSpan.vue";
import BaseInput from "@/components/BaseInput.vue";
import BaseErrorUI from "@/components/BaseErrorUI.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import validateName from "@/utils/validateName";
import validateConfirmPassword from "@/utils/validateConfirmPassword";
// import validateToken from "@/utils/validateToken";

import API from "@/services/API";

const router = useRouter();

window.csrfToken = document.querySelector('meta[name="csrf-token"]').content;

// eslint-disable-next-line no-unused-vars
const form = ref({
  name: "",
  email: "",
  password: "",
  password_confirmation: "",
  // token: "",
});

const nameError = ref("");
const emailError = ref("");
const passwordError = ref("");
const confirmpasswordError = ref("");
// const tokenError = ref("");
const errors = ref([]);

// const disableSignupButton = computed(() => {
//   if (
//     form.value.name === "" ||
//     form.value.email === "" ||
//     form.value.password === "" ||
//     form.value.password !== form.value.password_confirmation
//   ) {
//     return true;
//   }
//   return false;
// });

const disableSignupButton = computed(() => {
  return !!(
    form.value.name === "" ||
    form.value.email === "" ||
    form.value.password === "" ||
    form.value.password !== form.value.password_confirmation
  );
});

async function handleSignup() {
  errors.value = [];
  nameError.value = "";
  emailError.value = "";
  passwordError.value = "";
  confirmpasswordError.value = "";
  // tokenError.value = "";

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
    form.value.password_confirmation
  );

  if (!validCP) {
    confirmpasswordError.value = errorCP;
    form.value.password = "";
    form.value.password_confirmation = "";
  }

  // Token validation
  // const { isValid: validT, errorMessage: errorT } = validateToken(
  //   form.value.token
  // );

  // if (!validT) {
  //   tokenError.value = errorT;
  //   form.value.token = "";
  // }

  // if no errors
  if (
    errors.value.length === 0 &&
    !nameError.value &&
    !passwordError.value &&
    !emailError.value &&
    !confirmpasswordError.value
  ) {
    const userObj = {
      name: form.value.name,
      email: form.value.email,
      password: form.value.password,
      password_confirmation: form.value.password_confirmation,
      // token: form.value.token,
    };

    try {
      // Signup user
      API.defaults.withCredentials = false;
      // API.get("/sanctum/csrf-cookie")
      //   .then((resp) => {
      //     console.log("Binita");
      //     console.log(resp.headers["set-cookie"][0]);
      //   })
      //   .catch((error) => console.log(error));

      // axios.get('https://ccbackend.herokuapp.com/sanctum/csrf-cookie').then(resp => {

      // console.log(resp.headers['set-cookie'][0]);
      // }).catch(error => console.log(error))

      const response = await API.post("/api/user/register", userObj);
      const { data } = response;
      if (data) {
        router.push({ name: "/accounts/registersuccess" });
      }
    } catch (error) {
      if (error.response.status === 401) {
        errors.value.push("Invalid password.");
        form.value.password = "";
      } else {
        errors.value.push(
          "Could not Sign Up right now. Please try again later."
        );
        form.value.email = "";
        form.value.password = "";
        form.value.password_confirmation = "";
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
        v-model="form.password_confirmation"
        :error="confirmpasswordError"
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
