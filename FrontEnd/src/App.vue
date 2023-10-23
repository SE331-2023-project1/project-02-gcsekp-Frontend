<script setup lang="ts">
import { RouterLink, RouterView } from "vue-router";
</script>

<template>
  <header>
    <nav
      class="flex justify-between items-center text-white font-mono mb-2 bg-red-800"
    >
      <div class="flex items-center font-mono">
        <img
          alt="Vue logo"
          src="https://logolook.net/wp-content/uploads/2021/11/Hogwarts-Logo.png"
          class="mt-5 mb-5 ml-20 h-20 w-70"
        />
        <p class="font-bold font-mono text-2xl">HOGWARTS MAGIC AWAKENED</p>
      </div>
      <div class="space-x-10 mr-20 font-mono">
        <RouterLink
          to="/"
          class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Student</RouterLink
        >
        <RouterLink
          to="/advisors"
          class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Advisor</RouterLink
        >
        <RouterLink
          to="/AddView"
          class="font-black transition-colors duration-300 hover:text-yellow-500 text-lg"
          active-class="active-link"
          exact-active-class="active-link"
          >Add Adviser</RouterLink
        >
      </div>
    </nav>
    <RouterView />
  </header>
</template>

<style scoped>
.active-link {
  color: rgb(255, 223, 63);
}
</style>
