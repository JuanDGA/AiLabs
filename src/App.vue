<script setup>
  import { profileGenerator } from '@/service/generator.js'
  import ProfileCard from '@/components/ProfileCard.vue'

  const {loading, query, response, ask} = profileGenerator();
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-2">Profile Cards Generator</h1>
      <h3 class="font-medium text-gray-500 mb-4">To start, please press the generate button</h3>
      <label class="text-lg font-semibold">Topic/Name:</label>
      <input class="w-full border rounded-md p-2 mt-4 mb-1 focus:outline-none focus:border-blue-500" v-model="query" placeholder="Enter a topic or name" :disabled="loading">
      <h3 class="text-gray-500 mb-3">Default: Random</h3>
      <div class="flex justify-center">
        <button
          class="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
          @click="ask"
          :disabled="loading"
        >
          {{ loading ? 'Generating...' : 'Generate' }}
        </button>
      </div>

      <div class="mt-8">
        <ProfileCard v-if="response" :profile="response" />
      </div>
    </div>
  </div>
</template>

