<template>
  <div
    class="mt-5 flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-800 rounded-lg"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">
        Add Person
      </h2>
    </div>
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm w-full bg-gray-800 p-3 rounded-lg">
      <!-- <div class="flex flex-col p-3 border rounded-lg mb-4 bg-gray-800 shadow-md my-5 mx-auto w-full"> -->
      <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
        <h1 class="flex justify-center font-bold text-2xl mb-3 text-white">Add Person</h1>
        <div class="flex flex-col mb-3 mt-10">
          <label class="my-auto" for="personType">Select Person Type:</label>
          <select
            v-model="selectedPersonType"
            id="personType"
            class="mt-3 mb-10 ml-2 bg-gray-50 border border-gray-300 text-gray-800 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
          >
            <option value="student">Student</option>
            <option value="teacher">Advisor</option>
          </select>
        </div>

        <div v-if="selectedPersonType === 'student'">
          <!-- Form to add student -->
          <form @submit.prevent="addStudent">
            <div class="flex flex-col mb-10">
              <label for="studentName" class="my-auto mr-2">Name:</label>
              <input
                class="mt-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="studentName"
                type="text"
                id="studentName"
                required
                pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)."
              />
            </div>

            <div class="flex flex-col mb-10">
              <label for="studentSurname" class="my-auto mx-2">Surname:</label>
              <input
                class="mt-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="studentSurname"
                type="text"
                id="studentSurname"
                required
                pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)."
              />
            </div>

            <div class="flex flex-col mb-10">
              <label for="studentProfileImage" class="mr-2">Profile Image URL:</label>
              <input
                class="mt-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="studentProfileImage"
                type="text"
                id="studentProfileImage"
                required
                pattern="https?://.+"
                placeholder="('http://..' or 'https://..)"
                title="Must start with 'http://' or 'https://'"
              />
            </div>

            <div class="flex flex-col mb-10">
              <!-- course list -->
              <label for="studentCourseList" class="my-auto mr-2">Course List:</label>
              <select
                class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="studentCourseList"
                id="studentCourseList"
                required
              >
                <option value disabled>Select Course</option>

                <option value="Psychology">Psychology</option>
                <option value="Computer Science">Computer Science</option>
                <option value="Economics">Economics</option>
                <option value="History">History</option>
                <option value="Physics">Physics</option>
                <option value="Biology">Biology</option>
                <option value="English Literature">English Literature</option>
                <option value="Physical Education">Physical Education</option>
                <option value="Chemistry">Chemistry</option>
                <option value="Mathematics">Mathematics</option>
                <option value="French">French</option>
                <option value="Geography">Geography</option>
                <option value="Art">Art</option>
                <option value="Music">Music</option>
                <option value="English">English</option>
                <option value="Spanish">Spanish</option>
              </select>
            </div>

            <div class="flex flex-col mb-10">
              <label for="studentAdvisor" class="my-auto mr-2">Advisor:</label>
              <select
                class="mt-3 bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="studentTeacher"
                id="studentAdvisor"
              >
                <option value="" disabled>Select a Advisor</option>
                <option value="101">Dr. Sarah</option>
                <option value="102">Prof. David</option>
                <option value="103">Dr. Maria</option>
                <option value="104">Prof. John</option>
                <option value="105">Dr. Emil</option>
                <option value="106">Prof. Michael</option>
                <option value="107">Dr. Laura</option>
                <option value="108">Prof. Jessica</option>
                <option value="109">Dr. Robert</option>
                <option value="110">Prof. Sarah</option>
              </select>
            </div>

            <div class="flex flex-col mb-10">
              <button
                class="mt-3 bg-teal-700 shadow-md px-2 py-1 rounded-lg font-bold hover:bg-teal-600 text-white h-10"
                type="submit"
              >
                Add Student
              </button>
            </div>
          </form>
        </div>

        <div v-else-if="selectedPersonType === 'teacher'">
          <!-- Form to add advisor-->
          <form @submit.prevent="addTeacher">
            <div class="flex flex-col mb-10">
              <label for="teacherName" class="mr-2 my-auto">Name:</label>
              <input
                class="mt-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="teacherName"
                type="text"
                id="teacherName"
                required
                pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)."
              />
            </div>

            <div class="flex flex-col mb-10">
              <label for="teacherSurname" class="mr-2 my-auto">Surname:</label>
              <input
                class="mt-3 w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="teacherSurname"
                type="text"
                id="teacherSurname"
                required
                pattern="[A-Za-z]+"
                title="Please enter a valid name (only alphabetic characters are allowed)."
              />
            </div>

            <div class="flex flex-col mb-10">
              <label for="teacherProfileImage" class="mr-2">Profile Image URL:</label>
              <input
                placeholder="('http://..' or 'https://..)"
                class="w-full bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-sky-500 focus:border-sky-500 block p-2.5"
                v-model="teacherProfileImage"
                type="text"
                id="teacherProfileImage"
                required
                pattern="https?://.+"
                title="Must start with 'http://' or 'https://'"
              />
            </div>

            <div class="flex justify-center mb-10">
              <button
                class="mt-3 bg-teal-700 shadow-md px-2 py-1 rounded-lg font-bold hover:bg-teal-600 text-white h-10"
                type="submit"
              >
                Add Teacher
              </button>
            </div>
          </form>
        </div>
      </div>
      <!-- </div> -->
    </div>
  </div>
