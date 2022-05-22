<script setup>
import { ref } from "vue";

import getToken from "@/utils/getToken";

import InviteMember from "../components/InviteMember.vue";

import { invitedMembersList } from "../services";

const totalMembers = ref(0);
const invitedMembers = ref([]);
const isLoading = ref(true);

const memberStatus = (status) => {
  if (status === 0) {
    return "Wait";
  } else {
    return "Active";
  }
};

async function handleInvitedMembers() {
  try {
    const token = getToken();
    const response = await invitedMembersList(token);
    invitedMembers.value = response.data.invitedUsers;
    totalMembers.value = response.data.total;
    isLoading.value = false;
    console.log(response.data);
  } catch (error) {
    console.log(error);
  }
}

handleInvitedMembers();
</script>

<template>
  <div class="mt-5 fw-bold fs-5">
    Members <span v-if="totalMembers" v-text="`(${totalMembers})`" />
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
        </tr>
      </thead>

      <p v-if="isLoading">Loading...</p>

      <tbody v-if="invitedMembers.length">
        <tr v-for="(member, index) in invitedMembers" :key="member.id">
          <th scope="row" v-text="`${index + 1}`" />
          <td v-text="member.name" />
          <td v-text="member.email" />
          <td v-text="member.role_id" />
          <td v-text="memberStatus(member.inviteAccepted)" />
        </tr>
      </tbody>
    </table>
  </div>
</template>
