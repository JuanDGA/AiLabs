import { defineStore } from "pinia";
import { ref } from "vue";

export const useProfilesStore = defineStore("profiles", () => {
  const profiles = ref([]);
  const hasBeenUsed = ref(false);

  const addProfile = (profile) => profiles.value.push(profile);

  return {profiles, hasBeenUsed, addProfile}
});