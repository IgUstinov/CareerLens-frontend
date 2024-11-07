<template>
    <div id="app">
      <header>
        <h1>Job Listings</h1>
        <nav>
          <router-link to="/">Home</router-link>
          <router-link to="/analysis">Analysis</router-link>
        </nav>
      </header>
      <router-view />
    </div>
  </template>
  
  <script>
  export default {
    name: 'App',
  };
  </script>
  
  <style>
  /* Пример стилей для всего приложения */
  header {
    background-color: #333;
    color: white;
    padding: 1rem;
    display: flex;
    justify-content: space-between;
  }
  nav a {
    color: white;
    margin: 0 10px;
    text-decoration: none;
  }
  </style>
  