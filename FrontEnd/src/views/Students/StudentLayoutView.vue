<script setup lang="ts">
import AdvisorService from '@/services/AdvisorService'
import StudentService from '@/services/StudentService'
import type { AdvisorDetail, StudentDetail } from '@/type'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const student = ref<StudentDetail | null>(null)
const advisor = ref<AdvisorDetail | null>(null)

const router = useRouter()

const props = defineProps({
  id: String
})

StudentService.getStudentById(Number(props.id))
  .then((response) => {
    student.value = response.data
  })
  .catch((error) => {
    console.log(error)
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'student' } })
    } else {
      router.push({ name: 'network-error' })
    }
  })

AdvisorService.getAdvisorById(Number(props.id))
  .then((response) => {
    advisor.value = response.data
  })
  .catch((error) => {
    console.log(error)
    if (error.response && error.response.status === 404) {
      router.push({ name: '404-resource', params: { resource: 'advisor' } })
    } else {
      router.push({ name: 'network-error' })
    }
  })
</script>

<template>
  <div class="text-center bg-gray-800 rounded-lg">
    <div v-if="student">
      <h1 class="text-2xl font-mono font-semibold mt-5 mb-5 text-white">
        {{ `${student.FirstName} ${student.LastName}` }}
      </h1>
      <img class="mb-5 mt-5 mx-auto w-30 h-30 rounded-full" :src="student.stu_pic" alt="img" />

      <div id="nav">
        <RouterLink
          class="w-1/2 mr-3 bg-cyan-900 text-white font-mono font-semibold py-2 rounded text-center"
          :to="{ name: 'student-detail', params: { id } }"
          >Student's Details</RouterLink
        >
        <span class="text-white w-2">|</span>
        <RouterLink
          class="w-1/2 ml-3 bg-cyan-900 text-white font-mono font-semibold py-2 rounded text-center"
          :to="{ name: 'student-advisor', params: { id, advisorId: student.advisor } }"
          >Student's Advisor</RouterLink
        >
      </div>
    </div>
    <RouterView class="mt-3 mb-6" :student="student"></RouterView>
    <!-- <div class="mt-10">
      <RouterLink
        class="ml-px px-3 py-2 bg-white font-bold text-teal-600 rounded-md hover: transition-colors duration-200 ease-in-out"
        to="/"
      >
        ◀ Back to Students</RouterLink
      >
    </div> -->
  </div>
</template>
