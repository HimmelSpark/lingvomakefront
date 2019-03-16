<template>
  <v-container fill-height>
    <v-layout row wrap align-center>
      <v-flex xs12>
        <v-card>
          <v-card-text>
            <div class="text-xs-center">
              <v-chip color="green" text-color="white">{{text}}</v-chip>
            </div>

            <div class="text-xs-center">

              <v-combobox
                  v-model="chips"
                  :items="items"
                  label="Your favorite hobbies"
                  chips
                  clearable
                  prepend-icon="filter_list"
                  solo
                  multiple
              >
                <template v-slot:selection="data">
                  <v-chip
                      :selected="data.selected"
                      close
                      @input="remove(data.item)"
                  >
                    <strong>{{ data.item }}</strong>&nbsp;
                  </v-chip>
                </template>
              </v-combobox>

            </div>




            <div class="text-xs-center">
              <v-btn
                  dark
                  color="green"
                  @click="onSubmit"
              >Check</v-btn>
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
	      chips: [],
	      items: ['это', 'который', 'надо', 'текст', 'перевести']
	    }
	  },
	  methods: {
	    remove (item) {
		    this.chips.splice(this.chips.indexOf(item), 1);
		    this.chips = [...this.chips]
	    }
	}
  }
</script>

<style>

</style>