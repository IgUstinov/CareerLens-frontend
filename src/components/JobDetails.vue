<!-- JobDetails.vue -->
<template>
  <div>
    <h2>{{ job.name }}</h2>
    <p>{{ job.description }}</p>
    <p>Регион: {{ job.region }}</p>
    <p>Зарплата: {{ job.salary }}</p>
  </div>
</template>

<script>
import { onMounted, ref } from 'vue'
import { useRoute } from 'vue-router'
import axios from 'axios'

export default {
  name: 'JobDetails',
  setup() {
    const route = useRoute()
    const job = ref(null)

    onMounted(async () => {
      const response = await axios.get(`http://localhost:3000/api/jobs/${route.params.id}`)
      job.value = response.data
    })

    return { job }
  }
}
</script>
