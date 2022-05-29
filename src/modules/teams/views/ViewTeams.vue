<script setup>
import InviteMember from "../components/InviteMember.vue";
import InviteMemberList from "../components/InviteMemberList.vue";
import AllUserList from "../components/AllUsersList.vue";
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";

import {
  VueCollapsiblePanelGroup,
  VueCollapsiblePanel,
} from "@swoga/vue-collapsible-panel";
import "@swoga/vue-collapsible-panel/dist/vue-collapsible-panel.css";
</script>
<style scoped>
.expandable {
  margin-top: 2rem;
}
.teams__container {
  margin-left: 11.5rem;
  padding-right: 5rem;
}
</style>
<template>
  <TheSidebar />
  <div class="teams__container">
    <h1>Teams page</h1>
    <InviteMember />
    <TheLogoutLink />

    <vue-collapsible-panel-group accordion class="expandable">
      <vue-collapsible-panel :expanded="false">
        <template #title> Invited Member List </template>
        <template #content>
          <p hidden>x</p>
          <InviteMemberList />
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>

    <vue-collapsible-panel-group accordion>
      <vue-collapsible-panel :expanded="false">
        <template #title> List of All Users </template>
        <template #content>
          <p hidden>x</p>
          <AllUserList />
        </template>
      </vue-collapsible-panel>
    </vue-collapsible-panel-group>
  </div>
</template>
