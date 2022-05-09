<script setup>
import { ref } from "vue";

const props = defineProps({
  message: {
    type: String,
    required: true,
  },
  hexFontColor: {
    type: String,
    required: false,
    default: "9D9D9D",
  },
});

const styleObject = ref({
  color: `#${props.hexFontColor}`,
  borderWidth: "2px",
  borderStyle: "solid",
  borderColor: `${props.hexFontColor}`,
});
</script>

<template>
  <span class="alert-message" v-if="message" :style="styleObject">{{
    message
  }}</span>
</template>

<style lang="scss">
.alert-message {
  display: block;
  font-weight: 400;
  padding: 0.4rem 1.2rem;
  margin: 0.8rem 0;
  border-radius: 5px;
}
</style>
