<script setup lang="ts">
import AdvisorCard from '@/components/AdvisorCard.vue'
import AdvisorService from '@/services/AdvisorService'
import type { AdvisorDetail } from '@/type'
import { ref } from 'vue'
import { useRoute } from 'vue-router'

const advisorId = useRoute().params.advisorId
const advisor = ref<AdvisorDetail | null>(null)

AdvisorService.getAdvisorById(Number(advisorId))
  .then((response) => {
    advisor.value = response.data as AdvisorDetail // Explicitly cast the type
  })
  .catch((error) => {
    console.error('Error fetching advisor:', error)
  })
</script>

<template>
  <div class="flex justify-center -ml-5">
    <AdvisorCard v-if="advisor" :advisor="advisor"></AdvisorCard>
  </div>
</template>

<!-- <style scoped>
.advisor-card-container {
  display: flex;
  justify-content: flex-start;
  margin-left: -20px;
}
</style> -->
