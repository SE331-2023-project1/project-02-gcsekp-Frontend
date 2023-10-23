<script setup lang="ts">
import router from "@/router";
import { useMessageStore } from "@/stores/message";
import { type AdviserItem, type StudentItem } from "@/type";
import { ref, type PropType } from "vue";
const props = defineProps({
  professer: {
    type: Object as PropType<AdviserItem>,
    require: true,
  },
  student: {
    type: Object as PropType<StudentItem>,
    require: true,
  },
});

const store = useMessageStore();
const comment = ref("");
function onSubmit() {
  store.updateMessage(String(props.student?.id), comment.value); // assuming adviserId is available from props or elsewhere
  comment.value = "";
  router.push({
    name: "student-detail",
  });
}

function flashMessagge() {
  store.updateflashcard("Welcome to Adviser Profile");
  setTimeout(() => {
    store.resetflashcard();
  }, 3000);
  router.push({
    name: "professer-profile",
    params: {
      id: props.professer?.id,
    },
  });
}
</script>

<template>
  <div class="flex flex-row justify-center">
    <div class="font-mono text-center">
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
        class="font-extrabold hover:text-red-800 font-mono underline"
      >
        More details
      </button>
    </div>
    <div class="text-center font-mono">
      <input
        type="text"
        placeholder="Enter comment .."
        v-model="comment"
        class="border-2 border-black h-16 w-80 p-2 break-words mt-2 text-center"
      />
      <div>
        <button
          @click="onSubmit"
          class="my-2 hover:text-red-800 font-extrabold underline"
        >
          Submit
        </button>
      </div>
    </div>
  </div>
</template>

<style scoped>
.active-link {
  color: red;
}
</style>
