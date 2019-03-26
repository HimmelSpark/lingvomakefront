<template>
  <v-container>
    <v-layout row justify-center>
      <v-flex xs10>

        <v-layout row>
          <v-flex xs12>
            <v-chip label dark color="primary">
              <v-icon left>android</v-icon>
              <div><h1 class="headline mb-0">Application</h1></div>
            </v-chip>
          </v-flex>
        </v-layout>

        <br>

        <v-card>
          <v-layout row justify-center>

            <v-flex xs3>
              <v-text-field
                  v-model="schoolName"
                  label="School Name">
              </v-text-field>

              <v-text-field
                  v-model="applicationTitle"
                  label="Application Title">
              </v-text-field>


            </v-flex>

            <v-flex xs3>
            </v-flex>

            <v-flex xs3>
              <v-img
                  src="http://tmregister.ru/base/1991/DOC/DOCURUTM/DOC184V2/D18446D2/18446900/00000001.jpg"
                  max-width="320px">
              </v-img>
            </v-flex>

            <color-picker :change="updateColor"></color-picker>

          </v-layout>

        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
    data() {
      return {
        schoolName: 'BKC iH',
        applicationTitle: 'BKC',
        color: null
      };
    },
    methods: {
      updateColor: function(event) {
        this.color = event.color;
      }
    },
  };
</script>
