<script setup></script>
<template>
  <div>
    <img src="../images/Group 28.svg" />
    <div class="OopsMessage">
      <h1>Oops! That Page can't be found.</h1>
      <p>It looks like nothing was found at this location.</p>
    </div>
    <div class="button">
      <a type="submit" href="/">Go To Home</a>
    </div>
    <div class="template">
      <img src="../images/404Template.png" alt="" />
    </div>
  </div>
</template>

<style scoped>
.OopsMessage {
  position: relative;
  text-align: center;
}
.OopsMessage h1 {
  color: #fa602d;
  font-style: normal;
}

.OopsMessage {
  color: #263238;
}

.button {
  text-align: center;
  font-size: 1.5em;
  margin: 0 auto;
  width: 15%;
  padding: 8px;
  background-color: #040458;
  border-radius: none;
  transition: 0.35s;
  border-radius: 5px;
}
.button a,
active {
  text-decoration: none;
  color: white;
}
.button a:hover {
  text-decoration: none;
  color: black;
}
.button:hover {
  background-color: #fdb142;
  transition: 0.35s;
}

.template {
  display: block;
  margin-left: auto;
  margin-right: auto;
  width: 50%;
}
.template img {
  height: 400px;
}
</style>
