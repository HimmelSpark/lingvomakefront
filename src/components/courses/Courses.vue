<template>
  <v-container fill-height fluid justify-center>
    <v-layout row>

      <v-flex xs4 md3 lg2>

        <v-chip label dark color="primary">
          <v-icon left>school</v-icon>
          <div><h1 class="headline mb-0">Courses</h1></div>
        </v-chip>

        <v-btn fab dark small color="indigo"  @click="openAddCourseDialog">
          <v-icon dark>add</v-icon>
        </v-btn>

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
          Click some tree item to VUE the data
        </v-chip>

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
      open: [],
      active: [],
      addCourseDialog: false,
      loading: false,
	    courseName: null,
    };
  },
  computed: {
    items() {
      return this.$store.getters.items;
    },
    selected() {
      return this.$store.getters.selected;
    },
    renderTreePermission() {
      return this.$store.getters.renderTreePermission;
    }
  },
  watch: {
    active: "clickTree"
  },
  methods: {
    clickTree() {
      if (this.active[0] !== null) {
        this.$store.dispatch("setSelected", this.active[0]);
        switch (this.active[0].type) {
          case "course":
            this.$router.push("/courses/course/" + this.active[0].id);
            break;
          case "unit":
            this.$router.push("/courses/unit/" + this.active[0].id);
            break;
          case "task":
            this.$router.push("/courses/task/" + this.active[0].id);
            break;
          case "all":
            this.$router.push("/all")
        }
      }
    },
	  openAddCourseDialog() {
      this.addCourseDialog = true;
    },
	  createCourse() {
      this.$store.dispatch('createCourse', {name: this.courseName, school_id: 3});
	    this.addCourseDialog = false;
    }
  },
  created() {
    if (this.$store.getters.items.length === 2) {
      // TODO поменять на 0, когда уберем захардкоженные курсы
      this.$store.dispatch('loadCourses');
    }
  }
};

</script>
