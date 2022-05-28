import { defineStore } from "pinia";

export const useToggleContainer = defineStore("toggleContainer", {
  state: () => {
    return { userStatus: false };
  },
});
