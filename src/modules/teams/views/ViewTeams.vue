<script setup>
import TheLogoutLink from "@/components/TheLogoutLink.vue";
import TheSidebar from "@/components/TheSidebar.vue";
import InviteMemberListVue from "../components/InviteMemberList.vue";
</script>

<template>
  <TheSidebar />
  <InviteMemberListVue />
  <main id="team-page">
    <h1>Teams page</h1>

    <table id="tableComponent" class="table table-bordered table-striped">
      <thead>
        <tr>
          <!-- loop through each value of the fields to get the table header -->
          <th v-for="field in fields" :key="field" @click="sortTable(field)">
            {{ field }}
            <i class="bi bi-sort-alpha-down" arial-label="Sort Icon"></i>
          </th>
        </tr>
      </thead>
      <tbody>
        <!-- loop through the list get the employee data -->
        <tr v-for="item in filteredList" :key="item">
          <td v-for="field in fields" :key="field">{{ item[field] }}</td>
        </tr>
      </tbody>
    </table>
  </main>

  <TheLogoutLink />
</template>
