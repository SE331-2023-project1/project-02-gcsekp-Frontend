<script setup lang="ts">
import router from '@/router'
import { useMessageStore } from '@/stores/message'
import { type AdviserItem, type StudentItem } from '@/type'
import { ref, type PropType } from 'vue'
const props = defineProps({
  professer: {
    type: Object as PropType<AdviserItem>,
    require: true
  },
  student: {
    type: Object as PropType<StudentItem>,
    require: true
  }
})

const store = useMessageStore()
const comment = ref('')
function onSubmit() {
  store.updateMessage(String(props.student?.id), comment.value) // assuming adviserId is available from props or elsewhere
  comment.value = ''
  router.push({
    name: 'student-detail'
  })
}

function flashMessagge() {
  store.updateflashcard('Welcome to Adviser Profile')
  setTimeout(() => {
    store.resetflashcard()
  }, 3000)
  router.push({
    name: 'professer-profile',
    params: {
      id: props.professer?.id
    }
  })
}
</script>

<template>
  <div class="flex flex-row justify-center">
    <div class="font-mono text-center text-white">
      <div class="grid grid-cols-2 text-left">
        <p class="font-semibold">Advisor ID:</p>
        <p class="text-center">{{ student?.advisor.advisorID }}</p>
        <p class="font-semibold">Advisor Name-Surname:</p>
        <p class="text-center">{{ student?.advisor.name }} {{ student?.advisor.surname }}</p>
        <p class="font-semibold">Student Name:</p>
        <p class="text-center">{{ student?.name }} {{ student?.surname }}</p>
      </div>
    </div>
  </div>
  <div>
    <div class="text-center">
      <button
        @click="flashMessagge"
        class="font-extrabold hover:text-teal-600 font-mono text-white my-10"
      >
        More details
      </button>
    </div>
    <div class="text-center font-mono">
      <input
        type="text"
        placeholder="Enter comment .."
        v-model="comment"
        class="text-gray-600 h-16 w-80 p-2 break-words mt-2 text-center"
      />
      <div>
        <button
          @click="onSubmit"
          class="mb-10 mt-10 bg-teal-600 text-white hover:bg-teal-500 font-bold py-2 px-4 rounded"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  color: white;
}
</style>
