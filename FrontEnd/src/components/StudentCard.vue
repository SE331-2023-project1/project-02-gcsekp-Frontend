<template>
  <RouterLink :to="{ name: 'student-detail', params: { id: student.id } }">
    <div v-if="student" class="StudentDetail-class">

      <div class="StudentDetail-class
                  border-2 w20-h20
                  rounded-lg
                  shadow-lg
                  mt-5 mb-5 w-250px
                  bg-white pd-10 py-8
                  text-amber-500
                  text-base
                  font-mono
                  hover:bg-amber-200
                  cursor-pointer
                  flex flex-col justify-center items-center" >
          <span class="font-bold text-xl"> {{ `${student.FirstName.toUpperCase()} ${student.LastName.toUpperCase()}` }}</span>
          <hr class="font-bold w-20 mt-4 border-orange-700">
          <img class="mt-5 w-30 h-30" :src = "student.stu_pic" alt="img">

      <div
        class="StudentDetail-class border-2 w20-h20 rounded-lg shadow-lg mt-5 mb-5 w-250px bg-white pd-10 py-8 text-black text-base font-mono hover:bg-white-50 cursor-pointer flex flex-col justify-center items-center"
      >
        <img
          class="w-30 h-30 relative rounded-full overflow-hidden my-8"
          :src="student.stu_pic"
          alt="img"
        />
        <span class="font-bold text-xl">
          {{ `${student.FirstName.toUpperCase()} ${student.LastName.toUpperCase()}` }}</span
        >

      </div>
    </div>
  </RouterLink>
</template>

<script setup lang="ts">
import { type StudentDetail } from '@/type';
import { ref, type PropType } from 'vue';

const StudentDetail = ref({})
const props = defineProps({
  student: {
    type: Object as PropType<StudentDetail>,
    required: true
  }
})
</script>

