// router/index.js
import Vue from 'vue'
import Router from 'vue-router'
import HomePage from '@/pages/HomePage.vue'
import AnalysisPage from '@/pages/AnalysisPage.vue'
import JobDetails from '@/components/JobDetails.vue'

Vue.use(Router)

export default new Router({
  mode: 'history',
  routes: [
    { path: '/', name: 'Home', component: HomePage },
    { path: '/analysis', name: 'Analysis', component: AnalysisPage },
    { path: '/job/:id', name: 'JobDetails', component: JobDetails, props: true }
  ]
})
