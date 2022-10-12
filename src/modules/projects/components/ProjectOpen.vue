<template>
  <div class="">
    <BaseHeading title="Proshore Bootcamp" class="" />
    <p class="text-secondary">John Doe</p>
  </div>

  <ul class="nav nav-pills mb-3 my-5" id="pills-tab" role="tablist">
    <li class="nav-item" role="presentation">
      <button
        class="nav-link active"
        id="pills-home-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-home"
        type="button"
        role="tab"
        aria-controls="pills-home"
        aria-selected="true"
      >
        TASKS
      </button>
    </li>
    <li class="nav-item" role="presentation">
      <button
        class="nav-link"
        id="pills-profile-tab"
        data-bs-toggle="pill"
        data-bs-target="#pills-profile"
        type="button"
        role="tab"
        aria-controls="pills-profile"
        aria-selected="false"
      >
        MEMBERS
      </button>
    </li>
  </ul>
  <div class="tab-content" id="pills-tabContent">
    <div
      class="tab-pane fade show active my-5"
      id="pills-home"
      role="tabpanel"
      aria-labelledby="pills-home-tab"
    >
      Coming Soon.
    </div>
    <div
      class="tab-pane fade"
      id="pills-profile"
      role="tabpanel"
      aria-labelledby="pills-profile-tab"
    >
      <button class="btn btn-outline-primary my-3">Add new Members</button>
      <table class="table">
  <thead>
    <tr style="background: #f6f6f6" class="border">
      <th scope="col">Name</th>
      <th scope="col">Email Address</th>
      <th scope="col">Role</th>
      <th scope="col">Action</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <th scope="row">1</th>
      <td>Mark</td>
      <td>Otto</td>
      <td>@mdo</td>
    </tr>
    <tr>
      <th scope="row">2</th>
      <td>Jacob</td>
      <td>Thornton</td>
      <td>@fat</td>
    </tr>
    <tr>
      <th scope="row">3</th>
      <td colspan="2">Larry the Bird</td>
      <td>@twitter</td>
    </tr>
  </tbody>
</table>

    </div>
  </div>
</template>

<script setup>
import BaseHeading from "@/components/BaseHeading.vue";
</script>

<style>
table {
  border-collapse: separate;
  border-spacing: 0 10px;
}
</style>
