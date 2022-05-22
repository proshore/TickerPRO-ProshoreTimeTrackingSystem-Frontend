<script setup>
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
    <h4 class="text-secondary fs-6 border rounded px-2 py-1" v-text="name" />
  </div>
</template>

<style lang="scss">
.base-heading {
  display: flex;
  justify-content: space-between;
  align-items: center;
}
</style>
