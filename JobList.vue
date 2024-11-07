<template>
    <div>
      <JobCard v-for="job in jobs" :key="job.id" :job="job" />
    </div>
  </template>
  
  <script>
  import JobCard from './JobCard.vue';
  
  export default {
    props: ['jobs'],
    components: { JobCard },
  };
  </script>
  