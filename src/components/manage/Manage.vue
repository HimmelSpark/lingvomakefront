<template>
  <v-container fill-height fluid justify-center>
    <v-layout row>
      <v-flex xs5 md4 lg3>
        <v-chip label dark color="primary">
          <v-icon left>settings</v-icon>
          <div><h1 class="headline mb-0">Settings</h1></div>
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
        <v-chip v-if="selected === undefined" color="primary" dark>
          Click some tree item to VUE the data</v-chip>
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
        items: [
          {id: 0, name: 'Application', to: '/application'},
          {id: 1, name: 'Employees', to: '/employees'},
        ]
      };
    },
    watch: {
      active: "clickTree"
    },
    methods: {
      clickTree() {
        if (this.active[0] !== undefined) {
          this.$router.push('/settings' + this.active[0].to)
        }
      }
    },
    computed: {
      selected() {
        return this.$store.getters.getSelectedSTUD;
      }
    }
  };
</script>
