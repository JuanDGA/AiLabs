<script setup>
  import { profileGenerator } from '@/service/generator.js'
  import ProfileCard from '@/components/ProfileCard.vue'

  const {loading, response, ask} = profileGenerator();
</script>

<template>
  <div>Profile Cards</div>
  <button class="bg-blue-500 text-white font-bold rounded-lg px-3 py-1 cursor-pointer hover:bg-blue-600 disabled:cursor-progress disabled:bg-blue-400" @click="ask" :disabled="loading">Generate</button>
  <ProfileCard :profile="response" />
</template>
