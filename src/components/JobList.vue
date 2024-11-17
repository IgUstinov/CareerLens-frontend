<template>
  <div>
    <v-container>
      <!-- Индикатор загрузки -->
      <v-row v-if="loading">
        <v-col cols="12" class="text-center">
          <v-progress-circular indeterminate color="primary" size="64" />
        </v-col>
      </v-row>

      <!-- Отображаем вакансии -->
      <v-row v-else>
        <v-col v-for="job in paginatedJobs" :key="job.id" cols="12" md="6" lg="4">
          <JobCard :job="job" />
        </v-col>
      </v-row>

      <!-- Контейнер с кнопками управления -->
      <v-row justify="center">
        <v-btn icon @click="goToFirstPage" :disabled="currentPage === 1">
          <v-icon>mdi-chevron-double-left</v-icon>
        </v-btn>
        <v-pagination
          v-model="currentPage"
          :length="totalPages"
          :total-visible="5"
        />
        <v-btn icon @click="goToLastPage" :disabled="currentPage === totalPages">
          <v-icon>mdi-chevron-double-right</v-icon>
        </v-btn>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import JobCard from './JobCard.vue';
import { mapState, mapActions } from 'vuex';

export default {
  components: { JobCard },
  data() {
    return {
      itemsPerPage: 30,    // Количество элементов на страницу
      currentPage: 1,      // Текущая страница
    };
  },
  computed: {
    ...mapState(['jobs', 'loading']),  // Подключаем state из store
    totalPages() {
      return Math.ceil(this.jobs.length / this.itemsPerPage);
    },
    paginatedJobs() {
      const start = (this.currentPage - 1) * this.itemsPerPage;
      const end = start + this.itemsPerPage;
      return this.jobs.slice(start, end);
    },
  },
  methods: {
    ...mapActions(['fetchJobs']),
    goToFirstPage() {
      this.currentPage = 1;
    },
    goToLastPage() {
      this.currentPage = this.totalPages;
    },
  },
};
</script>
