<script setup lang="ts">
import type { AdviserItem } from '@/type'
import { type PropType } from 'vue'
defineProps({
  professer: {
    type: Object as PropType<AdviserItem>,
    require: true
  }
})
</script>

<template>
  <RouterLink :to="{ name: 'professer-profile', params: { id: professer?.id } }">
    <div class="flex justify-center items-center mb-2">
      <div
        v-if="professer"
        class="border-2 w-full p-2 bg-gray-800 text-white rounded-md mr-10 ml-10 flex items-center justify-between"
      >
        <div class="flex flex-wrap items-center">
          <div class="flex">
            <div class="mr-2">
              <img
                v-for="image in professer?.image"
                :key="image"
                :src="image"
                alt=" professer image"
                class="mr-5 ml-5 border-2 border-white h-36 w-36 object-cover rounded-full"
              />
            </div>
            <div class="ml-2 text-left flex flex-col justify-center">
              <p class="text-lg font-mono font-bold">ProfesserID: {{ professer?.advisorID }}</p>
              <p class="text-lg font-mono font-bold">
                Name: {{ professer.name }} {{ professer.surname }}
              </p>
              <p class="text-lg font-mono font-bold">
                Amount of Advisee: {{ professer.studentList.length }}
              </p>
            </div>
          </div>
        </div>
        <div class="self-start ml-auto mt-3 mr-3">
          <RouterLink
            :to="{ name: 'update-advisor', params: { id: professer?.id } }"
            class="bg-teal-600 text-white font-bold py-2 px-4 rounded"
          >
            Edit
          </RouterLink>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
