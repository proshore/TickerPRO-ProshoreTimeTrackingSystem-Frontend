<script setup>
import { ref } from "vue";
import { RouterLink } from "vue-router";

import Logo from "@/config/app";

const { LOGO_PATH } = Logo;

const is_expanded = ref(localStorage.getItem("is_expanded") === "true");
const ToggleMenu = () => {
  is_expanded.value = !is_expanded.value;
  localStorage.setItem("is_expanded", is_expanded.value);
};
</script>

<template>
  <aside :class="`${is_expanded && 'is-expanded'}`">
    <div class="logo"><img :src="LOGO_PATH" alt="ticker" /></div>
    <div class="menu-toggle-wrap">
      <button class="menu-toggle" @click="ToggleMenu">
        <span class="material-symbols-rounded">
          keyboard_double_arrow_right
        </span>
      </button>
    </div>

    <div class="menu">
      <!-- <RouterLink to="#dashboard1" class="button">
        <span class="material-symbols-rounded"> dashboard </span>
        <span class="text">Dashboard</span>
      </RouterLink> -->
      <RouterLink :to="{ name: 'timetracker' }" class="button">
        <span class="material-symbols-rounded"> schedule </span>
        <span class="text">Time Tracker</span>
      </RouterLink>
      <h3>Manage</h3>
      <RouterLink :to="{ name: 'projects' }" class="button">
        <span class="material-symbols-rounded"> view_kanban </span>
        <span class="text">Projects</span>
      </RouterLink>
      <RouterLink :to="{ name: 'teams' }" class="button">
        <span class="material-symbols-rounded"> group </span>
        <span class="text">Team</span>
      </RouterLink>
      <RouterLink :to="{ name: 'clients' }" class="button">
        <span class="material-symbols-rounded"> person </span>
        <span class="text">Clients</span>
      </RouterLink>
      <RouterLink :to="{ name: 'reports' }" class="button">
        <span class="material-symbols-rounded"> bar_chart </span>
        <span class="text">Reports</span>
      </RouterLink>
    </div>

    <div class="flex"></div>
    <div class="menu">
      <RouterLink :to="{ name: 'works' }" class="button">
        <span id="work" class="material-symbols-rounded"> next_week </span>
        <span id="text-work" class="text">Proshore Work</span>
      </RouterLink>
    </div>
  </aside>
</template>

<style lang="scss" scoped>
aside {
  display: flex;
  flex-direction: column;
  width: calc(2.2rem + 32px);
  min-height: 100vh;
  overflow: hidden;
  padding: 1rem;
  border: solid 1px #eeeaea;
  position: absolute;
  left: -1px;

  background-color: var(--light);
  color: var(--grey);

  transition: 0.2s ease-out;
  .flex {
    flex: 1 1 0;
  }

  .logo {
    margin-bottom: 1rem;
    img {
      width: 9.5rem;
      margin-top: -2rem;
    }
  }

  .menu-toggle-wrap {
    display: flex;
    justify-content: flex-end;
    margin-bottom: 0.5rem;

    position: relative;
    top: 0;
    transition: 0.2s ease-out;

    .menu-toggle {
      margin-top: -1.5rem;
      margin-left: 1rem;
      transition: 0.2s ease-out;

      .material-symbols-rounded {
        font-size: 2rem;
        color: var(--blue);
      }

      &:hover {
        .material-symbols-rounded {
          color: var(--primary);
          transform: translateX(0.1rem);
        }
      }
    }
  }

  h3,
  .button .text {
    opacity: 0;
    transition: 0.3s ease-out;
  }
  h3 {
    color: var(--grey-two);
    font-weight: 600;
    font-size: 1rem;
    margin: 1rem;
    padding-left: 1.5rem;
    text-transform: uppercase;
  }

  .menu {
    margin: 0 -1rem;

    .button {
      display: flex;
      align-items: center;
      text-decoration: none;
      padding: 0.5rem 1rem;
      transition: 0.2s ease-out;

      .material-symbols-rounded {
        font-size: 2rem;
        color: var(--grey);
        transition: 0.2s ease-out;
      }
      .text {
        color: var(--grey);
        transition: 0.2s ease-out;
        margin-left: 0.5rem;
      }
      &:hover {
        background-color: var(--lightgrey);

        .material-symbols-rounded,
        .text {
          color: var(--primary);
        }
        #work,
        #text-work {
          color: var(--blue);
        }
      }
      &.router-link-exact-active {
        background-color: var(--light);

        .material-symbols-rounded,
        .text {
          color: var(--primary);
        }
        #work,
        #text-work {
          color: var(--blue);
        }
      }
    }
  }

  &.is-expanded {
    width: var(--sidebar-width);

    .menu-toggle-wrap {
      top: -3.5rem;
      .menu-toggle {
        transform: rotate(-180deg);
      }
    }
    h3,
    .button .text {
      opacity: 1;
    }
    .button {
      .material-symbols-rounded {
        margin-left: 1rem;
      }
    }
  }
}
</style>
