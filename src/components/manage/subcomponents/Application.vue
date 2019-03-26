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

            <v-flex xs6>

              <v-layout row>
                  <v-text-field
                      v-model="schoolName"
                      label="School Name">
                  </v-text-field>
              </v-layout>

              <v-layout row>
                <v-text-field
                    v-model="applicationTitle"
                    label="Application Title">
                </v-text-field>
              </v-layout>

              <v-layout row>
                <color-picker :change="updateColor1"></color-picker>
                <v-chip :color="color1">Primary color</v-chip>
              </v-layout>

              <v-layout row>
                <color-picker :change="updateColor2"></color-picker>
                <v-chip :color="color2">Secondary color</v-chip>
              </v-layout>

              <v-layout row>
                <v-text-field
                    v-model="applicationLanguage"
                    label="Application Language">
                </v-text-field>
              </v-layout>

              <v-layout row>
                <v-btn>Save changes</v-btn>
                <v-btn>Download</v-btn>
              </v-layout>

            </v-flex>

            <v-flex xs4>
              <v-layout row justify-center>
                <v-img
                    src="http://tmregister.ru/base/1991/DOC/DOCURUTM/DOC184V2/D18446D2/18446900/00000001.jpg"
                    max-width="320px">
                </v-img>
              </v-layout>

              <v-layout row justify-center>
                <v-btn>
                  <v-input prepend-icon="cloud_upload">Upload Image</v-input>
                </v-btn>
              </v-layout>

            </v-flex>

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
        applicationLanguage: 'English',
        color1: null,
        color2: null
      };
    },
    mounted () {
      //TODO предварительно загрузить данные
      this.color1 = '';
      this.color2 = '';
    },
    methods: {
      updateColor1: function(event) {
        this.color1 = event.color;
      },
      updateColor2: function(event) {
        this.color2 = event.color;
      }
    },
  };
</script>