</template>

<script setup lang="ts">
import { useMessageStore } from '@/stores/message'
import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import type { AdvisorDetail, StudentDetail } from '@/type'
import { storeToRefs } from 'pinia'
import { ref } from 'vue'
import { useRouter } from 'vue-router'

const selectedPersonType = ref('student')
const studentName = ref('')
const studentSurname = ref('')
const studentProfileImage = ref('')
const studentCourseList = ref('')
const studentTeacher = ref('')

const teacherName = ref('')
const teacherSurname = ref('')
const teacherProfileImage = ref('')
const teacherStudents = ref('')

const router = useRouter()

const storeMessage = useMessageStore()
const { message } = storeToRefs(storeMessage)

const addStudent = () => {
  const store = useStudentStore()

  const generateRandomID = () => {
    const min = 100000
    const max = 999999
    return Math.floor(Math.random() * (max - min + 1)) + min
  }

  const newStudent: StudentDetail = {
    id: generateRandomID(),
    Student_ID: generateRandomID().toString(),
    FirstName: studentName.value,
    LastName: studentSurname.value,
    stu_pic: studentProfileImage.value,
    registered: studentCourseList.value
      .split(',')
      .map((course) => course.trim())
      .join(', '),
    advisor: parseInt(studentTeacher.value)
  }

  store.addStudent(newStudent)

  console.log(newStudent)

  storeMessage.updateMessage('You are successfully for adding student.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)

  clearStudentForm()
}

const fetchTeachers = () => {
  const teacherStore = useTeacherStore()
  teacherStore.fetchTeachersFromDB()

  console.log(teacherStore.getTeachers)
}

const addTeacher = () => {
  const storeTeacher = useTeacherStore()

  const generateRandomTID = () => {
    const min = 100
    const max = 999
    const randomThreeDigitNumber = Math.floor(Math.random() * (max - min + 1)) + min
    return randomThreeDigitNumber
  }

  const newTeacher: AdvisorDetail = {
    id: generateRandomTID(),
    FirstName: teacherName.value,
    LastName: teacherSurname.value,
    advisor_pic: teacherProfileImage.value
  }

  storeTeacher.addTeacher(newTeacher)
  console.log(newTeacher)

  fetchTeachers()

  storeMessage.updateMessage('You are successfully for adding teacher.')
  setTimeout(() => {
    storeMessage.resetMessage()
  }, 4000)

  clearTeacherForm()
}

const clearStudentForm = () => {
  studentName.value = ''
  studentSurname.value = ''
  studentProfileImage.value = ''
  studentCourseList.value = ''
  studentTeacher.value = ''
}

const clearTeacherForm = () => {
  teacherName.value = ''
  teacherSurname.value = ''
  teacherProfileImage.value = ''
  teacherStudents.value = ''
}
</script>
