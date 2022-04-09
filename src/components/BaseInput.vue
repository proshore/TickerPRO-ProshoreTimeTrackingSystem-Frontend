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
});
</script>

<template>
  <label :for="name" class="form-label"
    >{{ label }} <span class="required-asterisk">*</span></label
  >
  <input
    :type="type"
    class="form-control mb-3"
    :id="name"
    :name="name"
    :value="modelValue"
    @input="$emit('update:modelValue', $event.target.value)"
    required
  />
</template>

<style>
.required-asterisk {
  color: red;
}
</style>
