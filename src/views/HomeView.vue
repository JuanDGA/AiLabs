<script setup>
import ToolCard from "@/components/home/ToolCard.vue";
</script>

<template>
  <div class="container mx-auto px-4 pb-8">
    <div class="container mx-auto text-center py-16">
      <h1 class="text-5xl text-purple-700">Welcome to Our AI Laboratory</h1>
      <p class="text-xl text-purple-500 mt-4">Exploring the Future of Artificial Intelligence</p>
    </div>
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <ToolCard
        title="Present Yourself"
        description="Get a random person profile, or convert any idea into one."
        to="/profiles"
      />
      <ToolCard
        title="Japanese Names"
        description="Learn how to write your name and how to introduce yourself in japanese"
        to="/japanese"
      />
      <ToolCard
        title="Vocabulary: Objects"
        description="Get images of random day to day life objects."
        to="/objects"
      />
    </div>
  </div>
</template>
