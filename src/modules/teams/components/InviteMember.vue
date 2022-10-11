<script setup>
import { ref, toRefs } from "vue";
import { getAllRoles, inviteMember } from "../services";
import getUser from "@/utils/getUser";
import getToken from "@/utils/getToken";
import validateName from "@/utils/validateName";
import validateEmail from "@/utils/validateEmail";
import BaseInput from "@/components/BaseInput.vue";
import BaseAlert from "@/components/BaseAlert.vue";
import { useToast } from "vue-toast-notification";

const name = ref("");
const email = ref("");
const role = ref("");
const nameError = ref("");
const emailError = ref("");
const roleError = ref("");
const successInvite = ref(false);
const roles = ref([]);
const errors = ref([]);
const $toast = useToast();

const props = defineProps({
  handleInvitedMembers: Function
})
const {handleInvitedMembers} = props

async function allRoles() {
  try {
    const response = await getAllRoles();
    roles.value = response.data.UserRoles;
  } catch (error) {
    errors.value.push("Something went wrong, please try again later.");
  }
}

allRoles();

async function handleInviteMember() {
  nameError.value = "";
  emailError.value = "";
  roleError.value = "";
  errors.value = [];
  successInvite.value = false;

  const { isValid: validName, errorMessage: errorName } = validateName(
    name.value
  );
  const { isValid: validEmail, errorMessage: errorEmail } = validateEmail(
    email.value
  );

  if (!validName) {
    nameError.value = errorName;
    name.value = "";
  }

  if (!validEmail) {
    emailError.value = errorEmail;
    email.value = "";
  }

  if (
    nameError.value === "" &&
    emailError.value === "" &&
    errors.value.length === 0
  ) {
    try {
      const {
        user: { id },
      } = getUser();

      const memberInfo = {
        name: name.value,
        email: email.value,
        role_id: role.value,
        user_id: id,
      };
      const token = getToken();

      const response = await inviteMember(memberInfo, token);
      if (response.status === 200) {
        successInvite.value = true;
        handleInvitedMembers();
        $toast.success("Invite is sent successfully!!!");
        // reset successInvite after 3 seconds
        setTimeout(() => {
          successInvite.value = false;
        }, 1500);

        // empty form fields
        name.value = "";
        email.value = "";
        role.value = "";
      }
    } catch (error) {
      $toast.error("Something went wrong, please try again later.");
    }
  }
}

function closeModel() { 
    name.value = "";
    email.value = "";
    role.value = "";
}
</script>
<style>
th,
td {
  cursor: pointer;
}
</style>

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
      <div class="modal-content" >
        <div class="modal-header">
          <h5 class="modal-title" id="exampleModalLabel">Add New Member</h5>
          <button
            @click="closeModel"
            type="button"
            class="btn-close"
            data-bs-dismiss="modal"
            aria-label="Close"
            data-cy = "clearFieldWhenClose"
          ></button>
        </div>
        <div class="modal-body">
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
