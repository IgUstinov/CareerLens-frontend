<template>
  <div>
    <v-container>
      <v-row>
        <v-col v-for="job in jobs" :key="job.id" cols="12" md="6" lg="4">
          <JobCard :job="job" />
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>
  
  <script>
  import JobCard from './JobCard.vue';
  
  export default {
    props: ['jobs'],
    components: { JobCard },
  };
  </script>
  