<script setup>
  import { computed } from 'vue'
  import configuration from "../service/configuration.json"

  const props = defineProps({
    profile: {
      type: Object,
      default: configuration.profileTemplate
    }
  })

  const profile = computed(() => props.profile)

  const ready = computed(() => Object.keys(props.profile).includes("age") && props.profile.age > 0)
</script>

<template>
  <div v-if="ready" class="bg-white p-8 rounded shadow-lg">
    <div class="text-center">
      <h2 class="text-xl font-semibold text-gray-800">{{ profile.name }}</h2>
      <h2 class="text-xl font-semibold text-gray-800">{{ profile.last_name }}</h2>
      <p class="text-sm text-gray-500">{{ profile.nationality }}</p>
    </div>

    <div class="mt-6">
      <div class="grid grid-cols-2 gap-4">
        <div>
          <h3 class="text-gray-700 text-sm">Age</h3>
          <p class="text-gray-800">{{ profile.age }}</p>
        </div>
        <div>
          <h3 class="text-gray-700 text-sm">Gender</h3>
          <p class="text-gray-800">{{ profile.gender }}</p>
        </div>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Hobbies</h3>
        <ul class="list-disc list-inside text-gray-800">
          <li v-for="hobby in profile.hobbies" :key="hobby">{{ hobby }}</li>
        </ul>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Profession</h3>
        <p class="text-gray-800">{{ profile.profession }}</p>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Location</h3>
        <p class="text-gray-800">{{ profile.country }}</p>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Likes</h3>
        <ul class="list-disc list-inside text-gray-800">
          <li v-for="like in profile.likes" :key="like">{{ like }}</li>
        </ul>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Dislikes</h3>
        <ul class="list-disc list-inside text-gray-800">
          <li v-for="dislike in profile.dislikes" :key="dislike">{{ dislike }}</li>
        </ul>
      </div>

      <div class="mt-4">
        <h3 class="text-gray-700 text-sm">Activities</h3>
        <ul class="list-disc list-inside text-gray-800">
          <li v-for="activity in profile.usual_activities" :key="activity">{{ activity }}</li>
        </ul>
      </div>
    </div>
  </div>
</template>
