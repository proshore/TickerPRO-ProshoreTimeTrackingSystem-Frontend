<script setup>
import ViewInviteMember from "./ViewInviteMember.vue";
import InviteMemberList from "../components/InviteMemberList.vue";

import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";
</script>

<template>
  <TheSidebar />
  <h1>Teams page</h1>
  <ViewInviteMember />
  <TheLogoutLink />

  <InviteMemberList />
</template>
