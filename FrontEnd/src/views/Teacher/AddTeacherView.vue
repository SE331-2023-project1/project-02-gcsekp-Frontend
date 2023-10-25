<script setup lang="ts">
import UploadImage from '@/components/UploadImage.vue'
import TeacherService from '@/services/TeacherService'
import { useMessageStore } from '@/stores/message'
import type { AdviserItem } from '@/type'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const store = useMessageStore()
const { flashMessage } = storeToRefs(store)
const router = useRouter()

const adviser = ref<AdviserItem>({
  id: 0,
  name: '',
  surname: '',
  position: '',
  image: [],
  department: '',
  studentList: [],
  student: {
    id: 0,
    name: '',
    surname: '',
    studentID: '',
    image: [],
    department: ''
  }
})

function saveAdviser() {
  TeacherService.saveAdviser(adviser.value).then((res) => {
    console.log(res.data)
    router
      .push({
        name: 'professer',
        params: { id: res.data.id }
      })
      .catch(() => {
        router.push({ name: 'network-error ' })
      })

    store.updateflashcard('Successfully to add new Adviser for ' + res.data.name)
    setTimeout(() => {
      store.resetflashcard()
    }, 3000)
  })
}
</script>

<template>
  <div class="flex justify-center">
    <div class="text-center bg-gray-600 rounded-lg mt-10 mr-10 ml-10 w-full mb-10">
      <div class="my-10">
        <p class="text-2xl font-mono font-bold text-center text-white">Add Adviser Details</p>
        <p class="text-center text-blue-600">{{ flashMessage }}</p>
      </div>
      <div class="flex justify-center">
        <form @submit.prevent="saveAdviser">
          <div class="grid grid-cols-2 gap-2 font-mon text-white">
            <p class="text-left">Name:</p>
            <input
              v-model="adviser.name"
              type="text"
              placeholder="Add Name..."
              class="text-start border-2 text-gray-800 rounded text"
            />
            <p class="text-left">SurName:</p>
            <input
              v-model="adviser.surname"
              type="text"
              placeholder="Add SurName..."
              class="text-start border-2 text-gray-800 rounded"
            />
            <p class="text-left">Department:</p>
            <input
              v-model="adviser.department"
              type="text"
              placeholder="Add Department..."
              class="text-start border-2 text-gray-800 rounded"
            />
          </div>
          <div class="mt-10 justify-center font-mono text-white">
            <h3 class="my-5">Image for Advisor</h3>
            <UploadImage v-model="adviser.image" />
          </div>
          <button
            type="submit"
            class="mt-20 mb-20 justify-center bg-teal-600 font-mono text-white hover:text-gray-800 hover:bg-white p-2 mt-4 rounded-lg"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
