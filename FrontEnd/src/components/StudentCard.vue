<script setup lang="ts">
import type { StudentItem } from '@/type'
import { type PropType } from 'vue'
const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
</script>
<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student?.id } }">
    <div class="flex justify-center items-center mb-2">
      <div v-if="student" class="border-2 w-full p-2 bg-gray-800 text-white rounded-md mr-10 ml-10">
        <div class="flex">
          <div class="mr-2">
            <img
              v-for="image in student?.image"
              :key="image"
              :src="image"
              alt=" student image"
              class="mr-5 ml-5 border-2 border-white h-36 w-36 object-cover rounded-full"
            />
          </div>
          <div class="ml-2 text-left flex flex-col justify-center">
            <p class="text-lg font-mono font-bold">Student ID: {{ student?.studentID }}</p>
            <p>Name: {{ student?.name }}</p>
            <p>Surname: {{ student?.surname }}</p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
