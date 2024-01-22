<script setup>
  defineProps({
    to: {
      type: String,
      required: true
    },
    title: {
      type: String,
      required: true
    },
    description: {
      type: String,
      required: true
    }
  })
</script>

<template>
  <div class="rounded-lg bg-purple-100 p-6">
    <h2 class="text-lg font-semibold">{{title}}</h2>
    <p class="mt-2 text-gray-600">{{description}}</p>
    <router-link
      class="inline-block mt-4 px-4 py-2 bg-purple-600 text-white text-sm font-medium rounded-lg hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
      :to="to"
    >
      Go
    </router-link>
  </div>
</template>
