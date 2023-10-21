<script setup lang="ts">
import { RouterLink } from 'vue-router'
</script>

<template>
  <!-- you can change the nav style here  -->
  <div class="m-0flex text-center bg-indigo-600 rounded-lg text-lg">
    <header>
      <nav class="mt-6">
        <ul class="flex border-">
          <li class="m-2">
            <div class="border-white py-2 px-4 text-black hover:text-white font-mono font-semibol">
              <RouterLink to="/">Student</RouterLink>
            </div>
          </li>

          <nav class="mt-6">
            <ul class="flex border-b">
              <li class="m-2">
                <div
                  class="bg-white border-white rounded-lg py-2 px-4 text-amber-500 hover:text-amber-200 font-mono font-semibold"
                >
                  <RouterLink to="/">Student</RouterLink>
                </div>
              </li>

              <li class="m-2">
                <div
                  class="bg-white border-white rounded-lg py-2 px-4 text-amber-500 hover:text-amber-200 font-mono font-semibold"
                >
                  <RouterLink to="/advisor">Advisor</RouterLink>
                </div>
              </li>

              <li class="mt-3">
                <div class="w-8 h-8">
                  <RouterLink to="/addPerson"
                    ><img src="./assets/add-friend.png" alt="addButton"
                  /></RouterLink>
                </div>
              </li>
            </ul>
          </nav>
        </ul>
      </nav>
    </header>
  </div>
</template>
