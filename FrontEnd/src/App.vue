<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header>
    <nav
      class="flex justify-between items-center text-black font-mono mb-2 bg-teal-600 h-20 min-h-full rounded-lg"
    >
      <div class="space-x-10 mr-20 font-mono">
        <RouterLink
          to="/"
          class="font-black text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Student</RouterLink
        >
        <RouterLink
          to="/advisors"
          class="font-black text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Advisor</RouterLink
        >
        <RouterLink
          to="/AddView"
          class="font-black text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Add Adviser</RouterLink
        >
        <RouterLink
          to="/Login"
          class="font-black text-lg ml-auto"
          active-class="active-link"
          exact-active-class="active-link"
          >Login</RouterLink
        >
      </div>
    </nav>
    <RouterView />
  </header>
</template>

<style scoped>
.active-link {
  color: white;
}
</style>
