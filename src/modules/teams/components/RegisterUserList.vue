<script setup>
import { ref } from "vue";
import getToken from "@/utils/getToken";
import { allUsersList, deleteUser, enableDisable } from "../services";
import { useToast } from "vue-toast-notification";

const totalMembers = ref(0);
const allUsers = ref([]);
const searchedUsers = ref(allUsers.value);
const isLoading = ref(true);
const isInitial = ref(true);
const $toast = useToast();
const emailSortBy = ref('desc');
const nameSortBy = ref('desc');
const deletingUser = ref(null)

function onModalClick(index){
  deletingUser.value = index
}

async function handleAllUsers() {
  try {
    const token = getToken();
    const response = await allUsersList(token);
    allUsers.value = response.data.users;
    totalMembers.value = response.data.total;
    isLoading.value = false;
  } catch (error) {
    alert("Something went wrong, please try again later");
  }
}

async function userDelete() {
  try {
    const token = getToken();
    const res = await deleteUser(token, allUsers.value[deletingUser.value]["id"]);
    isLoading.value = false;
    if (res.status == 200) {
      handleAllUsers();
      $toast.success(res.data["message"]);
    }
  } catch (error) {
    $toast.error("Something went wrong, please try again later");
  }
}

async function enableDisableUser(index) {
  try {
    const token = getToken();
    const res = await enableDisable(token, allUsers.value[index]["id"]);
    isLoading.value = false;
    if (res.status == 200) {
      handleAllUsers();
      $toast.success(res.data["message"]);
    }
  } catch (error) {
    $toast.error("Something went wrong, please try again later.");
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
  allUsers.value.forEach((obj) => {
    if (obj.name.includes(a)) {
      searchedUsers.value.push(obj);
    }
    isInitial.value = false;
  });
}

//comparer function
function GetSortOrder(prop, sortBy) {
  return function (a, b ) {
    if (sortBy === 'asc'){
    if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
      return 1;
    } else if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
      return -1;
    }
    return 0;
  }
    if (sortBy === 'desc'){
    if (a[prop].toLowerCase() > b[prop].toLowerCase()) {
      return 1;
    } else if (a[prop].toLowerCase() < b[prop].toLowerCase()) {
      return -1;
    }
    return 0;
  }
  };
}


function sort(fieldType) {
  // console.log((GetSortOrder(value)));
  if (fieldType === 'email'){
    if (this.emailSortBy === 'desc' ){
      this.emailSortBy = 'asc'
    } else {
      this.emailSortBy = 'desc'
    }
  } 
  if (fieldType === 'name'){
    if (this.nameSortBy === 'desc' ){
      this.nameSortBy = 'asc'
    } else {
      this.nameSortBy = 'desc'
    }
  } 
  let sortBy = null
  if(fieldType === 'email') {
    sortBy = this.emailSortBy;
  };
  if(fieldType === 'name') {
    sortBy = this.nameSortBy;
  };
  allUsers.value.sort(GetSortOrder(fieldType, sortBy));
}

handleAllUsers();
</script>

<template>
  <div class="mt-5 fs-5">
    All Members <span v-if="totalMembers" v-text="`(${totalMembers})`" />
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
          <th scope="col">#
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </th>
          <th @click="sort('name')" scope="col">
            Name
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </th>
          <th @click="sort('email')" scope="col">
            Email
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width="16"
              height="16"
              fill="currentColor"
              class="bi bi-filter"
              viewBox="0 0 16 16"
            >
              <path
                d="M6 10.5a.5.5 0 0 1 .5-.5h3a.5.5 0 0 1 0 1h-3a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h7a.5.5 0 0 1 0 1h-7a.5.5 0 0 1-.5-.5zm-2-3a.5.5 0 0 1 .5-.5h11a.5.5 0 0 1 0 1h-11a.5.5 0 0 1-.5-.5z"
              />
            </svg>
          </th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
        </tr>
      </thead>

      <p v-if="isLoading">Loading...</p>

      <tbody>
        <tr
          v-for="(member, index) in isInitial ? allUsers : searchedUsers"
          :key="member.id"
        >
          
          <!-- <tr v-for ="(member,index) in allUsers" :key="member.id"> -->
          <th scope="row" v-text="index +1" />
          <td v-text="member.name" />
          <td v-text="member.email" />
          <td>{{member.role[0].role.toUpperCase()}}</td>
          <td>
            {{
              status(member.active_status) === "Enable" ? "Disabled" : "Enabled"
            }}
          </td>
          <td>
            <span 
            v-if="member.role[0].role === 'admin'"
            class="btn btn-light btn-sm text-primary">Admin</span>
            <button
            v-else
              class="btn btn-light btn-sm"
              @click="enableDisableUser(index)"
              v-text="status(member.active_status)"
            ></button>
          </td>
          <td class="dropdown">
            <button
              class="btn btn-light dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li v-if="member.role[0].role === 'admin'">
                <span>Sorry, You can't delete Admin user!!!</span>
              </li>
              <li v-else>
                <button
                      type="button"
                      class="btn btn-light btn-sm mx-2"
                      data-bs-toggle="modal"
                      data-bs-target="#staticBackdrop"
                      data-cy="deleteRegisteredMember"
                      @click="onModalClick(index)"
                    >
                      Delete
                    </button>
              
              </li>
            </ul>
            <div
                class="modal fade"
                id="staticBackdrop"
                data-bs-backdrop="static"
                data-bs-keyboard="false"
                tabindex="-1"
                aria-labelledby="staticBackdropLabel"
                aria-hidden="true"
              >
                <div class="modal-dialog modal-dialog-centered">
                  <div class="modal-content">
                    <div class="modal-header text-center border-0">
                      <h5 class="modal-title w-100" id="staticBackdropLabel">
                        Are you sure you want to delete?
                      </h5>
                    </div>
                    <div
                      class="modal-footer pull-right justify-content-center border-0"
                    >
                      <button
                        type="button"
                        class="btn btn-secondary-outline"
                        data-bs-dismiss="modal"
                        data-cy="cancelDeleteRegisteredMember"
                      >
                        Cancel
                      </button>
                      <button
                        type="button"
                        class="btn btn-primary-outline text-primary"
                        @click="userDelete()"
                        data-bs-dismiss="modal"
                        data-cy="deleteRegisteredUserSuccessfully"
                      >
                        
                        Delete
                      </button>
                    </div>
                  </div>
                </div>
              </div>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style scoped>
.topnav input[type="text"] {
  float: none;
  border: 1px solid rgb(211, 216, 211);
  display: block;
  text-align: left;
  width: 100%;
  margin: 0;
  padding: 14px;
}

input:focus {
  background-color: rgb(226, 221, 221);
}

th,
td {
  cursor: pointer;
}
</style>
