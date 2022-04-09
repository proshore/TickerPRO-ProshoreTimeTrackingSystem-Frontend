<script setup>
import { ref } from "vue";

import H1Text from "@/components/H1Text.vue";
import PText from "@/components/PText.vue";
import BaseInput from "@/components/BaseInput.vue";

const form = ref({
  email: "",
  password: "",
});

function handleLogin() {
  console.log(form.value);
}
</script>

<template>
  <H1Text text="Log in to Ticker." />
  <PText text="Welcome back!" />

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
