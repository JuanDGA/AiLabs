<script setup>
  import { profileGenerator } from '@/service/generator.js'
  import ProfileCard from '@/components/ProfileCard.vue'

  const {loading, response, ask} = profileGenerator();
</script>

<template>
  <div class="bg-gray-50 min-h-screen">
    <div class="container mx-auto p-4">
      <h1 class="text-3xl font-semibold mb-2">Profile Cards Generator</h1>
      <h3 class="font-medium text-gray-500 mb-4">To start, please press the generate button</h3>
      <button
        class="bg-blue-500 text-white font-bold rounded-lg px-4 py-2 cursor-pointer hover:bg-blue-600 disabled:cursor-not-allowed disabled:bg-blue-400"
        @click="ask"
        :disabled="loading"
      >
        {{ loading ? 'Generating...' : 'Generate' }}
      </button>

      <div class="mt-8">
        <ProfileCard v-if="response" :profile="response" />
      </div>
    </div>
  </div>
</template>

