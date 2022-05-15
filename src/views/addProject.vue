<script setup>
import { ref } from "vue";
import validateProjectName from "@/utils/validateProjectName";
import validateClientName from "@/utils/validateClientName";
import validateBilling from "@/utils/validateBilling";

const user = ref({
  projectname: "",
  clientname: "",
  billing: "",
  valid: true,
  message: null,
});

const errorProjectName = ref("");
const errorClientName = ref("");
const errorBilling = ref("");

const addProject = () => {
  errorProjectName.value = "";
  errorClientName.value = "";
  errorBilling.value = "";

  const { isValid: validN, errorMessage: errorN } = validateProjectName(
    user.value.projectname
  );
  if (!validN) {
    errorProjectName.value = errorN;
    user.value.projectname = "";
  }

  const { isValid: validCN, errorMessage: errorCN } = validateClientName(
    user.value.clientname
  );
  if (!validCN) {
    errorClientName.value = errorCN;
    user.value.clientname = "";
  }

  const { isValid: validB, errorMessage: errorB } = validateBilling(
    user.value.clientname
  );
  if (!validB) {
    errorBilling.value = errorB;
    user.value.billing = "";
  }

  try {
    if (user.value.projectname && user.value.clientname && user.value.billing) {
      console.log(
        user.value.projectname,
        user.value.clientname,
        user.value.billing
      );
    }
  } catch (error) {
    console.log(error);
  }
};
</script>

<template>
  <img src="../images/Group 28.svg" />
  <form @submit.prevent="addProject">
    <h3>Add Project</h3>
    <div
      id="success"
      class="alert alert-success"
      v-if="user.text"
      v-text="user.text"
    />
    <div
      id="failure"
      class="alert alert-danger"
      v-if="user.errorText"
      v-text="user.errorText"
    />
    <div class="mb-3">
      <label class="form-label">Project Name<span>*</span></label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="user.projectname"
        v-bind:class="{
          'form-control': true,
        }"
      />
      <div v-if="errorProjectName" class="err">{{ errorProjectName }}</div>
    </div>

    <div class="mb-3">
      <label class="form-label">Client Name<span>*</span></label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="user.clientname"
        v-bind:class="{
          'form-control': true,
        }"
      />
      <div v-if="errorClientName" class="err">{{ errorClientName }}</div>
    </div>
    <div class="mb-3">
      <label class="form-label">Billing Options<span>*</span></label>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="billable"
          name="optradio"
          v-model="user.billing"
          value="billable"
          checked
        />Billable
      </div>
      <div class="form-check">
        <input
          type="radio"
          class="form-check-input"
          id="non-billable"
          name="optradio"
          v-model="user.billing"
          value="non-billable"
        />Non-Billable
      </div>
      <div v-if="errorBilling" class="err">{{ errorBilling }}</div>
    </div>
    <button type="submit">Add Project</button>
  </form>
</template>

<style>
form {
  width: 40%;
  display: block;
  margin-left: auto;
  margin-right: auto;
  text-align: left;
}

form h3 {
  text-align: center;
}

form h6 {
  text-align: center;
}

button {
  width: 100%;
  height: 35px;
  margin-top: 10px;
  background-color: #fa602d;
  color: white;
  border: none;
  font-size: 18px;
  opacity: 1;
  transition: 0.3s;
}

button:hover {
  opacity: 0.6;
}

.err {
  color: red;
}

label span {
  color: red;
}
</style>
