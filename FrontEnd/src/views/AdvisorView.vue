<script setup lang="ts">
import AdvisorCard from '@/components/AdvisorCard.vue'
import AdvisorService from '@/services/AdvisorService'
import type { AdvisorDetail } from '@/type'
import type { Ref } from 'vue'
import { computed, ref } from 'vue'

const advisors: Ref<Array<AdvisorDetail>> = ref([])
const itemsPerPage = 3
const currentPage = ref(1)

AdvisorService.getAdvisor()
  .then((response) => {
    advisors.value = response.data
  })
  .catch((error) => {
    console.error('Error fetching advisors:', error)
  })

const nextPage = () => {
  if (currentPage.value < Math.ceil(advisors.value.length / itemsPerPage)) {
    currentPage.value++
  }
}

const prevPage = () => {
  if (currentPage.value > 1) {
    currentPage.value--
  }
}

const displayedadvisors = computed(() => {
  const startIndex = (currentPage.value - 1) * itemsPerPage
  const endIndex = startIndex + itemsPerPage
  return advisors.value.slice(startIndex, endIndex)
})
</script>

<template>
  <div
    class="mt-5 mb-10 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-lg"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Advisors
      </h2>
    </div>

    <div class="advisor">
      <div class="mt-10 mb-10 grid gap-10 grid-cols-3 grid-row-3">
        <AdvisorCard
          v-for="advisor in displayedadvisors"
          :key="advisor.id"
          :advisor="advisor"
        ></AdvisorCard>
      </div>
    </div>
    <div class="pagination flex justify-between">
      <button
        v-if="currentPage > 1"
        @click="prevPage"
        class="ml-px mb-5 px-3 py-2 bg-teal-700 font-bold text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ease-in-out"
      >
        ◀ Back
      </button>
      <button
        v-if="currentPage < Math.ceil(advisors.length / itemsPerPage)"
        @click="nextPage"
        :class="[
          'mb-5 px-3 py-2 bg-teal-700 font-bold text-white rounded-md hover:bg-teal-600 transition-colors duration-200 ease-in-out ',
          currentPage > 1 ? 'ml-10' : ''
        ]"
      >
        Next ▶
      </button>
    </div>
  </div>
</template>
