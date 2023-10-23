<script setup lang="ts">
import { ref } from "vue";
import type { AdviserItem } from "@/type";
import { useMessageStore } from "@/stores/message";
import { storeToRefs } from "pinia";
import { useRouter } from "vue-router";
import AdviserService from "@/services/AdviserService";
import UploadImage from "@/components/UploadImage.vue";

const store = useMessageStore();
const { flashMessage } = storeToRefs(store);
const router = useRouter();

const adviser = ref<AdviserItem>({
  id: 0,
  name: "",
  surname: "",
  position: "",
  image: [],
  department: "",
  studentList: [],
  student: {
    id: 0,
    name: "",
    surname: "",
    studentID: "",
    image: [],
    department: "",
  },
});

function saveAdviser() {
  AdviserService.saveAdviser(adviser.value).then((res) => {
    console.log(res.data);
    router
      .push({
        name: "professer",
        params: { id: res.data.id },
      })
      .catch(() => {
        router.push({ name: "network-error " });
      });

    store.updateflashcard(
      "Successfully to add new Adviser for " + res.data.name
    );
    setTimeout(() => {
      store.resetflashcard();
    }, 3000);
  });
}
</script>

<template>
  <div class="flex justify-center">
    <div class="text-center">
      <div class="my-10">
        <p class="text-2xl font-mono font-bold text-center">
          Add Adviser Details
        </p>
        <p class="text-center text-blue-600">{{ flashMessage }}</p>
      </div>
      <div class="flex justify-center">
        <form @submit.prevent="saveAdviser">
          <div class="grid grid-cols-2 gap-2 font-mono">
            <p class="text-left">Name:</p>
            <input
              v-model="adviser.name"
              type="text"
              placeholder="Add Name..."
              class="text-center border-2"
            />
            <p class="text-left">SurName:</p>
            <input
              v-model="adviser.surname"
              type="text"
              placeholder="Add SurName..."
              class="text-center border-2"
            />
            <p class="text-left">Department:</p>
            <input
              v-model="adviser.department"
              type="text"
              placeholder="Add Department..."
              class="text-center border-2"
            />
          </div>
          <div class="justify-center font-mono">
            <h3 class="my-2">Image for Advisor</h3>
            <UploadImage v-model="adviser.image" />
          </div>
          <button
            type="submit"
            class="justify-center border-2 border-black bg-red-800 font-mono text-white p-2 mt-4"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  </div>
</template>
