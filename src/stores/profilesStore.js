import { defineStore } from "pinia";
import { computed, ref } from "vue";
import { profileGenerator } from "@/service/profiles/profileGenerator.js";
import { ideaGenerator } from "@/service/profiles/ideaGenerator.js";

const { getIdea } = ideaGenerator();

export const useProfilesStore = defineStore("profiles", () => {
  const profiles = ref([]);
  const { loading, ask } = profileGenerator();

  const hasBeenUsed = computed(() => profiles.value.length > 0);

  const addProfile = (profile) => {
    profiles.value.push(profile);
  };

  const generateProfile = async (idea) => {
    loading.value = true;
    let query = idea;
    if (query.trim().length.isEmpty) {
      query = await getIdea();
    }
    const profile = await ask(query);
    addProfile(profile);
  };

  return { profiles, hasBeenUsed, loading, generateProfile };
});
