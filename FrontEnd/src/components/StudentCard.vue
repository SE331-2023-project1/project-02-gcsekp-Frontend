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
      <div v-if="student" class="border-2 w-3/4 h-38 p-2 bg-red-800 text-white rounded-md">
        <div class="flex row-auto">
          <div class="mr-2">
            <img
              v-for="image in student?.image"
              :key="image"
              :src="image"
              alt=" student image"
              class="border-2 border-black h-36 w-32 object-cover"
            />
          </div>
          <div class="ml-2 text-left">
            <p class="text-lg font-mono font-bold">Student ID: {{ student?.studentID }}</p>
            <p>Name: {{ student?.name }}</p>
            <p>Surname: {{ student?.surname }}</p>
          </div>
        </div>
      </div>
    </div>
  </RouterLink>
</template>
