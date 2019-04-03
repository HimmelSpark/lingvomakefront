<template>
  <v-app dark>
    <v-navigation-drawer
      app
      temporary
      v-model="drawer"
      touchless
      v-if="this.$route.path.indexOf('android') === -1">
      <v-list>
        <v-list-tile
          @click=""
          v-for="link of links"
          :key="link.title"
          :to="link.url">
          <v-list-tile-action>
            <v-icon>{{ link.icon }}</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title v-text="link.title"></v-list-tile-title>
          </v-list-tile-content>
        </v-list-tile>

        <v-list-tile
            v-if="isUserLoggedIn"
            @click="logout">
          <v-list-tile-action>
            <v-icon>exit_to_app</v-icon>
          </v-list-tile-action>

          <v-list-tile-content>
            <v-list-tile-title>Log Out</v-list-tile-title>
          </v-list-tile-content>

        </v-list-tile>

      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      dark
      v-if="this.$route.path.indexOf('mobile') === -1">
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up">
      </v-toolbar-side-icon>
      <v-toolbar-title>
        <v-btn :to="'/'" flat>
          <v-icon  left @click="doPaskhalka">toys</v-icon>
          Lingvomake
        </v-btn>
      </v-toolbar-title>
      <v-spacer></v-spacer>
      <transition name="fade">
        <v-toolbar-items class="hidden-sm-and-down" v-if="renderPermission">
          <v-btn
            flat
            v-for="link in links"
            :key="link.title"
            :to="link.url">
            <v-icon left>{{ link.icon }}</v-icon>
            {{ link.title }}
          </v-btn>

          <v-divider
            class="mx-1"
            inset
            vertical>
          </v-divider>

          <v-btn
            v-if="isUserLoggedIn"
            flat
            @click="logout">
            <v-icon left>exit_to_app</v-icon>
            Log Out
          </v-btn>
        </v-toolbar-items>
      </transition>
      <v-toolbar-side-icon
          @click="switchListDrawer"
          class="hidden-sm-and-up">
      </v-toolbar-side-icon>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>

    <template v-if="errorMessage">
      <v-snackbar
        :timeout="5000"
        :multi-line="true"
        :color="error"
        @input="closeError"
        :value="true"
      >
        {{ errorMessage }}
        <v-btn flat color="pink" @click.native="closeError"> Close</v-btn>
      </v-snackbar>
    </template>

    <v-footer
        height="auto">

      <v-layout
          justify-center
          row
          wrap>
        <v-flex
            lighten-2
            py-3
            text-xs-center
            white--text
            xs12>
          &copy;2019 — <strong>RHA Team</strong>
        </v-flex>
      </v-layout>
    </v-footer>
  </v-app>
</template>

<script>



  export default {
  data() {
    return {
      paskhalka: 0,
      drawer: false
    };
  },
  computed: {
    error() {},
    isUserLoggedIn() {
      return this.$store.getters.isUserLoggedIn;
    },
    renderPermission() {
      return this.$store.getters.renderPermission;
    },
    errorMessage() {
      return this.$store.getters.error;
    },
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Courses", icon: "work", url: "/courses" },
          { title: "Students", icon: "accessibility", url: "/students" },
		      { title: "Settings", icon: "settings", url: "/settings/application" },
        ];
      } else {
        return [
          { title: "Login", icon: "lock", url: "/login" },
          { title: "Registration", icon: "face", url: "/registration" }
        ];
      }
    }
  },
  methods: {
    doPaskhalka() {
      this.paskhalka++;
      if (this.paskhalka === 20) {
        this.paskhalka = 0;
        alert("ЪАЪ! Ты у меня дотыкаешься!");
      }
    },
    logout() {
      this.$store.dispatch("logout")
          .then(() => {
            this.$router.push('/login');
          });
    },
    closeError() {
      this.$store.commit("clearError");
    },
	  switchListDrawer() {
      this.$store.dispatch('setListDrawer', !this.$store.getters.isListDrawer);
      console.log("list drawer", this.$store.getters.isListDrawer)
    }
  }
};
</script>
<style scoped>
  .fade-enter-active {
    transition: all .3s ease;
  }
  .fade-enter {
    transform: translateX(50px);
    opacity: 0;
  }
</style>
