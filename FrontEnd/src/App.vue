<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <header class="bg-teal-600 py-3">
    <div class="container mx-auto flex items-center justify-between mt-5 text-gray-800">
      <!-- Left-side navigation links -->
      <div class="space-x-6 px-10">
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
      </div>

      <!-- Right-side Login link -->
      <div>
        <RouterLink
          to="/Login"
          class="font-black text-lg ml-auto px-10"
          active-class="active-link"
          exact-active-class="active-link"
          >Login</RouterLink
        >
      </div>
    </div>
    <RouterView />
  </header>
</template>

<style scoped>
.active-link {
  color: white;
}
</style>
