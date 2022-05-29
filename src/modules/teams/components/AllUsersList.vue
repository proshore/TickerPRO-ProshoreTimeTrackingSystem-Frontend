<script setup>
import { ref } from "vue";

import getToken from "@/utils/getToken";

import { allUsersList, deleteUser, enableDisable } from "../services";

const totalMembers = ref(0);
const allUsers = ref([]);
const isLoading = ref(true);

async function handleAllUsers() {
  try {
    const token = getToken();
    const response = await allUsersList(token);
    allUsers.value = response.data.users;
    totalMembers.value = response.data.total;
    isLoading.value = false;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

async function userDelete(memberId) {
  try {
    const token = getToken();
    const res = await deleteUser(token, memberId);
    isLoading.value = false;
    console.log(res.data);
    if (res.status == 200) {
      alert(res.data["message"]);
    }
  } catch (error) {
    console.log(error);
  }
}

async function enableDisableUser(index) {
  try {
    const token = getToken();
    console.log(token);
    const res = await enableDisable(token, allUsers.value[index]["id"]);
    isLoading.value = false;
    if (res.status == 200) {
      alert(res.data["message"]);
    }
  } catch (error) {
    console.log(error);
  }
}

function status(x) {
  if (x == "1") {
    return "Disable";
  } else {
    return "Enable";
  }
}

handleAllUsers();
</script>

<template>
  <div class="mt-5 fw-bold fs-5">
    Members <span v-if="totalMembers" v-text="`(${totalMembers})`" />
  </div>

  <div class="mt-3 border border-bottom-0 rounded">
    <table class="table table-hover">
      <thead class="text-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <p v-if="isLoading">Loading...</p>

      <tbody v-if="allUsers.length">
        <tr v-for="(member, index) in allUsers" :key="member.id">
          <th scope="row" v-text="`${index + 1}`" />
          <td v-text="member.name" />
          <td v-text="member.email" />
          <td
            @click="enableDisableUser(index)"
            v-text="status(member.activeStatus)"
          ></td>
          <div class="dropdown">
            <button
              class="btn btn-light dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a
                  class="dropdown-item"
                  @click="enableDisableUser(index)"
                  v-text="status(member.activeStatus)"
                >
                </a>
              </li>
              <li>
                <a class="dropdown-item" @click="userDelete(member.id)">
                  Delete User</a
                >
              </li>
            </ul>
          </div>
        </tr>
      </tbody>
    </table>
  </div>
</template>
