<template>
  <div
    v-if="currentAdviser.id"
    class="flex flex-col items-center mt-10 bg-gray-600 mb-10 mr-10 ml-10 rounded-lg"
  >
    <p class="text-2xl font-mono font-bold text-center p-10 text-white">Update Adviser Details</p>
    <form>
      <div class="mb-4"></div>
      <div class="mb-4">
        <label for="Name" class="block text-white font-bold mb-2">Name</label>
        <input
          type="text"
          v-model="currentAdviser.name"
          class="w-full px-3 py-2 border text-black rounded-lg focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="Surname" class="block text-white font-bold mb-2">Surname</label>
        <input
          id="description"
          v-model="currentAdviser.surname"
          class="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="Department" class="block text-white font-bold mb-2">Department</label>
        <input
          type="text"
          v-model="currentAdviser.department"
          class="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
      <div class="mb-4">
        <label for="Position" class="block text-white font-bold mb-2">Position</label>
        <input
          type="text"
          v-model="currentAdviser.position"
          class="w-full px-3 py-2 border rounded-lg text-black focus:outline-none focus:ring focus:border-blue-300"
        />
      </div>
    </form>
    <div class="mb-5" v-if="message">
      <p class="text-white p-3 border border-teal-600 rounded">
        {{ message }}
      </p>
    </div>
    <div>
      <button
        type="submit"
        class="mt-10 mb-10 bg-teal-600 hover:bg-teal-500 text-white font-bold py-2 px-4 rounded"
        @click="updateStudent"
      >
        Update
      </button>
    </div>
  </div>
</template>

<script lang="ts">
import TeacherService from '@/services/TeacherService'
import AdviserItem from '@/types'
import ResponseData from '@/types/ResponseData'
import { defineComponent } from 'vue'

export default defineComponent({
  name: 'student',
  data() {
    return {
      currentAdviser: {} as AdviserItem,
      message: ''
    }
  },
  methods: {
    getStudet(id: any) {
      TeacherService.getAdviserById(id)
        .then((response: ResponseData) => {
          this.currentAdviser = response.data
          console.log(response.data)
        })
        .catch((e: Error) => {
          console.log(e)
        })
    },
    updateStudent() {
      let data = {
        id: this.currentAdviser.id,
        name: this.currentAdviser.name,
        surname: this.currentAdviser.surname,
        image: this.currentAdviser.image,
        department: this.currentAdviser.department,
        position: this.currentAdviser.position
      }
      TeacherService.updateTeacherById(this.currentAdviser.id, data)
        .then((response: ResponseData) => {
          console.log(response.data)
          this.message = 'The Adviser Information was updated successfully!'
          setTimeout(() => {
            this.message = '' // Clear the message
          }, 3000)
        })
        .catch((e: Error) => {
          console.log(e)
        })
    }
  },
  mounted() {
    this.message = ''
    this.getStudet(this.$route.params.id)
  }
})
</script>
