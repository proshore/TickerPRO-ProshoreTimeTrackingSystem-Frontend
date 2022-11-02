<script setup>
import BaseHeading from "@/components/BaseHeading.vue";
import AddMemberDialogBox from "@/components/AddMemberDialogBox.vue";
import ConfirmDelete from "@/components/ConfirmDelete.vue";
import mailSentSuccess from "@/assets/images/mail-sent-success.svg";

import { ref } from "vue";

const showDelete = ref(false);
const addMembers = ref(false);

function closeDelete() {
  showDelete.value = false;
  addMembers.value = false;
}
</script>

<template>
  <AddMemberDialogBox v-if="addMembers" :closeDelete="closeDelete" />
  <ConfirmDelete v-if="showDelete" :closeDelete="closeDelete" />
  <div class="">
    <BaseHeading title="Proshore Bootcamp" />
    <p class="text-secondary clientName">John Doe</p>
  </div>
  <ul class="nav nav-pills mb-3 my-5 text-secondary" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button class="nav-link active" id="pills-home-tab" data-bs-toggle="pill" data-bs-target="#pills-home"
        type="button" role="tab" aria-controls="pills-home" aria-selected="true" data-cy="TasksTabs">
        TASKS
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button class="nav-link" id="pills-profile-tab" data-bs-toggle="pill" data-bs-target="#pills-profile"
        type="button" role="tab" aria-controls="pills-profile" aria-selected="false" data-cy="MembersTabs">
        MEMBERS
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div class="tab-pane fade show active my-5" id="pills-home" role="tabpanel" aria-labelledby="pills-home-tab">
      <div class="d-flex justify-content-around align-items-center p-5">
        <img :src="mailSentSuccess" alt="Mail sent success logo" style="width: 450px" />
        <p class="h1 my-5 text-primary">
          We are working on this particular page.
        </p>
      </div>
    </div>
    <div class="tab-pane fade" id="pills-profile" role="tabpanel" aria-labelledby="pills-profile-tab">
      <button class="btn btn-outline-primary my-3" data-cy="addMembersToProject" @click="addMembers = true">
        Add new Members
      </button>

      <table>
        <tr class="border text-primary">
          <th>Name<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Email Address<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Role<i class="bi bi-arrow-down-up mx-1"></i></th>
          <th>Action<i class="bi bi-arrow-down-up mx-1"></i></th>
        </tr>
        <tr class="border">
          <td class="">Nirmal Shrestha</td>
          <td>nirmalbro@gmail.com</td>
          <td>Developer</td>
          <td>
            <button class="btn btn-sm" @click="showDelete = true" data-cy="removeUserFromProject">
              Remove
            </button>
          </td>
        </tr>
        <tr class="border">
          <td class="td">Surya Shrestha</td>
          <td>sshrestha21@gmail.com</td>
          <td>Project Manager</td>
          <td>
            <button class="btn btn-sm" @click="showDelete = true" data-cy="removeUserFromProject">
              Remove
            </button>
          </td>
        </tr>
        <tr class="border">
          <td class="td">Promise Rijal</td>
          <td>promise@gmail.com</td>
          <td>HR</td>
          <td>
            <button class="btn btn-sm" @click="showDelete = true" data-cy="removeUserFromProject">
              Remove
            </button>
          </td>
        </tr>
        <tr class="border">
          <td class="td">Nischal Khadka</td>
          <td>whywherewhenok@gmail.com</td>
          <td>Developer</td>
          <td>
            <button class="btn btn-sm" @click="showDelete = true" data-cy="removeUserFromProject">
              Remove
            </button>
          </td>
        </tr>
      </table>
    </div>
  </div>
</template>

<style scoped>
table,
tr,
th,
td {
  text-align: center;
  padding: 15px;
}

table {
  width: 100%;
  border-spacing: 5px;
}

.clientName {
  position: fixed;
  top: 8vh;
  left: 22.5vh;
  right: 0;
}
</style>
