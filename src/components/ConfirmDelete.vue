<template>
    <div class="popup">
      <div class="popup-inner">
        <div class="d-flex align-items-center justify-content-between">
          <div class="d-flex gap-3">
            <i class="bi bi-person-fill h4 text-danger"></i>
            <p class="h5">Remove Member</p>
          </div>
          <button
            @click="closeDelete"
            type="button"
            class="btn-close"
            data-cy="clearFieldWhenClose"
          ></button>
        </div>
        <p>Are you sure you want to remove member <span class="text-primary">"Surya Shrestha"</span> from this project?</p>
        <p>You can't undo this action.</p>
  
        <div class="warning">
          <div class="d-flex text-primary">
            <i class="bi bi-x h3"></i>
            <p class="my-1 h5">Warning</p>
          </div>
          <p class="text-primary">
            By removing this member he/she won't be able to view this project.
          </p>
        </div>
        <div class="my-3 p-2">
          <button class="btn btn-outline-secondary" @click="closeDelete">Cancel</button>
          <button class="btn btn-outline-primary mx-2">Remove</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup   >
  const props = defineProps({
      closeDelete: Function
  })
  const {closeDelete} = props
  </script>
  
  <style scoped>
  .popup {
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    z-index: 1;
    background-color: rgba(0, 0, 0, 0.2);
  
    display: flex;
    align-items: center;
    justify-content: center;
  }
  .popup-inner {
    background: #fff;
    width: 80vh;
    padding: 22px;
    border-radius: 10px;
  }
  .warning {
    border: 2px dotted #FA6731;
    padding: 10px;
  }
  </style>
  