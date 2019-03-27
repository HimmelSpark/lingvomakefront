<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-container fill-height>
            <v-layout row align-center>
              <v-flex xs6 md6 sm6 lg6>
                <h1>ЗДесь должна быть форма настройки таска</h1>
              </v-flex>

              <v-divider vertical></v-divider>

              <v-flex xs6 md6 sm6 lg6>
                <v-card width="20vw">
                  <v-responsive :aspect-ratio="9 / 16">
                    <v-card-text>
                      <v-layout row wrap align-center>
                        <v-flex xs12>
                          <div class="text-xs-center">
                            <v-chip color="green" text-color="white">{{
                              text
                            }}</v-chip>
                          </div>
                        </v-flex>
                      </v-layout>

                      <v-layout row wrap align-center>
                        <v-flex xs12>
                          <v-radio-group v-model="radioGroup">
                            <div class="text-xs-center">
                              <v-chip
                                v-for="radio of variants"
                                small
                                color="green"
                                outline
                              >
                                <v-radio
                                  small
                                  :key="radio.id"
                                  :label="radio.label"
                                  :value="radio.value"
                                  class="text-xs-center text-truncate"
                                ></v-radio>
                              </v-chip>
                            </div>
                          </v-radio-group>
                        </v-flex>
                      </v-layout>

                      <v-layout row wrap align-center>
                        <v-flex xs12>
                          <div class="text-xs-center">
                            <v-btn dark round color="green" @click="onSubmit">
                              Check
                            </v-btn>
                          </div>
                        </v-flex>
                      </v-layout>
                    </v-card-text>
                  </v-responsive>
                </v-card>
              </v-flex>
            </v-layout>
          </v-container>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      text: "What ___ your name?",
      variants: [
        { id: 1, label: "is", value: 1 },
        { id: 2, label: "are", value: 2 },
        { id: 3, label: "be", value: 3 }
      ]
    };
  },
  computed: {
    selected() {
      return this.$store.getters.selected;
    }
  },
  methods: {}
};
</script>
