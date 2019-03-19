<template>
  <v-container fill-height fluid justify-center>
    <v-layout row>

      <v-flex xs5 md4 lg3>
        <v-chip label dark color="primary">
          <v-icon left>group</v-icon>
          <div><h1 class="headline mb-0">Groups</h1></div>
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

      <v-flex xs7 md8 lg9>
        <v-chip v-if="selected === undefined" color="primary" dark>Click some tree item to VUE the data</v-chip>
        <v-content>
          <v-scroll-y-transition mode="out-in">
            <router-view></router-view>
          </v-scroll-y-transition>
        </v-content>
        <h1>{{selected}}</h1>
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
	  watch: {
	    active: 'clickTree'
	  },
    methods: {
      clickTree() {
        this.$store.dispatch('setSelectedSTUD', this.active[0])
      }
    },
    computed: {
      items() {
        return this.$store.getters.getGroups
      },
	    selected() {
		    return this.$store.getters.getSelectedSTUD
	    }
    }
  }
</script>