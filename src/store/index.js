// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [], // Инициализация как пустой массив
  },
  mutations: {
    setJobs(state, jobs) {
      // Задаем пустой массив по умолчанию, если jobs не массив
      state.jobs = Array.isArray(jobs) ? jobs : [];
    },
    setFilters(state, filters) {
      state.filters = filters
    },
  },
  actions: {
    async fetchJobs({ commit }, filterData) {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs', { params: filterData });
        const jobs = response.data;
  
        // Проверка перед коммитом
        if (Array.isArray(jobs)) {
          commit('setJobs', jobs);
        } else {
          console.error("Ошибка: Данные с сервера не являются массивом");
          commit('setJobs', []); // На случай, если данные неверного формата
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        commit('setJobs', []); // На случай ошибки
      }
    },
  },
  getters: {
    filteredJobs: (state) => state.jobs,
  },
})
