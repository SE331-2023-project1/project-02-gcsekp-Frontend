<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { type StudentItem } from '@/type'
import { computed, ref, type PropType } from 'vue'

const props = defineProps({
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})
const store = useMessageStore()
const message = computed(() => store.getMessage(String(props.student?.id)))
const detail = computed(() => store.getDetail(String(props.student?.id)))
const newDetail = ref('')
function addDetail() {
  store.addDetail(String(props.student?.id), newDetail.value)
  //clear input box
  newDetail.value = ''
}
</script>

<template>
  <div v-if="student" class="font-mono grid grid-cols-2 text-white">
    <p class="font-semibold text-left">Name-SurName:</p>
    <p class="text-justify">{{ student.name }} {{ student.surname }}</p>
    <p class="font-semibold text-left">Department:</p>
    <p class="text-justify">{{ student.department }}</p>
  </div>
  <div v-if="message" class="font-mono">
    <h1 class="font-semibold text-left">Comment from Advisor:</h1>
    <p class="text-center">" {{ message }} "</p>
  </div>
  <div v-if="detail && detail.length">
    <h1 class="text-center font-mono font-semibold text-white">Student Detail</h1>
    <p v-for="(details, index) in detail" :key="index" class="text-center">" {{ details }} "</p>
  </div>
  <div class="text-center font-mono">
    <input
      type="text"
      v-model="newDetail"
      placeholder="Add Student Detail.."
      class="h-10 w-80 p-2 break-words mt-4 rounded-lg text-black"
    />
    <div>
      <button
        @click="addDetail"
        class="mb-10 mt-10 bg-teal-600 text-white hover:bg-teal-500 font-bold py-2 px-4 rounded"
      >
        Add Detail
      </button>
    </div>
  </div>
</template>
