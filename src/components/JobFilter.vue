<template>
  <v-card class="pa-4 mb-4">
    <v-card-title>
    <v-icon left>mdi-filter</v-icon> Фильтры вакансий
    </v-card-title>
    <v-card-text>
      <!-- Фильтр по опыту работы -->
      <v-select
        v-model="selectedExperience"
        :items="experienceOptions"
        label="Опыт работы"
        outlined
        dense
      ></v-select>

      <!-- Фильтр по местоположению -->
      <v-text-field
        v-model="location"
        label="Местоположение"
        outlined
        dense
      ></v-text-field>

      <!-- Ползунок для диапазона зарплаты -->
      <v-slider
        v-model="salaryRange"
        :min="0"
        :max="200000"
        step="1000"
        label="Зарплата"
        append-icon="mdi-currency-rub"
        dense
      ></v-slider>
      <div>Зарплата: {{ salaryRange }} руб.</div>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="applyFilters">Применить фильтры</v-btn>
      <v-btn text @click="resetFilters">Сбросить</v-btn>
    </v-card-actions>
  </v-card>
</template>
  
  <script>
  export default {
    data() {
      return {
        selectedExperience: null,
        location: '',
        salaryRange: 50000,  // Инициализируем начальное значение для ползунка
        experienceOptions: [
          'Нет опыта',
          'От 1 года до 3 лет',
          'От 3 до 6 лет',
          'Более 6 лет',
        ],
      };
    },
    methods: {
      applyFilters() {
        this.$emit('applyFilter', {
          experience: this.selectedExperience,
          location: this.location,
          salary: { $gte: this.salaryRange },
        });
      },
      resetFilters() {
        this.selectedExperience = null;
        this.location = '';
        this.salaryRange = 50000;
        this.applyFilters();
      },
    },
  };
  </script>
  