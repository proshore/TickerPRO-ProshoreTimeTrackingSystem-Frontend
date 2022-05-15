<script setup>
import { ref, onBeforeMount } from "vue";
import validateName from "@/utils/validateName";
import validateEmail from "@/utils/validateEmail";
import validateRoleId from "@/utils/validateRoleId";
import axios from "axios";
const rescource_url = "https://ccbackend.herokuapp.com/api/all-roles";

const user = ref({
  name: "",
  email: "",
  role_id: "",
  listRole: [],
  valid: true,
  message: null,
  text: "",
  errorText: "",
});

const errorName = ref("");
const errorEmail = ref("");
const errorRoleId = ref("");

onBeforeMount(async () => {
  const result = await axios.get(rescource_url);
  user.value.listRole = result.data.roles;
});

const checkForm = async () => {
  errorName.value = "";
  errorEmail.value = "";
  errorRoleId.value = "";
  user.value.text = "";
  user.value.errorText = "";

  const { isValid: validN, errorMessage: errorN } = validateName(
    user.value.name
  );
  if (!validN) {
    errorName.value = errorN;
    user.value.name = "";
  }

  const { isValid: validE, errorMessage: errorE } = validateEmail(
    user.value.email
  );
  if (!validE) {
    errorEmail.value = errorE;
    user.value.email = "";
  }

  const { isValid: validR, errorMessage: errorR } = validateRoleId(
    user.value.role_id
  );
  if (!validR) {
    errorRoleId.value = errorR;
    user.value.role_id = "";
  }

  try {
    if (user.value.name && user.value.email && user.value.role_id) {
      console.log(user.value.name, user.value.email, user.value.role_id);
      const response = await axios.post(
        "https://ccbackend.herokuapp.com/api/admin/invite",
        {
          name: user.value.name,
          email: user.value.email,
          role_id: user.value.role_id,
          user_id: 1,
        },

        {
          headers: {
            Authorization: "Bearer 82|nhJTr5oA8VBcKNo3k3xepyFoNb1HpQ43NoWcPohU",
          },
        }
      );
      if (response.status == 200) {
        user.value.text = "Member successfully Invited";
      }
    }
  } catch (error) {
    console.log(error);
    user.value.errorText = "Sorry! The email already exist";
  }
};
</script>

<template>
  <img src="../images/Group 28.svg" />
  <form @submit.prevent="checkForm">
    <h3>Add Team Members</h3>
    <h6>Sending Invitations to the user</h6>
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
      <label class="form-label">Username<span>*</span></label>
      <input
        type="text"
        class="form-control"
        id="name"
        v-model="user.name"
        v-bind:class="{
          'form-control': true,
        }"
      />
      <div v-if="errorName" class="err">{{ errorName }}</div>
    </div>
    <div class="mb-3">
      <label for="exampleInputEmail1" class="form-label"
        >Email address<span>*</span></label
      >
      <input
        type="email"
        class="form-control"
        id="exampleInputEmail1"
        v-model="user.email"
        aria-describedby="emailHelp"
        v-bind:class="{
          'form-control': true,
        }"
      />
      <div v-if="errorEmail" class="err">{{ errorEmail }}</div>
    </div>
    <div class="dropdown">
      <label class="form-label">User Role<span>*</span></label>
      <select
        id="role"
        v-model="user.role_id"
        @change="onChangeRole"
        class="form-select"
      >
        <option value="">Select a Role</option>
        <option v-for="role in user.listRole" :value="role.id" :key="role.id">
          {{ role.role }}
        </option>
      </select>
      <div v-if="errorRoleId" class="err">{{ errorRoleId }}</div>
    </div>
    <button type="submit">Send Invitation</button>
  </form>
</template>

<style scoped>
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

#success {
  text-align: center;
}

#failure {
  text-align: center;
}
</style>
