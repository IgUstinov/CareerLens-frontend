// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: [], // Инициализация как пустой массив
    areas: [],
    loading: false,
  },
  mutations: {
    setJobs(state, jobs) {
      // Задаем пустой массив по умолчанию, если jobs не массив
      state.jobs = Array.isArray(jobs) ? jobs : [];
    },
    setAreas(state, areas) {
      // Задаем пустой массив по умолчанию, если jobs не массив
      state.areas = Array.isArray(areas) ? areas : [];
    },
    setFilters(state, filters) {
      state.filters = filters
    },
    setLoading(state, isLoading) {
      state.loading = isLoading;
    },
  },
  actions: { 

    async fetchJobs({ commit }, filterData) {
      commit('setLoading', true);
      try {
        const response = await axios.post('http://localhost:3000/api/jobs', filterData);
        
        console.log('response', response)

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
      } finally {
        commit('setLoading', false);
      }
    },

    async fetchGetJobs({ commit }) {
      commit('setLoading', true);
      try {
        const response = await axios.get('http://localhost:3000/api/jobs');
        
        console.log('response', response)

        const jobs = Array.isArray(response.data) && response.data == [] 
          ? await axios.get('http://localhost:3000/api/jobs/refresh') 
          : response.data;
  
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
      } finally {
        commit('setLoading', false);
      }
    },

    loadCitiesFromStorage({ commit }) {
      const areas = localStorage.getItem('areas');
      if (areas) {
        commit('setAreas', JSON.parse(areas));  // Восстановление данных из localStorage
      }
    },

    async fetchAreas({ commit }) {
      try {
        const response = await axios.get('http://localhost:3000/api/areas');
        
        console.log('response', response)

        const areas = Array.isArray(response.data) && response.data == [] 
        ? await axios.get('http://localhost:3000/api/areas/refresh') 
        : response.data;
  
        // Проверка перед коммитом
        if (Array.isArray(areas)) {
          commit('setAreas', areas);
        } else {
          console.error("Ошибка: Данные с сервера не являются массивом");
          commit('setAreas', []); // На случай, если данные неверного формата
        }
      } catch (error) {
        console.error("Ошибка при получении данных:", error);
        commit('setAreas', []); // На случай ошибки
      }
    },
  },
  getters: {
    filteredJobs: (state) => state.jobs,
    getAreas: (state) => state.areas,
  },
})
