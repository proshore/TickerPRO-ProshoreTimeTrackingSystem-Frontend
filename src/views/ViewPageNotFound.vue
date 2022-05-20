<script setup>
import { RouterLink } from "vue-router";

import logo from "@/assets/images/logo.svg";
import pageNotFound from "@/assets/images/page-not-found.svg";
</script>

<template>
  <div>
    <img :src="logo" alt="Ticker logo" class="logo" />
    <div class="d-grid col-md-6 col-lg-5 mx-auto text-md-center">
      <h1 class="fs-3 text-primary fw-bold">Oops! That Page can't be found.</h1>
      <p>It looks like nothing was found at this location.</p>
      <div class="btn btn-sm home-button">
        <RouterLink :to="{ name: 'home' }">Go to Home</RouterLink>
      </div>
    </div>

    <div class="d-flex page-not-found">
      <img :src="pageNotFound" alt="Page Not Found Image" />
    </div>
  </div>
</template>

<style scoped>
.home-button {
  background-color: #040458;
  width: 30%;
  margin: 0 auto;
}
.home-button a {
  color: white;
}
.page-not-found {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.page-not-found img {
  height: 400px;
}
</style>
