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
        item-value="value"
        item-text="text"
        label="Опыт работы"
        outlined
        dense
      ></v-select>

      <!-- Фильтр по местоположению -->
      <v-autocomplete
        v-model="selectedLocation"
        :items="filteredAreas"
        item-value="id"
        item-text="name"
        label="Местоположение"
        outlined
        dense
        :loading="loading"
        :search-input.sync="search"
        :menu-props="{ maxHeight: '300px', zIndex: 1000 }"
        no-data-text="Введите корректное название города/республики"
        hide-no-data
        @input="onInputChange"
        @scroll="onScroll"
      ></v-autocomplete>

      <!-- Поле для ввода зарплаты -->
      <v-text-field
        v-model="salaryRange"
        label="Зарплата"
        outlined
        dense
        type="number"
        min="0"
        step="5000"
        append-icon="mdi-currency-rub"
      ></v-text-field>
    </v-card-text>
    <v-card-actions>
      <v-btn color="primary" @click="applyFilters">Применить фильтры</v-btn>
      <v-btn text @click="resetFilters">Сбросить</v-btn>
    </v-card-actions>
  </v-card>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  data() {
    return {
      selectedExperience: null,
      selectedLocation: null,
      salaryRange: null, // Инициализируем начальное значение для зарплаты
      search: '', // Для фильтрации местоположений
      filteredAreas: [], // Подгруженные местоположения
      loading: false, // Отображение загрузки
      batchSize: 100, // Размер порции для подгрузки
      currentBatch: 0, // Текущая порция
      experienceOptions: [
        { value: 'noExperience', text:'Нет опыта' }, 
        { value: 'between1And3', text:'От 1 года до 3 лет' },
        { value: 'between3And6', text:'От 3 до 6 лет' },
      ],
    };
  },
  computed: {
    ...mapState({
      areas: state => state.areas, // Доступ к массиву areas из Vuex
    }),
  },
  watch: {
    search(newSearch) {
      // Фильтрация местоположений на основе ввода
      if (newSearch) {
        this.filteredAreas = this.areas.filter((area) =>
          area.name.toLowerCase().includes(newSearch.toLowerCase())
        );
      } else {
        this.loadNextBatch(true); // Сбрасываем к первому батчу, если текст очищен
      }
    },
  },
  methods: {
    ...mapActions(['fetchAreas']), // Подключаем экшн для загрузки городов

    // Применение фильтров
    applyFilters() {
      this.$emit('applyFilter', {
        ...(this.selectedExperience !== null && { experience: { id: this.selectedExperience } }),
        ...(this.selectedLocation !== null && { area: { id: this.selectedLocation } }),
        ...(this.salaryRange !== null && this.salaryRange !== '' && { salary: { value: Number.parseInt(this.salaryRange) } }),
      });
    },

    // Сброс фильтров
    resetFilters() {
      this.selectedExperience = null;
      this.selectedLocation = null;
      this.salaryRange = null;
      this.applyFilters();
    },

    // Загрузка следующей порции местоположений
    loadNextBatch(reset = false) {
      if (reset) {
        this.currentBatch = 0;
        this.filteredAreas = [];
      }
      const start = this.currentBatch * this.batchSize;
      const end = start + this.batchSize;
      this.filteredAreas = this.filteredAreas.concat(this.areas.slice(start, end));
      this.currentBatch++;
    },

    // Обработка скролла в списке
    onScroll(e) {
      const scrollBottom =
        e.target.scrollTop + e.target.offsetHeight >= e.target.scrollHeight;
      if (scrollBottom && this.filteredAreas.length < this.areas.length) {
        this.loadNextBatch();
      }
    },
    onInputChange(searchValue) {
      if (searchValue.length > 0) {
        this.filteredAreas = this.areas.filter((area) =>
          area.name.toLowerCase().includes(searchValue.toLowerCase())
        );
      } else {
        this.filteredAreas = []; // Очищаем список, если поле пустое
      }
    },
  },
  mounted() {
    if (!this.areas.length) {
      this.fetchAreas(); // Загружаем данные о местоположениях, если они еще не загружены
    } else {
      this.loadNextBatch(true); // Если данные уже есть, загружаем первую порцию
    }
  },
};
</script>
