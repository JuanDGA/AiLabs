<script setup>
import { useObjectStore } from "@/stores/objectStore.js";
import { storeToRefs } from "pinia";

const objectsStore = useObjectStore();
const {objects, loading} = storeToRefs(objectsStore);
const { requestRandomObject } = objectsStore;

</script>

<template>
  <button @click="requestRandomObject" :disabled="loading" class="mt-4 px-4 py-2 bg-indigo-500 text-white rounded hover:bg-indigo-700 focus:outline-none focus:shadow-outline-indigo active:bg-indigo-800">
    Unleash the Unpredictable!
  </button>
  <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4">
    <div v-for="item in objects.toReversed()" :key="item.url" class="max-w-sm rounded overflow-hidden shadow-lg">
      <div v-if="item.image">
        <img :src="item.image" :alt="item.text" class="w-full h-auto" />
      </div>
      <div v-else class="bg-gray-300 w-full h-40"></div>
      <div class="px-6 py-4">
        <p class="text-medium text-gray-700 mb-2">
          "{{ item.text }}"
        </p>
      </div>
    </div>
  </div>
</template>