<template>
  <v-container fill-height fluid justify-center>
    <v-layout row>

      <v-flex xs4 md3 lg2>

        <v-chip label dark color="primary">
          <v-icon left>school</v-icon>
          <div><h1 class="headline mb-0">Courses</h1></div>
        </v-chip>

        <v-btn fab dark small color="indigo"  @click="">
          <v-icon dark>add</v-icon>
        </v-btn>

        <v-list>
          <v-list-group
              v-for="item in items"
              :key="item.id"
              :prepend-icon="'school'"
              @click="clickList(item)">

            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  {{ item.name }}
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
                v-if="item.children !== undefined"
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="clickList(subItem)">

              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.unit_name }}</v-list-tile-title>
              </v-list-tile-content>

            </v-list-tile>

          </v-list-group>



        </v-list>

        <span v-if="clickedItem !== null">{{clickedItem}}</span>

      </v-flex>

      <v-divider vertical></v-divider>

      <v-flex xs8 md9 lg10>

        <span>{{items}}</span>

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
		    clickedItem: null
      }
    },
    methods: {
      clickList(clickedItem) {
        this.clickedItem = clickedItem;
        switch (clickedItem.type) {
          case "course":
            this.$router.push("/courses/course/" + clickedItem.id);
            break;
        }
      }
    },
    computed: {
      items() {
        return this.$store.getters.items;
      }
    },

    // beforeMount() { //TODO разобраться с тем, чтобы при обновлении тоже загружал
	   //  if (this.$store.getters.items.length === 0) {
		 //    this.$store.dispatch('loadCourses');
	   //  }
    // },
    beforeRouteUpdate(to, from, next) {


	    const splitedPath = to.path.split('/');
	    console.log(splitedPath);
	    if (splitedPath.length !== 4) {
		    this.$store.dispatch('setError', "Unexpected Error");
		    next(false)
	    } else {

		  for (let i = 0; i < this.items.length; i++) {
		    if (this.items[i].id === parseInt(splitedPath[splitedPath.length - 1])) {
			    this.$store.dispatch('loadUnitsByCourse', {next: next, payload: this.items[i]});
			    break;
		    }
		  }

	  }


    }
  }
</script>