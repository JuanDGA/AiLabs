<script setup>
defineProps({
  icon: {
    type: String,
    required: true,
  },
  size: {
    type: String,
    default: "30px",
  },
});
</script>

<template>
  <span
    class="material-symbols-outlined flex justify-center items-center"
    :style="{ width: size, height: size }"
  >
    {{ icon }}
  </span>
</template>
