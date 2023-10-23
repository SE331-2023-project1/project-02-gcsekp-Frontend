<template>
  <div
    class="flex min-h-full flex-1 flex-col justify-center px-6 py-12 lg:px-8 bg-gray-600 w-full rounded-lg"
  >
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <h2 class="mt-3 text-center text-2xl font-bold leading-9 tracking-tight text-white">Login</h2>
    </div>

    <!-- username-->
    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <form class="space-y-6" @submit.prevent="login">
        <!-- username-->
        <div>
          <div class="flex items-center justify-between">
            <label for="username" class="block text-sm font-medium leading-6 text-white"
              >Username</label
            >
          </div>
          <div class="mt-2">
            <input
              id="username"
              v-model="formData.username"
              type="text"
              autocomplete="username"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-600 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- password -->
        <div>
          <div class="flex items-center justify-between">
            <label for="password" class="block text-sm font-medium leading-6 text-white"
              >Password</label
            >
          </div>
          <div class="mt-2">
            <input
              id="password"
              v-model="formData.password"
              type="password"
              autocomplete="current-password"
              required
              class="block w-full rounded-md border-0 py-1.5 px-3 text-black shadow-sm ring-1 ring-inset ring-gray-300 placeholder:text-gray-400 focus:ring-2 focus:ring-inset focus:ring-indigo-600 sm:text-sm sm:leading-6"
            />
          </div>
        </div>

        <!-- Login button -->
        <div>
          <button
            type="submit"
            class="mt-10 flex w-full justify-center rounded-md text-white px-3 py-1.5 text-sm font-semibold leading-6 bg-teal-600 shadow-sm focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-indigo-600"
          >
            Sign in
          </button>
        </div>
      </form>

      <p class="mt-10 text-center text-sm text-white">
        Don't have an account?
        {{ ' ' }}
        <RouterLink to="/Register" class="font-semibold leading-6 text-teal-600 hover:text-white"
          >Register</RouterLink
        >
      </p>
    </div>
  </div>
</template>

<script>
import axios from 'axios'

export default {
  data() {
    return {
      formData: {
        username: '',
        password: ''
      }
    }
  },
  methods: {
    sendPost() {
      // Create a payload object from formData
      const postData = {
        username: this.formData.username,
        password: this.formData.password
      }

      axios
        .post('http://localhost:8080/api/v1/auth/authenticate', postData)
        .then((res) => {
          // Handle the API response, e.g., store access token in local storage
          localStorage.setItem('access_token', res.data.access_token)
        })
        .catch((error) => {
          // Handle API errors here
          console.error('Error:', error)
        })
    },
    login() {
      if (!this.formData.username || !this.formData.password) {
        alert('Please fill in both the username and password fields.')
      } else {
        this.sendPost() // Call the sendPost function to send data to the API
        this.$router.push('/')
      }
    }
  }
}
</script>
