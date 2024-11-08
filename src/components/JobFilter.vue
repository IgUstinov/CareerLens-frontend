<template>
    <div>
      <label>Region:</label>
      <input v-model="region" placeholder="Enter region" />
  
      <label>Salary:</label>
      <input v-model="salary" type="number" placeholder="Minimum salary" />
  
      <label>Experience:</label>
      <select v-model="experience">
        <option value="">Any</option>
        <option value="Нет опыта">Нет опыта</option>
        <option value="От 1 года до 3 лет">От 1 года до 3 лет</option>
        <option value="От 3 до 6 лет">От 3 до 6 лет</option>
      </select>
  
      <button @click="applyFilter">Apply Filter</button>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        region: '',
        salary: null,
        experience: '',
      };
    },
    methods: {
      applyFilter() {
        this.$emit('applyFilter', {
          region: this.region,
          salary: this.salary ? { $gte: this.salary } : null,
          experience: this.experience || null,
        });
      },
    },
  };
  </script>
  