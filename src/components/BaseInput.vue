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
    @input="$emit('update:modelValue', $event.target.value)"
    required
    data-cy="name"
  />
  <div v-if="error" class="form-text text-danger" v-text="error" />
</template>

<style>
.required-asterisk {
  color: red;
}
</style>
