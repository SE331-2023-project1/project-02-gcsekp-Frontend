<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import type { StudentDetail } from '@/type'
import { computed, ref, type PropType } from 'vue'

const props = defineProps({
  student: {
    type: Object as PropType<StudentDetail>,
    require: true
  }
})

const store = useMessageStore()
const message = computed(() => store.getMessage(String(props.student?.id)))
const detail = computed(() => store.getDetail(String(props.student?.id)))
const newDetail = ref('')
const flashMessage = ref({
  text: '',
  isVisible: false
})

function addDetail() {
  store.addDetail(String(props.student?.id), newDetail.value)
  //clear input box
  newDetail.value = ''
}

flashMessage.value.text = 'The Student Details Are Here....'
flashMessage.value.isVisible = true

setTimeout(() => {
  flashMessage.value.isVisible = false
}, 2000)
</script>

<template>
  <div class="h-13 flex items-center justify-center">
    <div
      class="text-center p-3 rounded-lg shadow-lg mt-5 mb-5 bg-white text-teal-600 text-base font-mono"
    >
      <div v-if="student">
        <p><span class="font-mono font-semibold">First Name :</span> {{ student.FirstName }}</p>
        <p><span class="font-mono font-semibold">Last Name :</span> {{ student.LastName }}</p>
        <p><span class="font-mono font-semibold">Student ID :</span> {{ student.Student_ID }}</p>
        <p>
          <span class="font-mono font-semibold mb-1">Registered on :</span> {{ student.registered }}
        </p>
      </div>
    </div>
  </div>

  <!-- Add Comment Box ... -->
  <div v-if="detail && detail.length">
    <h1 class="text-center font-mono font-semibold text-white">Comments</h1>
    <p v-for="(details, index) in detail" :key="index" class="text-white">" {{ details }} "</p>
  </div>
  <div class="mt-4">
    <div class="addDetail">
      <input
        class="border-2 border-inherit text-black"
        type="text"
        v-model="newDetail"
        placeholder="Type your comment .."
      />
      <span class="ml-5"></span>
      <button
        @click="addDetail"
        class="mt-2 w-36 text-center ml-px px-3 py-0.5 bg-cyan-900 font-bold text-white rounded-md hover:bg-gray-500 transition-colors duration-200 ease-in-out font-mono mb-10"
      >
        Add Comment
      </button>
    </div>
  </div>

  <!-- Flash Message -->

  <div v-if="flashMessage.isVisible" class="mt-4">
    <div class="bg-yellow-400 text-red-500 p-2 rounded">
      {{ flashMessage.text }}
    </div>
  </div>
</template>
