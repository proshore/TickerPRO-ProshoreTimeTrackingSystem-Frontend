<script setup>
defineProps({
  type: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  label: {
    type: String,
    required: true,
  },
  modelValue: {
    type: String,
    required: true,
  },
  error: {
    type: String,
    required: true,
  },
  disabled: {
    type: Boolean,
    required: false,
    default: false
  }
});
</script>

<template>
  <label :for="name" class="form-label mt-4"
    >{{ label }} <span class="required-asterisk">*</span></label
  >
  <input
    :type="type"
    class="form-control mt-1"
    :id="name"
    :name="name"
    :value="modelValue"
    :disabled = "disabled"
    @input="$emit('update:modelValue', $event.target.value)"
    required
  />
  <div v-if="error" class="form-text text-danger" v-text="error" />
</template>

<style>
.required-asterisk {
  color: red;
}
</style>
