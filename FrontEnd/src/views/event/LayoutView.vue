<script setup lang="ts">
import { useStudentStore } from '@/stores/student'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'

const store = useStudentStore()
const { student, professer } = storeToRefs(store)
const id = ref(student?.value?.id)
</script>

<template>
  <div v-if="student" class="flex flex-col items-center gap-5 bg-gray-600 m-10 rounded-lg">
    <img
      v-for="image in student?.image"
      :key="image"
      :src="image"
      alt="Student Image"
      class="mt-10 border-2 border-black h-48 w-48 object-cover rounded-full"
    />
    <h1 class="font-mono font-bold text-2xl text-white">StudentID: {{ student.studentID }}</h1>
    <div class="mb-4 space-x-5">
      <RouterLink
        :to="{ name: 'student-detail', params: { id } }"
        class="inline-block py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-500 transition-colors duration-300"
        active-class="active-link"
        exact-active-class="active-link"
      >
        Student Details
      </RouterLink>

      <RouterLink
        :to="{ name: 'adviser-detail', params: { id } }"
        class="inline-block py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-500 transition-colors duration-300"
        active-class="active-link"
        exact-active-class="active-link"
      >
        Adviser Details
      </RouterLink>

      <RouterLink
        :to="{ name: 'update-student', params: { id } }"
        class="inline-block py-2 px-4 bg-teal-600 text-white font-semibold rounded-md hover:bg-teal-500 transition-colors duration-300"
        active-class="active-link"
        exact-active-class="active-link"
      >
        Edit Student Details
      </RouterLink>
    </div>

    <RouterView :student="student" :professer="professer"></RouterView>
  </div>
</template>

<style scoped>
.active-link {
  background: white;
  color: black;
}
</style>
