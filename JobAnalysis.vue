<template>
    <div>
      <h2>Job Analysis</h2>
      <BarChart :data="chartData" />
    </div>
  </template>
  
  <script>
  import { Bar } from 'vue-chartjs';
  
  export default {
    components: { BarChart: Bar },
    props: ['jobs'],
    computed: {
      chartData() {
        const data = {
          labels: ['Junior', 'Mid', 'Senior'],
          datasets: [
            {
              label: 'Jobs by Experience Level',
              backgroundColor: ['#FF6384', '#36A2EB', '#FFCE56'],
              data: this.jobs.reduce(
                (acc, job) => {
                  if (job.experience === 'Junior') acc[0]++;
                  else if (job.experience === 'Mid') acc[1]++;
                  else if (job.experience === 'Senior') acc[2]++;
                  return acc;
                },
                [0, 0, 0]
              ),
            },
          ],
        };
        return data;
      },
    },
  };
  </script>
  