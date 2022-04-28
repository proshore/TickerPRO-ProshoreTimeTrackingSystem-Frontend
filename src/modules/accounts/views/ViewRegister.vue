<script setup>
import { useRouter } from "vue-router";
import H1Text from "@/components/H1Text.vue";
import PText from "@/components/PText.vue";

const router = useRouter();

setTimeout(() => {
  router.push("/accounts/login");
}, 4000);
</script>

<template>
  <div class="container-fuild bg-light p-5 m-5">
    <div class="container px-3">
      <H1Text text="Ticker" />
    </div>

    <div class="container p-4 shadow-lg">
      <h3>Hello!</h3>

      <div class="my-4">
        <PText class="lead my-3" text="Registration has been Successful" />
      </div>
    </div>
  </div>
</template>
