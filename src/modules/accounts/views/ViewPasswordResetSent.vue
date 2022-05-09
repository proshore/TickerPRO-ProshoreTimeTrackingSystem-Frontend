<script setup>
import BaseFormHeading from "@/components/BaseFormHeading.vue";

import logo from "@/assets/images/logo.svg";
import mailSentSuccess from "@/assets/images/mail-sent-success.svg";
</script>

<template>
  <img :src="logo" alt="Ticker logo" class="logo" />

  <div class="d-grid col-md-8 col-lg-5 mx-auto">
    <BaseFormHeading
      title="Check your mail"
      shortDesc="Check your mail inbox for instructions from us on how to reset your password."
    />

    <img :src="mailSentSuccess" alt="Mail sent success logo" />

    <p class="mt-4">
      Never mind!
      <RouterLink :to="{ name: 'login' }" class="text-secondary fw-normal"
        ><u> Take me back to login</u></RouterLink
      >
    </p>
  </div>
</template>
