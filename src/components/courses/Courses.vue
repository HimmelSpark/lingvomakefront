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

        <!--<v-treeview-->
          <!--:active.sync="active"-->
          <!--:open.sync="open"-->
          <!--:items="items"-->
          <!--return-object-->
          <!--activatable-->
          <!--transition-->
          <!--hoverable>-->
        <!--</v-treeview>-->

        <v-list>
          <v-list-group
            v-for="item in items"
            :key="item.id"
            :prepend-icon="'school'"
            :open.sync="open"
            @click="clickList(item)">

            <template v-slot:activator>
              <v-list-tile>
                <v-list-tile-content>
                  <v-btn flat  small :loading="loadingUnits">{{ item.name }}</v-btn>
                  <!--<span>kaka</span>-->
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="clickList(subItem)">

              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.name }}</v-list-tile-title>
                <!--<v-list-tile-title>maka</v-list-tile-title>-->
              </v-list-tile-content>

            </v-list-tile>

          </v-list-group>
        </v-list>

        <span>{{active}}</span>

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
      valid: false,
      open: [],
      active: null,
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
    },
    loadingUnits() {
      return this.$store.getters.loadingUnits;
    }
  },
  methods: {
    clickTree() {

    },
    clickList(item) {
      if (item !== null) {
        this.$store.dispatch("setSelected", item);
        switch (item.type) {
          case "course":
            //TODO подгрузить юниты курса (если их нет)
            if (item.children.length === 0) {
              this.$store.dispatch("setLoadingUnits", true);
              this.$store.dispatch("loadUnitsByCourse", item);
            }
            this.$router.push("/courses/course/" + item.id);
            break;
          case "unit":
            this.$router.push("/courses/unit/" + item.id);
            break;
          case "task":
            this.$router.push("/courses/task/" + item.id);
            break;
          case "all":
            this.$router.push("/all");
            break;
        }
      }
    },
	  openAddCourseDialog() {
      this.addCourseDialog = true;
    },
	  createCourse() {
      this.$store.dispatch('createCourse', {name: this.courseName});
	    this.addCourseDialog = false;
    }
  },
  beforeCreate() {
    if (this.$store.getters.items.length === 0) {
      // TODO поменять на 0, когда уберем захардкоженные курсы
      this.$store.dispatch('loadCourses');
    }
  }
};

</script>
