<script setup lang="ts">
import BaseInput from '@/components/BaseInput.vue'
import TeacherList from '@/components/TeacherList.vue'
import router from '@/router'
import TeacherService from '@/services/TeacherService'
import { useAdviserStore } from '@/stores/newAdviser'
import type { AdviserItem } from '@/type'
import type { AxiosResponse } from 'axios'
import type { Ref } from 'vue'
import { computed, ref, watchEffect } from 'vue'
const adviserStore = useAdviserStore()
const professer: Ref<Array<AdviserItem>> = ref([])
const totalEvent = ref<number>(0)
const eventsPerPage = ref(4)
const props = defineProps({
  page: {
    type: Number,
    required: true,
    keyword: null
  }
})
watchEffect(() => {
  TeacherService.getAdvisers(eventsPerPage.value, props.page).then(
    (response: AxiosResponse<AdviserItem[]>) => {
      professer.value = response.data
      professer.value = [...adviserStore.getTemporaryAdviser(), ...professer.value]
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
    queryFunction = TeacherService.getAdvisers(6, 1)
  } else {
    queryFunction = TeacherService.getAdvisorByKeyword(keyword.value, 6, 1)
  }
  queryFunction
    .then((response: AxiosResponse<AdviserItem[]>) => {
      professer.value = response.data
      console.log('students', professer.value)
      totalEvent.value = response.headers['x-total-count']
      console.log('totalAdvisor', totalEvent.value)
    })
    .catch(() => {
      router.push({ name: 'network-errorr' })
    })
}
</script>

<template>
  <div>
    <div class="w-full ml-1 mr-1 mt-10 font-mono p-10">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        @input="updateKeyword"
        class="w-full p-2 border text-black rounded"
      />
    </div>
    <div class="grid grid-cols-1 gap-2 mt-10">
      <TeacherList v-for="professers in professer" :key="professers.id" :professer="professers">
      </TeacherList>
    </div>
    <div class="mt-10 mb-10 flex justify-around space-x-30">
      <RouterLink
        :to="{ name: 'professer', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="inline-block py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-white hover:text-black transition-colors duration-300 text-xl"
      >
        Back
      </RouterLink>
      <RouterLink
        :to="{ name: 'professer', query: { page: page + 1 } }"
        rel="next"
        v-if="hasNextPages"
        id="page-next"
        class="inline-block py-2 px-4 bg-gray-800 text-white font-semibold rounded-md hover:bg-white hover:text-black transition-colors duration-300 text-xl"
      >
        Next
      </RouterLink>
    </div>
  </div>
</template>
