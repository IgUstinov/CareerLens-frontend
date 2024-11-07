<template>
    <div class="job-card">
      <h3>{{ job.name }}</h3>
      <p>{{ job.description }}</p>
      <p><strong>Region:</strong> {{ job.region }}</p>
      <p><strong>Salary:</strong> ${{ job.salary }}</p>
      <p><strong>Experience:</strong> {{ job.experience }}</p>
    </div>
  </template>
  
  <script>
  export default {
    props: ['job'],
  };
  </script>
  