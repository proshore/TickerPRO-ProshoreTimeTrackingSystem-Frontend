<script setup>
import { ref } from "vue";

import getToken from "@/utils/getToken";

import InviteMember from "../components/InviteMember.vue";

import {
  getAllRoles,
  invitedMembersList,
  reinviteMember,
  revokeInvitation,
} from "../services";

const totalMembers = ref(0);
const invitedMembers = ref([]);
const isLoading = ref(true);
const roles = ref([]);
const message = ref("");

const memberStatus = (status) => {
  if (status === false) {
    return "Wait";
  } else {
    return "Active";
  }
};

const getRole = (roleId) => {
  let role = "";
  if (roles.value.length > 0) {
    roles.value.forEach((r) => {
      if (r.id === roleId) {
        role = r.role.toUpperCase();
      }
    });
    return role;
  }
  return roleId;
};

async function handleReinviteMember(email, name) {
  message.value = "";
  try {
    const token = getToken();
    const response = await reinviteMember(token, { email: email, name: name });
    if (response.status == 200) {
      handleInvitedMembers();
    }
    message.value = response.data.message;
  } catch (err) {
    console.log(err);
  }
}
async function handleRevokeMember(Id) {
  message.value = "";
  try {
    const token = getToken();
    const response = await revokeInvitation(token, Id);
    message.value = response.data.message;
    if (response.status == 200) {
      handleInvitedMembers();
    }
  } catch (err) {
    console.log(err);
  }
}

async function handleInvitedMembers() {
  try {
    const token = getToken();
    const response = await invitedMembersList(token);
    const responseRoles = await getAllRoles();

    invitedMembers.value = response.data.invitedUsers;
    totalMembers.value = response.data.total;
    roles.value = responseRoles.data.UserRoles;
    isLoading.value = false;
  } catch (error) {
    console.log(error);
  }
}
handleInvitedMembers();
</script>

<template>
  <div class="mt-2 fs-5">
    Invited Members <span v-if="totalMembers" v-text="`(${totalMembers})`" />
  </div>

  <!-- message -->
  <div
    v-if="message"
    class="alert alert-success alert-dismissible fade show mt-2"
    role="alert"
  >
    {{ message }}
    <button
      type="button"
      class="btn-close"
      data-bs-dismiss="alert"
      aria-label="Close"
    ></button>
  </div>

  <InviteMember />
  <div class="mt-3 border border-bottom-0 rounded">
    <table class="table table-hover">
      <thead class="text-primary">
        <tr>
          <th scope="col">#</th>
          <th scope="col">Name</th>
          <th scope="col">Email</th>
          <th scope="col">Role</th>
          <th scope="col">Status</th>
          <th scope="col">Action</th>
          <th scope="col"></th>
        </tr>
      </thead>

      <!-- <p v-if="isLoading">Loading...</p> -->

      <tbody v-if="invitedMembers.length">
        <tr v-for="(member, index) in invitedMembers" :key="index">
          <th scope="row" v-text="`${index + 1}`" />
          <td v-text="member.name" />
          <td class="gray-color" v-text="member.email" />
          <td v-text="getRole(member.role_id)" />
          <td class="gray-color" v-text="memberStatus(member.inviteAccepted)" />
          <td>
            <button
              class="btn btn-light btn-sm"
              @click="handleReinviteMember(member.email, member.name)"
            >
              Reinvite
            </button>
          </td>
          <td>
            <button
              class="btn btn-light dropdown-toggle btn-sm"
              type="button"
              id="dropdownMenuButton1"
              data-bs-toggle="dropdown"
              aria-expanded="true"
            ></button>
            <ul class="dropdown-menu" aria-labelledby="dropdownMenuButton1">
              <li>
                <a class="dropdown-item" @click="handleRevokeMember(member.id)">
                  Revoke
                </a>
              </li>
            </ul>
          </td>
        </tr>
      </tbody>
    </table>
  </div>
</template>

<style lang="scss"></style>
