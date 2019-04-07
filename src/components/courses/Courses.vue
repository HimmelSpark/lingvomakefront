<!--suppress ALL -->
<template>
  <v-container fill-height fluid justify-center>

    <v-menu
        v-model="menu"
        :close-on-content-click="false"
        left
        :nudge-width="200"
        offset-x>

      <template v-slot:activator="{ on }">
        <v-btn
            class="hidden-sm-and-up"
            fab
            absolute
            right
            top
            color="indigo"
            dark
            icon
            v-on="on">
          <v-icon>school</v-icon>
        </v-btn>
      </template>

      <v-flex xs12>
        <v-chip label dark color="primary">
          <v-icon left>school</v-icon>
          <div><h1 class="headline mb-0">Courses</h1></div>
        </v-chip>

        <v-btn fab dark small color="indigo"  @click="addCourseDialog = true">
          <v-icon dark>add</v-icon>
        </v-btn>

        <v-list>
          <v-list-group
              v-for="item in items"
              :key="item.id"
              :to="'/courses/course/' + item.id"
              :prepend-icon="'school'">

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
      </v-flex>

    </v-menu>

    <v-layout row>

      <v-flex xs12 sm4 md3 lg2 class="hidden-xs-only">

        <v-chip label dark color="primary">
          <v-icon left>school</v-icon>
          <div><h1 class="headline mb-0">Courses</h1></div>
        </v-chip>

        <v-btn fab dark small color="indigo"  @click="addCourseDialog = true">
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

      </v-flex>

      <v-divider vertical class="hidden-xs-only"></v-divider>

      <v-flex xs12 sm8 md9 lg10>

        <v-content>
          <v-scroll-y-transition mode="out-in">
            <router-view></router-view>
          </v-scroll-y-transition>
        </v-content>

      </v-flex>

      <v-dialog v-model="addCourseDialog" persistent max-width="490">
        <v-card>

          <v-card-title class="headline">
            Creating new Course
          </v-card-title>

          <v-card-text>
            <v-form v-model="valid" ref="form" validation>
              <v-text-field
                  name="name"
                  label="Name"
                  type="text"
                  v-model="courseName"
              ></v-text-field>
            </v-form>
          </v-card-text>

          <v-card-actions>

            <v-spacer></v-spacer>

            <v-btn color="red" flat @click="addCourseDialog = false">
              Cancel
            </v-btn>

            <v-btn color="green" :loading="loading" flat @click="createCourse">
              Save
            </v-btn>

          </v-card-actions>
        </v-card>
      </v-dialog>

    </v-layout>

  </v-container>
</template>

<script>
  export default {
    data() {
      return {
		    clickedItem: null,
        addCourseDialog: false,
        valid: false,
		    courseName: null,
        loading: false,
          menu: false
      }
    },
    methods: {
      clickList(clickedItem) {
        this.clickedItem = clickedItem;
        switch (clickedItem.type) {
          case "course":
            this.$router.push("/courses/course/" + clickedItem.id);
            break;
          case "unit":
            this.$router.push("/courses/unit/" + clickedItem.id);
            break;
        }
      },
      createCourse() {
        this.$store.dispatch('createCourse', {name: this.courseName})
            .then(() => {this.addCourseDialog = false});
      }
    },
    computed: {
      items() {
        return this.$store.getters.items;
      },
	    isListDrawer() {
        return this.$store.isListDrawer;
      }
    },

    // beforeMount() { //TODO разобраться с тем, чтобы при обновлении тоже загружал
	   //  if (this.$store.getters.items.length === 0) {
		 //    this.$store.dispatch('loadCourses');
	   //  }
    // },

    beforeRouteUpdate(to, from, next) {
        console.log('before route update, ', to.path);
	    const splitedPath = to.path.split('/');
	    console.log("in beforeRouteUpdate of Course page", splitedPath);
	    if (splitedPath.length !== 4) {
		    // this.$store.dispatch('setError', "Unexpected Error");
            this.$store.dispatch('loadCourses');
		    next();
	    } else {

	      switch (splitedPath[splitedPath.length-2]) {

          case "course":

            for (let i = 0; i < this.items.length; i++) {
              if (this.items[i].id === parseInt(splitedPath[splitedPath.length - 1])) {
                this.$store.dispatch('loadUnitsByCourse', {next: next, payload: this.items[i]});
                break;
              }
            }
            break;
          case "unit":

            for (let i = 0; i < this.items.length; i++) {
              for (let j = 0; j < this.items[i].children.length; j++) {
                if (this.items[i].children[j].id === parseInt(splitedPath[splitedPath.length - 1])) {
                  this.$store.dispatch('loadTasksByUnit', {next: next, id: parseInt(splitedPath[splitedPath.length - 1])});
                }
              }
            }
        }

	  }


    }
  }
</script>
