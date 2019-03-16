<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <div class="text-xs-center">
              <v-chip color="green" text-color="white">{{text}}</v-chip>
            </div>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                  xs6
                  name="answer"
                  label="write your answer here"
                  type="text"
                  :rules="answerRules"
                  v-model="answer"
              ></v-text-field>
            </v-form>
            <div class="text-xs-center">
              <v-btn
                  dark
                  color="green"
                  @click="onSubmit"
              >Login</v-btn>
            </div>
          </v-card-text>
        </v-card>




      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
  export default {
	data() {
	  return {
      text: 'This is the text that you should translate',
      valid: false,
      answer: null,
      answerRules: [
      	v => !!v !== null
      ]
	  }
	}
  }
</script>