<template>
  <div>
    <h1>Список вакансий</h1>
    <JobFilter @applyFilter="applyFilter" />
    <JobList :jobs="filteredJobs" />
  </div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex';
import JobFilter from '@/components/JobFilter.vue';
import JobList from '@/components/JobList.vue';

export default {
  components: { JobFilter, JobList },
  computed: {
    ...mapGetters(['filteredJobs']),
  },
  methods: {
    ...mapActions(['fetchJobs']),
    applyFilter(filterData) {
      this.$store.commit('setFilters', filterData);
      this.fetchJobs(filterData);
    },
  },
  mounted() {
    this.fetchJobs();
  },
};
</script>
