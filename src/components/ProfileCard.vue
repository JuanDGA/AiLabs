<script setup>
import { computed } from 'vue'
import configuration from "../service/configuration.json";
import lodash from "lodash";
import FlippableComponent from '@/components/FlippableComponent.vue'
import { generateSpeech } from '@/service/speechGenerator.js'

const props = defineProps({
  profile: {
    type: Object,
    default: configuration.profileTemplate,
  },
});

const profile = computed(() => props.profile);

const {loading, audio, playing, play, pause} = generateSpeech();

const handleListening = () => {
  if (playing.value) {
    pause();
  } else {
    play(profile.value.introduce_yourself, profile.value.gender);
  }
}

</script>

<template>
  <flippable-component>
    <template #front>
      <div
        class="rounded-lg border bg-yellow-50 text-card-foreground shadow-sm w-full max-w-md"
        data-v0-t="card"
      >
        <div class="flex-col space-y-1.5 p-6 flex items-center gap-4">
          <h3 class="font-semibold tracking-tight text-lg">
            {{ profile.name }} {{ profile.last_name }}
          </h3>
          <p class="text-muted-foreground text-sm">{{ profile.profession }}</p>
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
              <ul id="hobbies" class="text-sm">
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
              <p id="likes" class="text-sm">
                {{ profile.likes.join(", ") }}
              </p>
            </div>
            <div class="space-y-1">
              <label
                class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
                for="dislikes"
              >
                Dislikes
              </label>
              <p id="dislikes" class="text-sm">
                {{ profile.dislikes.join(", ") }}
              </p>
            </div>
          </div>
          <div class="space-y-1">
            <label
              class="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
              for="activities"
            >
              Usual Activities
            </label>
            <p id="activities" class="text-sm">
              {{ profile.usual_activities.join(", ") }}
            </p>
          </div>
        </div>
      </div>
    </template>
    <template #back>
      <div
        class="rounded-lg border bg-yellow-50 text-card-foreground shadow-sm w-full max-w-md"
        data-v0-t="card"
      >
        <div class="p-6 space-y-4">
          <audio class="hidden" ref="audio"></audio>
          <p>{{profile.introduce_yourself}}</p>
          <button class="bg-yellow-500 hover:bg-yellow-700 text-white font-bold py-2 px-4 rounded-xl" @click.stop="handleListening" :disabled="loading">
            {{ loading ? 'Generating...' : playing ? 'Pause': 'Listen'}}
          </button>
        </div>
      </div>
    </template>
  </flippable-component>
</template>
