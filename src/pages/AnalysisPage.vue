<template>
    <div>
      <h1>Job Analysis</h1>
      <JobAnalysis :jobs="jobs" />
    </div>
  </template>
  
  <script>
  import { mapState } from 'vuex';
  import JobAnalysis from '@/components/JobAnalysis.vue';
  
  export default {
    components: { JobAnalysis },
    computed: {
      ...mapState(['jobs']),
    },
  };
  </script>  