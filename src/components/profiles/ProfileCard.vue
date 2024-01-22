<script setup>
import { computed } from "vue";
import configuration from "../../service/configuration.json";
import lodash from "lodash";
import FlippableComponent from "@/components/profiles/FlippableComponent.vue";
import { generateSpeech } from "@/service/speechGenerator.js";

const props = defineProps({
  profile: {
    type: Object,
    default: configuration.profiles.profileTemplate,
  },
});

const profile = computed(() => props.profile);

const { loading, audio, playing, play, pause } = generateSpeech();

const handleListening = () => {
  if (playing.value) {
    pause();
  } else {
    play(profile.value.introduce_yourself, profile.value.gender);
  }
};
</script>

<template>
  <flippable-component>
    <template #front>
      <div
        class="rounded-lg rounded-tr-3xl border bg-purple-100 shadow-2xl w-full max-w-md" style="width: 90vw; height: 800px"
      >
        <div class="flex-col p-3 flex items-center gap-2">
          <h3 class="font-semibold tracking-tight text-lg">
            {{ profile.name }} {{ profile.last_name }}
          </h3>
          <p class="text-sm">{{ profile.profession }}</p>
        </div>
        <div class="p-6 space-y-4">
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="nationality"
              >
                Nationality
              </label>
              <p id="nationality" class="text-sm">
                {{ profile.nationality }}
              </p>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="age"
              >
                Age
              </label>
              <p id="age" class="text-sm">
                {{ profile.age }}
              </p>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="gender"
              >
                Gender
              </label>
              <p id="gender" class="text-sm">
                {{ profile.gender }}
              </p>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="country"
              >
                Country
              </label>
              <p id="country" class="text-sm">
                {{ profile.country }}
              </p>
            </div>
          </div>
          <div class="grid grid-cols-2 gap-2">
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="hobbies"
              >
                Hobbies
              </label>
              <ul id="hobbies" class="px-3 text-sm list-disc">
                <li v-for="(hobby, index) in profile.hobbies" :key="index">
                  {{ lodash.startCase(hobby) }}
                </li>
              </ul>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="place"
              >
                Place
              </label>
              <p id="place" class="text-sm">
                {{ profile.place }}
              </p>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="likes"
              >
                Likes
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
                Dislikes
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
              Activities
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
        class="rounded-lg rounded-tl-3xl border bg-purple-100 shadow-2xl w-full max-w-md" style="height: 800px"
      >
        <div class="flex-col p-3 flex items-center gap-2">
          <h3 class="font-semibold tracking-tight text-lg">
            {{ profile.name }} {{ profile.last_name }}
          </h3>
          <p class="text-sm">Presentation</p>
        </div>
        <div class="p-6 space-y-4">
          <audio class="hidden" ref="audio"></audio>
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
</template>
