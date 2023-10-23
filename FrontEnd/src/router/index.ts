import StudentService from '@/services/StudentService'
import { useStudentStore } from '@/stores/student'
import AddAdviserView from '@/views/AddAdviserView.vue'
import AdviserProfile from '@/views/AdviserProfile.vue'
import AdviserView from '@/views/AdviserView.vue'
import NetworkErrorView from '@/views/NetworkErrorView.vue'
import NotFoundView from '@/views/NotFoundView.vue'
import StudentView from '@/views/StudentView.vue'
import AdviserDetail from '@/views/event/AdviserDetail.vue'
import LayoutView from '@/views/event/LayoutView.vue'
import StudentDetail from '@/views/event/StudentDetail.vue'
import UpdateStudent from '@/views/event/updateStudent.vue'
import UpdateAdviserView from '@/views/updateAdvisor.vue'
import NProgress from 'nprogress'
import Login from '../views/Login.vue'
import Register from '../views/Register.vue'
import { createRouter, createWebHistory } from 'vue-router'
const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'students',
      component: StudentView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/advisors',
      name: 'professer',
      component: AdviserView,
      props: (route) => ({
        page: parseInt((route.query?.page as string) || '1')
      })
    },
    {
      path: '/advisors/:id',
      name: 'update-advisor',
      component: UpdateAdviserView
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
      path: '/AddView',
      name: 'AddView',
      component: AddAdviserView
    },
    {
      path: '/student/:id',
      name: 'event-layout',
      component: LayoutView,
      props: true,
      beforeEnter: (to) => {
        const id: number = parseInt(to.params.id as string)
        const studentStore = useStudentStore()
        return StudentService.getStudentById(id)
          .then((response) => {
            // need to set up the data
            studentStore.setStudent(response.data)
            StudentService.getAdviserById(Number(response.data.id)).then((response2) => {
              studentStore.setAdviser(response2.data)
            })
          })
          .catch((error) => {
            if (error.response && error.response.status === 404) {
              return {
                name: '404-resource',
                params: { resource: 'student' }
              }
            } else {
              return { name: 'network-error' }
            }
          })
      },
      children: [
        {
          path: '/students/:id',
          name: 'student-detail',
          component: StudentDetail,
          props: true
        },
        {
          path: '/student/adviser/:id',
          name: 'adviser-detail',
          component: AdviserDetail,
          props: true
        },
        {
          path: '/student/:id',
          name: 'update-student',
          component: UpdateStudent,
          props: true
        }
      ]
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView
    },
    {
      path: '/404/:resource',
      name: '404-resource',
      component: NotFoundView,
      props: true
    },
    {
      path: '/network-error',
      name: 'network-error',
      component: NetworkErrorView
    },
    {
      path: '/professer/profile/:id',
      name: 'professer-profile',
      component: AdviserProfile,
      props: true
    }
  ]
})

router.beforeEach(() => {
  NProgress.start()
})
router.afterEach(() => {
  NProgress.done()
})

export default router
