<template>
  <div class="container text-center mt-5 mb-5">
    <Table :fields="fields" :employeeData="employeeData"></Table>
  </div>
</template>

<script setup>
const employeeData = [
  {
    ID: "01",
    Name: "Abiola Esther",
    Email: "abi@gmail.com",
    Role: "Frontend",
    Status: "active",
    Action: "Block",
  },
  {
    ID: "02",
    Name: "Robert V. Kratz",
    Email: "robe@gmail.com",
    Role: "Backend",
    Status: "active",
    Action: "unBlock",
  },
  {
    ID: "03",
    Name: "Kristen Anderson",
    Email: "krist@gmail.com",
    Role: "Project Manager",
    Status: "active",
    Action: "Reinvite",
  },
  {
    ID: "04",
    Name: "Adam Simon",
    Email: "adam@gmail.com",
    Role: "Frontend",
    Status: "wait",
    Action: "UnBlock",
  },
  {
    ID: "05",
    Name: "Daisy Katherine",
    Email: "daisy@gmail.com",
    Role: "Backend",
    Status: "active",
    Action: "Reinvite",
  },
];
const fields = ["ID", "Name", "Email", "Role", "Status", "Action"];
</script>
