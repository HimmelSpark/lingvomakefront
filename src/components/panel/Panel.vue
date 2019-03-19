<template>
  <v-container fill-height fluid justify-center>
    <v-layout row>
        <v-flex xs4 md3 lg2>
          <v-chip label dark color="primary">
            <v-icon left>school</v-icon>
            <div><h1 class="headline mb-0">Courses</h1></div>
          </v-chip>
          <v-treeview
              :active.sync="active"
              :open.sync="open"
              :items="items"
              return-object
              activatable
              transition
              hoverable>
          </v-treeview>
        </v-flex>

        <v-divider vertical></v-divider>

        <v-flex xs8 md9 lg10>
          <v-chip v-if="selected === undefined" color="primary" dark>Click some tree item to VUE the data</v-chip>
            <v-content>
              <v-scroll-y-transition mode="out-in">
                <router-view></router-view>
              </v-scroll-y-transition>
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
      },
      selected() {
	      return this.$store.getters.selected;
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