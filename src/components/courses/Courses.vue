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
                </v-list-tile-content>
              </v-list-tile>
            </template>

            <v-list-tile
                v-for="subItem in item.children"
                :key="subItem.id"
                @click="clickList(subItem)">

              <v-list-tile-content>
                <v-list-tile-title>{{ subItem.unit_name }}</v-list-tile-title>
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
      dispatchBeforeLeave: {name: null, payload: null}
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
        console.log('item !== null');
        console.log(item.type);
        this.$store.dispatch("setSelected", item)
            .then(() => {
			        switch (item.type) {
				        case "course":
				          //TODO подгрузить юниты курса (если их нет)
				          if (item.children === undefined || item.children.length === 0) {
                    this.$store.dispatch("setLoadingUnits", true);
                    this.dispatchBeforeLeave = {name: 'loadUnitsByCourse', payload: item};
					          this.$router.push("/courses/course/" + item.id);
        				  } else {
                    this.$router.push("/courses/course/" + item.id);
                  }
				          break;
				        case "unit":
				          console.log("in type unit");
				          console.log(this.selected);
				          this.$router.push("/courses/unit/" + item.id);
				          break;
				        case "task":
				          this.$router.push("/courses/task/" + item.id);
				          break;
				        case "all":
				          this.$router.push("/all");
				          break;
			        }
            });

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
  //TODO раскомментировать
  beforeCreate() {
    if (this.$store.getters.items.length === 0) {
      // TODO поменять на 0, когда уберем захардкоженные курсы
      this.$store.dispatch('loadCourses');
    }
  },
  beforeRouteUpdate(to, from, next) {
    console.log("dispath before leave: ", this.dispatchBeforeLeave);
    this.$store.dispatch(this.dispatchBeforeLeave.name, {
      router: {
        to: to,
        from: from,
        next: next
      },
      payload:  this.dispatchBeforeLeave.payload
    })
        .then(() => {
		      this.$store.dispatch("setLoadingUnits", false);
        });
  }
};

</script>
