<script setup>
import { useObjectStore } from "@/stores/objectStore.js";
import { storeToRefs } from "pinia";
import ObjectsBanner from "@/components/objects/ObjectsBanner.vue";

const objectsStore = useObjectStore();
const {objects, loading, hasBeenUsed} = storeToRefs(objectsStore);
const { requestRandomObject } = objectsStore;

</script>

<template>
  <div class="min-h-screen max-w-full bg-blue-50">
    <ObjectsBanner :collapsed="hasBeenUsed" />
    <div class="container mx-auto px-1">
      <button @click="requestRandomObject" :disabled="loading" class="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-700 focus:outline-none focus:shadow-outline-blue active:bg-blue-800">
        Unleash the Unpredictable!
      </button>
      <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 mt-3">
        <div v-for="item in objects.toReversed()" :key="item.url" class="max-w-sm rounded overflow-hidden shadow-lg">
          <div v-if="!item.loadingImage">
            <img :src="item.image" :alt="item.text" class="w-full h-auto" />
          </div>
          <div v-else class="bg-gray-300 w-full h-40 p-2 flex justify-center items-center"><span>Loading image...</span></div>
          <div class="px-6 py-4">
            <p class="text-medium text-gray-700 mb-2">
              "{{ item.text }}"
            </p>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>