<template>
    <div>
      <h2>По опыту</h2>
      <div v-if="chartData.datasets && chartData.datasets.length > 0">
        <BarChart :chart-data="chartData" />
      </div>
      <p v-else>Данные для анализа отсутствуют</p>
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  import { Chart, BarElement, CategoryScale, LinearScale } from 'chart.js';
  
  Chart.register(BarElement, CategoryScale, LinearScale);
  
  
  export default {
    components: { BarChart: Bar },
    props: ['jobs'],
    computed: {
      chartData() {
        if (!this.jobs || this.jobs.length === 0) {
          return { datasets: [] };
        }
  
        const experienceLevels = ['Нет опыта', 'От 1 года до 3 лет', 'От 3 до 6 лет'];
        const experienceCounts = [0, 0, 0];
  
        // Код для обработки и возврата данных для графика
        const jobData = this.jobs.reduce((acc, job) => {
          console.log(job)
          if (job.experience === 'Нет опыта') experienceCounts[0]++;
          else if (job.experience === 'От 1 года до 3 лет') experienceCounts[1]++;
          else if (job.experience === 'От 3 до 6 лет') experienceCounts[2]++;
          return acc;
        }, {});
  
        console.log(jobData)
  
        return {
          labels: experienceLevels,
          datasets: [
            {
              label: 'Количество вакансий по уровню опыта',
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              data: experienceCounts,
            },
          ],
        };
      },
    },
    mounted() {
      if (!this.jobs || this.jobs.length === 0) {
        console.warn("Данные для графика отсутствуют");
      }
    }
  };
  </script>
  