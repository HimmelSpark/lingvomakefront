<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>

          <v-img
              src="https://images.all-free-download.com/images/graphiclarge/toefl_87030.jpg"
              aspect-ratio="2.75"
          ></v-img>

          <v-card-title primary-title>
            <div>
              <h3 class="headline mb-0">
                {{selected.name}}: {{selected.children.length}} unit(s)</h3>
              <div>{{selected.description}}</div>
            </div>
          </v-card-title>

          <v-card-actions>

            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn flat icon large v-on="on"><v-icon>edit</v-icon></v-btn>
              </template>
              <span>edit this COURSE</span>
            </v-tooltip>

            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn icon large v-on="on"><v-icon>add</v-icon></v-btn>
              </template>
              <span>add new UNIT</span>
            </v-tooltip>

            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{on}">
                <v-btn flat dark icon large v-on="on" color="red"><v-icon>delete</v-icon></v-btn>
              </template>
              <span>delete this COURSE</span>
            </v-tooltip>

          </v-card-actions>

        </v-card>
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