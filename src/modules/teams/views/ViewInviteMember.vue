<script setup>
import { ref } from "vue";

import { getAllRoles } from "../services";

import BaseInput from "@/components/BaseInput.vue";

const name = ref("");
const email = ref("");
const role = ref("");
const nameError = ref("");
const emailError = ref("");
const roleError = ref("");
const successInvite = ref(false);
const roles = ref([]);

async function allRoles() {
  try {
    const response = await getAllRoles();
    roles.value = response.data.roles;

    console.log(roles.value);
  } catch (error) {
    console.log(error);
  }
}

allRoles();

async function handleInviteMember() {
  nameError.value = "";
  emailError.value = "";
  roleError.value = "";
  successInvite.value = false;
  console.log(name.value, email.value, role.value);

  successInvite.value = true;

  name.value = "";
  email.value = "";
  role.value = "";
}
</script>

<template>
  <!-- Button trigger modal -->
  <button
    type="button"
    class="btn btn-sm btn-primary text-white"
    data-bs-toggle="modal"
    data-bs-target="#exampleModal"
  >
    Add New Member
  </button>

  <!-- Modal -->
  <div
    class="modal fade"
    id="exampleModal"
    tabindex="-1"
    aria-labelledby="exampleModalLabel"
    aria-hidden="true"
  >
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Member</h5>
          <button
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
          ></button>
        </div>
        <div class="modal-body">
          <!-- Success invite -->
          <div
            v-if="successInvite"
            class="alert alert-success mb-0"
            role="alert"
          >
            Invite send successfully!
          </div>

          <form @submit.prevent="handleInviteMember">
            <BaseInput
              type="text"
              name="name"
              label="Full name"
              v-model="name"
              :error="nameError"
            />

            <BaseInput
              type="email"
              name="email"
              label="Email address"
              v-model="email"
              :error="emailError"
            />

            <div class="mt-4">
              <label for="roles"
                >Roles <span class="text-danger">*</span></label
              >
              <select
                class="form-select mt-2"
                aria-label="roles select menu"
                v-if="roles.length"
                v-model="role"
                required
              >
                <option
                  v-for="r in roles"
                  :key="r.id"
                  :value="r.id"
                  v-text="`${r.role.toUpperCase()}`"
                />
              </select>
              <div
                v-if="roleError"
                class="form-text text-danger"
                v-text="roleError"
              />
            </div>

            <!-- submit -->
            <div class="mt-4 mb-2">
              <button type="submit" class="btn btn-primary text-white">
                Send Invite
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  </div>
</template>
