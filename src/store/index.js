// store/index.js
import Vue from 'vue'
import Vuex from 'vuex'
import axios from 'axios'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    jobs: []
  },
  mutations: {
    setJobs(state, jobs) {
      state.jobs = jobs
    }
  },
  actions: {
    async fetchJobs({ commit }, filterData) {
      try {
        const response = await axios.get('http://localhost:3000/api/jobs', { params: filterData })
        console.log('2 response', response)
        console.log('2 response', filterData)
        commit('setJobs', response.data)
      } catch (error) {
        console.error('Error fetching jobs:', error)
      }
    }
  },
  getters: {
    filteredJobs: (state) => state.jobs
  }
})
