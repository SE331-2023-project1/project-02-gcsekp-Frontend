import { useStudentStore } from '@/stores/student'
import { useTeacherStore } from '@/stores/teacher'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { createRouter, createWebHistory } from 'vue-router'
import AdvisorView from '../views/AdvisorView.vue'
import FormView from '../views/Form.vue'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import StudentAdvisorView from '../views/StudentAdvisorView.vue'
import StudentDetailView from '../views/StudentDetailView.vue'
import StudentLayoutView from '../views/StudentLayoutView.vue'
import StudentView from '../views/StudentView.vue'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'students',
      component: StudentView
    },
    {
      path: '/advisor',
      name: 'advisor',
      component: AdvisorView
    },
    {
      path: '/student/:id',
      name: 'student-layout',
      component: StudentLayoutView,
      props: true,
      children: [
        {
          path: '',
          name: 'student-detail',
          component: StudentDetailView,
          props: true
        },
        {
          path: 'advisor/:advisorId',
          name: 'student-advisor',
          component: StudentAdvisorView,
          props: true
        },
        {
          path: '/Login',
          name: 'Login',
          component: Login
        },
        {
          path: '/Register',
          name: 'Register',
          component: Register
        },
        {
          path: '/From',
          name: 'Form',
          component: FormView,
          props: true
        }
      ]
    },
    {
      path: '/Form',
      name: 'Form',
      component: FormView,
      props: true
    }
  ]
})

router.beforeEach(async () => {
  NProgress.start()
  const teacherStore = useTeacherStore()
  const studentStore = useStudentStore()
  if (teacherStore.teachers.length === 0) {
    await teacherStore.fetchTeachersFromDB()
  }
  if (studentStore.students.length === 0) {
    await studentStore.fetchStudentsFromDB()
  }
})

// Start the progress bar on navigation
router.beforeEach(() => {
  NProgress.start()
})

// Complete the progress bar after navigation
router.afterEach(() => {
  NProgress.done()
})

// const fetchStudents = async () => {
//   try {
//     const response = await StudentService.getStudent();
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching students:', error);
//     return [];
//   }
// };

// router.beforeEach(async () => {
//   const studentData: StudentDetail[] = await fetchStudents();
//   StudentService.getStudent(studentData);
// })

// const fetchTeacher = async () => {
//   try {
//     const response = await TeacherService.getTeacher();
//     return response.data;
//   } catch (error) {
//     console.error('Error fetching Teacher:', error);
//     return [];
//   }
// };

// router.beforeEach(async () => {
//   const TeacherData: TeacherDetail[] = await fetchTeacher();
//   StudentService.getStudent(TeacherData);
// })

export default router
