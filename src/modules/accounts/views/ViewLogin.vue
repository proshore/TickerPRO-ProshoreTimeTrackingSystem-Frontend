<script setup>
import { ref, computed } from "vue";
import { useRoute, useRouter, RouterLink } from "vue-router";

import BaseInput from "@/components/BaseInput.vue";
import BaseFormHeading from "@/components/BaseFormHeading.vue";
import BaseAlert from "@/components/BaseAlert.vue";

import validateEmail from "@/utils/validateEmail";
import validatePassword from "@/utils/validatePassword";
import setUser from "@/utils/setUser.js";

import { loginUser } from "../services";

import logo from "@/assets/images/logo.svg";

const router = useRouter();
const route = useRoute();

const next = route.query.next;

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
      const { data, status } = response;
      if (data && status === 200) {
        // set user to local storage
        setUser(data);

        if (next) {
          router.push(next);
        } else {
          router.push({ name: "tracker" });
        }
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

// PASSWORD HIDE/SHOW TOGGLE FUNCTIONALITY START

const passwordFieldType = ref("password");

const switchVisibility = () => {
  let hidePassword = document.getElementById("hidePassword");
  let showPassword = document.getElementById("showPassword");

  if (passwordFieldType.value === "password") {
    passwordFieldType.value = "text";
    hidePassword.style.display = "none";
    showPassword.style.display = "block";
  } else {
    passwordFieldType.value = "password";
    hidePassword.style.display = "block";
    showPassword.style.display = "none";
  }
};

// PASSWORD HIDE/SHOW TOGGLE FUNCTIONALITY END
</script>

<template>
  <img :src="logo" alt="Proshore Ticker logo" class="logo" />

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
        <BaseInput type="email" name="email" label="Email address" v-model="form.email" :error="emailError" />
        <div class="input_form">
          <BaseInput :type="passwordFieldType" name="password" label="Password" v-model="form.password"
            :error="passwordError" />
          <span class="toggle_button">
            <i class="bi bi-eye" @click="switchVisibility" id="showPassword"></i>
            <i class="bi bi-eye-slash" @click="switchVisibility" id="hidePassword"></i>
          </span>
        </div>
      </div>

      <RouterLink :to="{ name: 'passwordForgot' }" class="forgot-password">Forgot password?</RouterLink>

      <div class="d-grid">
        <button type="submit" class="btn btn-primary text-white" :disabled="disableLoginButton">
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


.bi {
  cursor: pointer;
}

.bi-eye {
  display: none;
}

.input_form {
  position: relative;
}

.toggle_button {
  position: absolute;
  top: 4.25rem;
  right: 1rem;
}
</style>
