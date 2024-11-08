<template>
  <v-app>
    <v-app-bar app color="primary" dark>
      <v-toolbar-title>CareerLens</v-toolbar-title>
      <v-spacer></v-spacer>
      <v-btn text to="/">Home</v-btn>
      <v-btn text to="/analysis">Analysis</v-btn>
    </v-app-bar>

    <v-main>
      <router-view />
    </v-main>

    <v-footer app color="primary" dark>
      <v-col class="text-center white--text">
        © 2024 CareerLens
      </v-col>
    </v-footer>
  </v-app>
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
  