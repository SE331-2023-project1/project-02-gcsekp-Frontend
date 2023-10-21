<script setup lang="ts">
import StudentService from '@/services/StudentService'
import type { StudentDetail } from '@/type'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'
import StudentCard from '../components/StudentCard.vue'

const students: Ref<Array<StudentDetail>> = ref([])
const itemsPerPage = 6
const currentPage = ref(1)

StudentService.getStudent()
  .then((response) => {
    students.value = response.data
  })
  .catch((error) => {
    console.error('Error fetching students:', error)
  })

const nextPage = () => {
  if (currentPage.value < Math.ceil(students.value.length / itemsPerPage)) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const displayedStudents = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return students.value.slice(startIndex, endIndex)
})
</script>

<template>
  <div
    class="mt-5 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-lg"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Students
      </h2>
    </div>

    <div class="student">
      <div class="mt-10 mb-10 grid gap-10 grid-cols-3 grid-row-3">
        <StudentCard
          v-for="student in displayedStudents"
          :key="student.id"
          :student="student"
        ></StudentCard>
      </div>
      <div class="pagination">
        <button
          v-if="currentPage > 1"
          @click="prevPage"
          class="ml-px mb-5 px-3 py-2 bg-teal-700 font-bold text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ease-in-out"
        >
          ◀ Back
        </button>
        <button
          v-if="currentPage < Math.ceil(students.length / itemsPerPage)"
          @click="nextPage"
          :class="[
            'mb-5 px-3 py-2 bg-teal-700 font-bold text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ease-in-out',
            currentPage > 1 ? 'ml-5' : ''
          ]"
        >
          Next ▶
        </button>
      </div>
    </div>
  </div>
</template>
