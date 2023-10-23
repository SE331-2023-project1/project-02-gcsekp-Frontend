<script setup lang="ts">
import AdviserList from '@/components/AdviserList.vue'
import BaseInput from '@/components/BaseInput.vue'
import router from '@/router'
import AdviserService from '@/services/AdviserService'
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
  AdviserService.getAdvisers(eventsPerPage.value, props.page).then(
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
    queryFunction = AdviserService.getAdvisers(6, 1)
  } else {
    queryFunction = AdviserService.getAdvisorByKeyword(keyword.value, 6, 1)
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
    <div class="w-64 ml-10 mt-10 font-mono">
      <BaseInput
        v-model="keyword"
        placeholder="Search..."
        @input="updateKeyword"
        class="w-full p-2 border"
      />
    </div>
    <div class="grid grid-cols-2 gap-2 mt-10">
      <AdviserList v-for="professers in professer" :key="professers.id" :professer="professers">
      </AdviserList>
    </div>
    <div class="flex justify-around space-x-28">
      <RouterLink
        :to="{ name: 'professer', query: { page: page - 1 } }"
        rel="prev"
        v-if="page != 1"
        id="page-prev"
        class="font-bold hover:text-red-800"
      >
        Prev page
      </RouterLink>
      <RouterLink
        :to="{ name: 'professer', query: { page: page + 1 } }"
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
