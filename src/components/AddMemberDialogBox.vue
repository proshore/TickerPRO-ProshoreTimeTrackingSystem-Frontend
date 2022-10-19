<template>
    <div class="popup">
      <div class="popup-inner">
        <div class="d-flex justify-content-between">
          <div class="d-flex gap-3 text-secondary">
            <i class="bi bi-person-fill h4"></i>
            <p class="h5">Add New Members</p>
          </div>
          <button
            @click="closeDelete"
            type="button"
            class="btn-close"
            data-cy="clearFieldWhenClose"
          ></button>
        </div>
        <p>Add a new member to Proshore Bootcamp</p>
  
        <form action="">
          <BaseInput />
          <table>
            <tr class="border d-flex justify-content-between">
              <td class="td">Nirmal Shrestha</td>
            </tr>
            <tr class="border d-flex justify-content-between">
              <td class="td">Promise Rizal</td>
            </tr>
            <tr class="border d-flex justify-content-between align-items-center">
              <td class="td">Surya Shrestha</td>
            </tr>
            <tr class="border d-flex justify-content-between align-items-center">
              <td class="td">Nischal Khadka</td>
            </tr>
          </table>
        </form>
  
        <div class="my-3 p-2">
          <button class="btn btn-outline-secondary" @click="closeDelete">
            Cancel
          </button>
          <button class="btn btn-outline-primary mx-2">Save</button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import BaseInput from "@/components/BaseInput.vue";
  const props = defineProps({
    closeDelete: Function,
  });
  const { closeDelete } = props;
  
  </script>
  
  <style scoped>
  table,
  tr {
    border-collapse: separate;
    border-spacing: 0 10px;
    width: 100%;
  }
  th,
  td {
    text-align: center;
    padding: 15px;
  }
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
    width: 50vh;
    padding: 22px;
    border-radius: 10px;
  }
  .warning {
    border: 2px dotted red;
    padding: 10px;
  }
  </style>
  