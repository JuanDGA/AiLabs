<script setup>
import { computed } from "vue";
import lodash from "lodash";
import FlippableComponent from "@/components/profiles/FlippableComponent.vue";
import { generateSpeech } from "@/service/speechGenerator.js";

const props = defineProps({
  profile: {
    type: Object,
  },
});

const profile = computed(() => props.profile);

const { loading, audio, playing, play, pause } = generateSpeech();

const handleListening = () => {
  if (playing.value) {
    pause();
  } else {
    play(profile.value.uid, profile.value.introduce_yourself, profile.value.gender);
  }
};
</script>

<template>
  <div>
    <audio class="hidden" ref="audio" />
    <flippable-component>
      <template #front>
        <div
          class="rounded-lg rounded-tr-3xl border bg-purple-100 shadow-2xl w-full max-w-md"
          style="width: 90vw; max-height: 85vh"
        >
          <div class="flex-col pt-3 flex items-center gap-2">
            <h3 class="font-semibold tracking-tight text-lg">
              {{ profile.name }} {{ profile.last_name }}
            </h3>
            <p class="text-sm">{{ profile.nationality }}</p>
          </div>
          <div class="p-6 space-y-4">
            <div class="grid grid-cols-2 gap-2">
              <div class="grid grid-rows-3 gap-2">
                <div class="space-y-1">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="profession"
                  >
                    <u>Profession</u>
                  </label>
                  <p id="profession" class="text-sm">
                    {{ profile.profession }}
                  </p>
                </div>
                <div class="space-y-1">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="age"
                  >
                    <u>Age</u>
                  </label>
                  <p id="age" class=" text-sm">
                    {{ profile.age }}
                  </p>
                </div>
                <div class="space-y-1">
                  <label
                    class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                    for="gender"
                  >
                    <u>Gender</u>
                  </label>
                  <p id="gender" class="text-sm">
                    {{ profile.gender }}
                  </p>
                </div>
              </div>
              <div class="space-y-1">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="hobbies"
                >
                  <u>Hobbies</u>
                </label>
                <ul id="hobbies" class="px-3 text-sm list-disc">
                  <li v-for="(hobby, index) in profile.hobbies" :key="index">
                    {{ lodash.startCase(hobby) }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="grid grid-cols-2 gap-2">
              <div class="space-y-1">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="likes"
                >
                  <u>Likes</u>
                </label>
                <ul id="likes" class="px-3 text-sm list-disc">
                  <li v-for="(like, index) in profile.likes" :key="index">
                    {{ lodash.startCase(like) }}
                  </li>
                </ul>
              </div>
              <div class="space-y-1">
                <label
                  class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                  for="dislikes"
                >
                  <u>Dislikes</u>
                </label>
                <ul id="dislikes" class="px-3 text-sm list-disc">
                  <li v-for="(dislike, index) in profile.dislikes" :key="index">
                    {{ lodash.startCase(dislike) }}
                  </li>
                </ul>
              </div>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="activities"
              >
                <u>Activities</u>
              </label>
              <ul id="activities" class="px-3 text-sm list-disc">
                <li v-for="(activity, index) in profile.usual_activities" :key="index">
                  {{ lodash.startCase(activity) }}
                </li>
              </ul>
            </div>
          </div>
        </div>
      </template>
      <template #back>
        <div
          class="rounded-lg rounded-tl-3xl border bg-purple-100 shadow-2xl w-full max-w-md"
          style="height: 800px"
        >
          <div class="flex-col p-3 flex items-center gap-2">
            <h3 class="font-semibold tracking-tight text-lg">
              {{ profile.name }} {{ profile.last_name }}
            </h3>
          </div>
          <div class="p-6 space-y-4">
            <p>{{ profile.introduce_yourself }}</p>
            <button
              class="bg-purple-500 hover:bg-purple-700 text-white font-bold py-2 px-4 rounded-xl"
              @click.stop="handleListening"
              :disabled="loading"
            >
              {{ loading ? "Generating..." : playing ? "Pause" : "Listen" }}
            </button>
          </div>
        </div>
      </template>
    </flippable-component>
  </div>
</template>
