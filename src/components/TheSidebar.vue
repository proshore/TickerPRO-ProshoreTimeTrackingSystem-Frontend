<script setup>
import { RouterLink } from "vue-router";

import logo from "@/assets/images/logo.svg";
import sTracker from "@/assets/images/s-tracker.svg";
import sProjects from "@/assets/images/s-projects.svg";
import sTeams from "@/assets/images/s-teams.svg";
import sClients from "@/assets/images/s-clients.svg";
import sReports from "@/assets/images/s-reports.svg";
import sSettings from "@/assets/images/s-settings.svg";
</script>

<template>
  <nav class="navbar">
    <ul class="navbar-nav">
      <li class="nav-item mb-4">
        <RouterLink to="no-link" class="nav-link">
          <img :src="logo" alt="Ticker logo" class="side-logo" />
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'tracker' }" class="nav-link">
          <img :src="sTracker" alt="Time tracker icon" class="side-icon" />
          <span class="link-text">Tracker</span>
        </RouterLink>
      </li>

      <p class="mt-3 fw-bolder fs-6 mb-2 nav-p">Manage</p>

      <li class="nav-item">
        <RouterLink :to="{ name: 'projects' }" class="nav-link">
          <img :src="sProjects" alt="Projects icon" class="side-icon" />
          <span class="link-text">Projects</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'teams' }" class="nav-link">
          <img :src="sTeams" alt="Teams icon" class="side-icon" />
          <span class="link-text">Teams</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'clients' }" class="nav-link">
          <img :src="sClients" alt="Clients icon" class="side-icon" />
          <span class="link-text">Clients</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'reports' }" class="nav-link">
          <img :src="sReports" alt="Reports icon" class="side-icon" />
          <span class="link-text">Reports</span>
        </RouterLink>
      </li>

      <li class="nav-item">
        <RouterLink :to="{ name: 'settings' }" class="nav-link">
          <img :src="sSettings" alt="Settings icon" class="side-icon" />
          <span class="link-text">Settings</span>
        </RouterLink>
      </li>
    </ul>
  </nav>
</template>

<style lang="scss" scoped>
.navbar {
  width: 11rem;
  height: 100vh;
  position: fixed;
  background-color: #f6f6f6;

  .navbar-nav {
    display: flex;
    flex-direction: column;
    width: 9rem;
    padding-left: 1.5rem;

    .router-link-active {
      color: #fa602d;
      background-color: #fff;
      border-radius: 5px;
      padding-left: 0.5rem;
      padding-right: 0.5rem;
      border: 1px solid #fa602d;
    }

    .nav-p {
      color: #9d9d9d;
    }

    .nav-item {
      height: 3rem;

      .side-logo {
        width: 8.1rem;
        margin-left: -0.6rem;
        cursor: default;
      }

      .side-icon {
        width: 1.25rem;
      }

      &:last-child {
        margin-top: 22rem;
      }

      p.nav-link {
        cursor: pointer;
      }

      .settings-options {
        width: 9rem;
        background-color: #fff;
        margin-left: 1rem;
        margin-bottom: 5rem;
        padding: 0.5rem 0.5rem 0.5rem 0.8rem;
        color: #000;

        & a:hover {
          font-weight: 600;
        }
      }
    }
  }

  .nav-link {
    display: flex;
    align-items: center;
    color: #9d9d9d;

    &:hover {
      color: #fa602d;
    }

    .link-text {
      margin-left: 1rem;
    }
  }
}
</style>
