<template>
  <v-app>
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
      </v-list>
    </v-navigation-drawer>

    <v-toolbar
      app
      dark
      color="primary"
      v-if="this.$route.path.indexOf('mobile') === -1"
    >
      <v-toolbar-side-icon
        @click="drawer = !drawer"
        class="hidden-md-and-up"
      ></v-toolbar-side-icon>
      <v-icon @click="doPaskhalka">toys</v-icon>
      <v-toolbar-title>Lingvomake</v-toolbar-title>
      <v-spacer></v-spacer>
      <transition
        name="fade"
      >
      <v-toolbar-items class="hidden-sm-and-down" v-if="renderPermission">
        <v-btn 
        flat 
        v-for="link in links" 
        :key="link.title" 
        :to="link.url">
          <v-icon left>{{ link.icon }}</v-icon>
          {{ link.title }}
        </v-btn>
      </v-toolbar-items>
      </transition>
    </v-toolbar>

    <v-content>
      <router-view></router-view>
    </v-content>
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
    links() {
      if (this.isUserLoggedIn) {
        return [
          { title: "Panel", icon: "work", url: "/panel" },
          { title: "Students", icon: "accessibility", url: "/students" },
		      { title: "Manage", icon: "settings", url: "/settings" }
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
