<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
    <div v-if="student" class="StudentDetail-class">
      <div
        class="StudentDetail-class border-2 w20-h20 rounded-lg shadow-lg mt-5 mb-5 w-250px bg-gray-100 pd-10 py-8 text-teal-600 text-base font-mono cursor-pointer flex flex-col justify-center items-center transition-transform transform-gpu hover:scale-105 hover:shadow-md"
      >
        <img class="mt-5 w-30 h-30 rounded-full" :src="student.stu_pic" alt="img" />
        <span class="mt-5 font-bold text-xl">
          {{ `${student.FirstName.toUpperCase()} ${student.LastName.toUpperCase()}` }}</span
        >
      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { type StudentDetail } from '@/type'
import { ref, type PropType } from 'vue'

const StudentDetail = ref({})
const props = defineProps({
  student: {
    type: Object as PropType<StudentDetail>,
    required: true
  }
})
</script>

<!-- <style scoped>
.StudentDetail-class {
  width: 300px;
  cursor: pointer;
}
  
.StudentDetail-class:hover {
  transform: scale(1.01);
  box-shadow: 0 3px 12px 0 rgba(0, 0, 0, 0.2);
}
</style> -->
