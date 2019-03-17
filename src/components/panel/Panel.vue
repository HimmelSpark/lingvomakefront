<template>
  <v-container>
    <v-layout row>

        <v-flex xs4 md4>
          <v-treeview
              :active.sync="active"
              :items="items"
              :open.sync="open"
              return-object
              hoverable
              activatable
              >
          </v-treeview>
        </v-flex>

        <v-flex xs4 md8>
          <h1>Lorem ipsum dolor sit amet, .</h1>
            <v-content>
              <router-view></router-view>
            </v-content>
        </v-flex>

    </v-layout>
  </v-container>
</template>

<script>
  export default {
	  data() {
	    return {
	      open: [],
        active: [],
	    }
	  },
    computed: {
	    items() {
	      return this.$store.getters.items;
      }
    },
    watch: {
	    active: 'clickTree'
    },
    methods: {
	    clickTree() {
	      if (this.active[0] !== null) {
	        this.$store.dispatch('setSelected', this.active[0]);
	        switch (this.active[0].type) {
            case 'course':
              this.$router.push('/panel/course/' + this.active[0].id);
              break;
            case 'unit':
              this.$router.push('/panel/unit/' + this.active[0].id);
              break;
            case 'task':
              this.$router.push('/panel/task/' + this.active[0].id);
              break;
          }
        }
      }
    }
  }
</script>