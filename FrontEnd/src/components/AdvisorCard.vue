<template>
  <div
    class="AdviorDetail-class border-2 w-auto h-auto rounded-lg shadow-lg mt-5 mb-5 w-250px bg-white pd-10 py-8 text-teal-600 text-base font-mono flex flex-col justify-center items-center"
  >
    <img class="mb-5 w-30 h-30 rounded-full" :src="advisor.advisor_pic" alt="img" />
    <div class="text-left ml-5 mr-5">
      <span class="font-bold"> First Name: </span>{{ advisor.FirstName }}
      <br />
      <span class="font-bold">Last Name:</span>{{ advisor.LastName }}
      <br />
      <span class="font-bold">Department:</span>{{ advisor.Department }}
      <br />
      <span class="font-bold">Email:</span>
      {{ advisor.Email }}
      <br />
      <span class="font-bold">Office:</span>
      {{ advisor.Office }}
    </div>
  </div>
</template>

<script setup lang="ts">
import { type AdvisorDetail } from '@/type'
import { ref, type PropType } from 'vue'

const AdvisorDetail = ref({})
const props = defineProps({
  advisor: {
    type: Object as PropType<AdvisorDetail>,
    required: true
  }
})
</script>
