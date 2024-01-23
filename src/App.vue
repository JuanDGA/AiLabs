<template>
  <div class="min-h-screen bg-purple-50">
    <router-view v-slot="{ Component }">
      <transition name="page">
        <component :is="Component" />
      </transition>
    </router-view>
  </div>
</template>

<style>
.page-enter-active,
.page-leave-active {
  transition: all 0.75s ease-out;
}

.page-enter-to {
  position: absolute;
  right: 0;
}

.page-enter-from {
  position: absolute;
  right: -100%;
}

.page-leave-to {
  position: absolute;
  left: -100%;
}

.page-leave-from {
  position: absolute;
  left: 0;
}
</style>
