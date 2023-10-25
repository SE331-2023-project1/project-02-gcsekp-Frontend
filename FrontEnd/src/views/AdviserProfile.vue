<script setup lang="ts">
import AdviserService from '@/services/AdviserService'
import { useMessageStore } from '@/stores/message'
import type { AdviserItem } from '@/type'
import { storeToRefs } from 'pinia'
import { computed, ref, type PropType } from 'vue'
const professer = ref<AdviserItem | null>(null)
const props = defineProps({
  id: String,
  professer: {
    type: Object as PropType<AdviserItem>,
    require: true
  }
})

AdviserService.getAdviserById(Number(props.id))
  .then((response) => {
    professer.value = response.data
  })
  .catch((error) => {
    console.log(error)
  })

const store = useMessageStore()
const detail = computed(() => store.getDetail(String(props.professer?.id)))
const newDetail = ref('')
function addDetail() {
  store.addDetail(String(props.professer?.id), newDetail.value)
  newDetail.value = ''
}
const { flashMessage } = storeToRefs(store)
</script>

<template>
  <div class="my-10 bg-gray-600 ml-10 mr-10 rounded-lg">
    <div class="bg-teal-600 transition duration-3000 my-2">
      <h4 class="text-center font-mono text-white">{{ flashMessage }}</h4>
    </div>

    <div class="my-5">
      <div class="justify-center my-auto grid gap-3">
        <div class="mx-auto mt-10">
          <img
            v-for="image in professer?.image"
            :key="image"
            :src="image"
            alt=" professer image"
            class="border-2 border-white h-48 w-48 object-cover rounded-full"
          />
        </div>
        <h1 class="text-start text-3xl font-mono text-white pt-5">
          Adviser ID: {{ professer?.advisorID }}
        </h1>
        <div class="font-mono grid grid-cols-2 gap-2 text-white">
          <p class="font-semibold">Name-SurName:</p>
          <p class="text-justify">{{ professer?.name }} {{ professer?.surname }}</p>
          <p class="font-semibold">Department:</p>
          <p class="text-justify">{{ professer?.department }}</p>
          <p class="font-semibold">Position:</p>
          <p class="text-justify">{{ professer?.position }}</p>
        </div>
        <div v-if="detail && detail.length">
          <h1 class="text-center font-mono font-extrabold text-white">Professer Detail</h1>
          <p v-for="(details, index) in detail" :key="index" class="font-mono text-center">
            " {{ details }} "
          </p>
        </div>
        <div class="text-center font-mono border-t-2">
          <input
            type="text"
            v-model="newDetail"
            placeholder="Add Professer Detail.."
            class="border-2 h-16 w-full p-2 break-words mt-4 text-black ps-5"
          />
          <div>
            <button
              @click="addDetail"
              class="mb-10 mt-10 bg-teal-600 text-white hover:bg-teal-500 font-bold py-2 px-4 rounded"
            >
              Add Detail
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
