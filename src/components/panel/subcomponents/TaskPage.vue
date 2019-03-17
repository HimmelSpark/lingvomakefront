<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <h1>This is Task page</h1>
        <h2>{{selected}}</h2>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {

      }
    },
    computed: {
      selected() {
        return this.$store.getters.selected;
      },
    },
    methods: {

    }
  }
</script>