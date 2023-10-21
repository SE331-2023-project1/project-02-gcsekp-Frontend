<script setup lang="ts">
import { RouterLink, RouterView } from 'vue-router'
</script>

<template>
  <div class="flex flex-col items-center justify-start bg-gray-800 w-full">
    <header>
      <nav class="mt-6">
        <ul class="flex border-b">
          <li class="m-2">
            <div
              class="rounded-lg py-2 px-4 text-teal-600 hover:text-white font-mono font-semibold text-lg font-bold"
            >
              <RouterLink to="/">Student</RouterLink>
            </div>
          </li>

          <li class="m-2">
            <div
              class="rounded-lg py-2 px-4 text-teal-600 hover:text-white font-mono font-semibold text-lg font-bold"
            >
              <RouterLink to="/advisor">Advisor</RouterLink>
            </div>
          </li>
          <li class="m-2">
            <div
              class="rounded-lg py-2 px-4 text-teal-600 hover:text-white font-mono font-semibold text-lg font-bold"
            >
              <RouterLink to="/addPerson"> ADD People </RouterLink>
            </div>
          </li>

          <li class="m-2">
            <div
              class="rounded-lg py-2 px-4 text-teal-600 hover:text-white font-mono font-semibold text-lg font-bold"
            >
              <RouterLink to="/Login">Login</RouterLink>
            </div>
          </li>
        </ul>
      </nav>

      <!-- <img alt="Vue logo" class="logo" src="@/assets/management.png" width="125" height="125" />
    <div class="wrapper">
      <nav class="font-mono text-yellow-300" >
        <RouterLink to="/">Student</RouterLink>
        <RouterLink to="/advisor">Advisor</RouterLink>
      </nav>
    </div> -->
    </header>
  </div>

  <RouterView />
</template>
