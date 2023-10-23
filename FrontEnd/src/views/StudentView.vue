<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import StudentCard from '@/components/StudentCard.vue'
import router from '@/router'
import StudentService from '@/services/StudentService'
import type { StudentItem } from '@/type'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
const students: Ref<Array<StudentItem>> = ref([])
const totalEvent = ref<number>(0)
const eventsPerPage = ref(6)
const props = defineProps({
  page: {
    type: Number,
    required: true,
    keyword: null
  }
})
watchEffect(() => {
  StudentService.getStudent(eventsPerPage.value, props.page).then(
    (response: AxiosResponse<StudentItem[]>) => {
      students.value = response.data
      totalEvent.value = response.headers['x-total-count']
    }
  )
})

const hasNextPages = computed(() => {
  const totalPages = Math.ceil(totalEvent.value / eventsPerPage.value)
  return props.page.valueOf() < totalPages
})

const keyword = ref('')
function updateKeyword(value: string) {
  let queryFunction
  if (keyword.value === '') {
    queryFunction = StudentService.getStudent(6, 1)
  } else {
    queryFunction = StudentService.getStudentByKeyword(keyword.value, 6, 1)
  }
  queryFunction
    .then((response: AxiosResponse<StudentItem[]>) => {
      students.value = response.data
      console.log('students', students.value)
      totalEvent.value = response.headers['x-total-count']
      console.log('totalStudent', totalEvent.value)
    })
    .catch(() => {
      router.push({ name: 'network-errorr' })
    })
}
</script>

<template>
  <div>
    <div class="w-64 ml-10 mt-10 font-mono">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        @input="updateKeyword"
        class="w-full p-2 border"
      />
    </div>
    <div class="grid grid-cols-2 gap-2 mb-4 mt-10">
      <StudentCard v-for="student in students" :key="student.studentID" :student="student">
      </StudentCard>
    </div>
    <div class="flex justify-around space-x-28">
      <RouterLink
        :to="{ name: 'students', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="font-bold hover:text-red-800"
      >
        Prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'students', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPages"
        id="page-next"
        class="font-bold hover:text-green-600"
      >
        Next page
      </RouterLink>
    </div>
  </div>
</template>
