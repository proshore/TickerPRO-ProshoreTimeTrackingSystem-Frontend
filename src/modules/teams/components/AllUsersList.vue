<script setup>
import { ref } from "vue";

import getToken from "@/utils/getToken";

import { allUsersList, deleteUser, enableDisable } from "../services";

const totalMembers = ref(0);
const allUsers = ref([]);
const searchedUsers = ref(allUsers.value);
const isLoading = ref(true);
const isInitial = ref(true);
const isSearched = ref(false);

async function handleAllUsers() {
  try {
    const token = getToken();
    const response = await allUsersList(token);
    allUsers.value = response.data.users;
    totalMembers.value = response.data.total;
    isLoading.value = false;
    // console.log(allUsers.value + "test" + isInitial.value);
  } catch (error) {
    console.log(error);
  }
}

async function userDelete(index) {
  try {
    const token = getToken();
    console.log(allUsers.value[index]["email"]);
    const res = await deleteUser(token, allUsers.value[index]["id"]);
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

function search(a) {
  searchedUsers.value.splice(0, allUsers.value.length);
  console.log(allUsers.value + "allusers");
  //  var filteredList = allUsers.value;
  // if(isSearched.value == false){

  allUsers.value.forEach((obj) => {
    if (obj.name.includes(a)) {
      searchedUsers.value.push(obj);
    }
    console.log(searchedUsers.value);
    isInitial.value = false;
  });
  // isSearched.value = true;

  // }
}

handleAllUsers();
</script>
<style scoped>
.topnav input[type="text"] {
  float: none;
  border: 1px solid green;
  display: block;
  text-align: left;
  width: 100%;
  margin: 0;
  padding: 14px;
}
/* .topnav input[type=text] {
    border: 1px solid rgb(234, 14, 14);
  } */
input:focus {
  background-color: rgb(226, 221, 221);
}
</style>

<template>
  <div class="mt-5 fw-bold fs-5">
    Members <span v-if="totalMembers" v-text="$totalMembers" />
  </div>

  <div class="mt-3 border border-bottom-0 rounded">
    <div class="topnav">
      <input
        type="text"
        placeholder="Search.."
        v-model="value"
        v-on:input="search(value)"
      />
    </div>
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

      <!-- terniary operator
if(a == 0){
  a is zero
}else{
  a is not zero
} 
a == 0 ? a is zero : a is not zero

-->
      <tbody>
        <tr
          v-for="(member, index) in isInitial ? allUsers : searchedUsers"
          :key="member.id"
        >
          <!-- <tr v-for ="(member,index) in allUsers" :key="member.id"> -->
          <th scope="row" v-text="member.id" />
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
                <a class="dropdown-item" @click="userDelete(index)">
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
