<script setup>
import { RouterLink } from "vue-router";

import getUser from "@/utils/getUser";

const name = getUser().user.name.split(" ")[0];

defineProps({
  title: {
    type: String,
    required: true,
  },
});
</script>

<template>
  <div class="base-heading mb-4">
    <h1 class="fs-3 fw-bolder" v-text="title" />
    <div>
      <span class="text-secondary fs-6 border rounded px-2 text-center py-1">
        {{ name }}
      </span>
      <RouterLink :to="{ name: 'logout' }" title="logout"
        ><svg
          xmlns="http://www.w3.org/2000/svg"
          class="h-6 w-6"
          fill="none"
          viewBox="0 0 24 24"
          stroke="currentColor"
          stroke-width="2"
        >
          <path
            stroke-linecap="round"
            stroke-linejoin="round"
            d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1"
          /></svg
      ></RouterLink>
    </div>
  </div>
</template>

<style lang="scss">
.base-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;

  svg {
    width: 2rem;
    color: #000;
    padding-left: 0.5rem;

    &:hover {
      color: #fa602d;
    }
  }
}
</style>
