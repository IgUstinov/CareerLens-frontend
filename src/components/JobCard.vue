<template>
  <v-container>
    <v-card>
      <v-card-title>
        <v-icon left>mdi-briefcase</v-icon> {{ job.name }}
      </v-card-title>
      <v-card-subtitle>{{ job.company }}</v-card-subtitle>
      <v-card-text>
        <v-icon left>mdi-calendar</v-icon> Опыт: {{ job.experience }}
      </v-card-text>
      <v-card-actions>
        <v-btn text color="primary">Посмотреть</v-btn>
      </v-card-actions>
    </v-card>
  </v-container>
</template>

<script>
export default {
  props: {
    job: {
      type: Object,
      required: true
    }
  }
};
</script>

<style scoped>
  /* Добавьте стили, если нужно */
</style>
