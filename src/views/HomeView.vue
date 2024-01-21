<script setup>
  import PageDescription from '@/components/home/PageDescription.vue'
</script>

<template>
  <div class="container mx-auto px-4 pb-8">
    <div class="grid grid-cols-1 md:grid-cols-3 gap-6">
      <PageDescription title="ProfileIt" description="Get random person profile, or convert any idea into one." to="/profiles" />
      <PageDescription title="Japanese" description="Learn how to write your name and how to introduce yourself in japanese" to="/japanese" />
      <PageDescription title="DayToDay" description="Get images of random day to day life objects." to="/objects" />
    </div>
  </div>
</template>
