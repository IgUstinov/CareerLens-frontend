<template>
  <div>
    <h1>Анализ вакансий</h1>
    <ExperienceAnalysis :jobs="jobs" />
    <DevelopAnalysis :jobs="jobs" />
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';
import ExperienceAnalysis from '@/components/ExperienceAnalysis.vue';
import DevelopAnalysis from '../components/DevelopAnalysis.vue';

export default {
  components: { ExperienceAnalysis, DevelopAnalysis },
  computed: {
    ...mapState(['jobs']),
  },
  methods: {
    ...mapActions(['fetchJobs']),
  },
  mounted() {
    if (!this.jobs || this.jobs.length === 0) {
      this.fetchJobs(); // Получение данных при монтировании компонента
    }
  },
};
</script>