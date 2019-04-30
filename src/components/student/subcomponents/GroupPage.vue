<!--suppress ALL -->
<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>

          <v-layout row>
            <v-flex xs10>
              <v-card-title primary-title>
                <div>
                  <h2 class="headline mb-0">
                    Group
                    <v-chip label dark color="primary">{{ selected.name }}</v-chip>
                    has
                    <v-chip label dark color="primary">
                      {{ students.length }}
                    </v-chip>
                    student(s)
                  </h2>
                  <div>{{ selected.description }}</div>
                </div>
              </v-card-title>
            </v-flex>

            <v-flex xs2>
              <v-img :src="selected.imgSrc" aspect-ratio="2"></v-img>
            </v-flex>
          </v-layout>


          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon large v-on="on" @click="openEditGroupDialog(selected)">
                  <v-icon>edit</v-icon>
                </v-btn>
              </template>
              <span>edit this Group</span>
            </v-tooltip>


            <v-spacer></v-spacer>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn
                  flat
                  dark
                  icon
                  large
                  v-on="on"
                  color="red"
                  @click="deleteGroupDialog = true"
                  ><v-icon>delete</v-icon></v-btn
                >
              </template>
              <span>delete this group</span>
            </v-tooltip>

          </v-card-actions>
        </v-card>
        <v-dialog v-model="editGroupDialog" persistent max-width="490">
          <v-card>
            <v-card-title class="headline">
              Adding new group
            </v-card-title>

            <v-card-text>
              <v-form v-model="valid" ref="form" validation>

                <v-text-field
                        name="name"
                        label="Name"
                        type="text"
                        v-model="Gname">
                </v-text-field>

                <v-text-field
                        name="description"
                        label="Description"
                        type="text"
                        v-model="Gdescription">
                </v-text-field>

                <v-select
                        name="course_id"
                        :items="courses"
                        label="Select course for group"
                        v-model="Gcourseid">
                </v-select>

                <v-select
                        name="unit_id"
                        :items="units"
                        label="Select course for group"
                        v-model="Gunit">
                </v-select>

                <!--TODO заделать юниты-->
                <!--<v-select-->
                        <!--name="current_unit"-->
                        <!--:items="courses"-->
                        <!--label="Select current unit"-->
                        <!--v-model="">-->
                <!--</v-select>-->

              </v-form>
            </v-card-text>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="editGroupDialog = false"
              >Cancel</v-btn>
              <v-btn color="green" flat @click="editGroup">Save</v-btn>
            </v-card-actions>

          </v-card>
        </v-dialog>
        <v-dialog v-model="deleteGroupDialog" persistent max-width="490">
          <v-card>
            <v-card-title class="headline">
              Are you sure, you want to delete group?
            </v-card-title>

            <v-card-actions>
              <v-spacer></v-spacer>
              <v-btn color="primary" flat @click="deleteGroupDialog = false"
              >Cancel</v-btn>
              <v-btn color="green" flat @click="deleteGroup()">Yes</v-btn>
            </v-card-actions>
          </v-card>
        </v-dialog>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
    props: ['id'],
  data() {
    return {
      deleteGroupDialog: false,
      editGroupDialog: false,
      addDialog: false,
      deleteDialog: false,
      Gname: null,
      Gdescription: null,
      GstartDate: null,
      Gid: null,
      Gcourseid:null,
      Gunit:null,
        valid: false
    };
  },
  computed: {
    selected() {
        console.log('selecteeeeeed,   ', this.$store.getters.getGroup);
      return this.$store.getters.getGroup;
    },
    students() {
      return this.$store.getters.students;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
    units() {
      const courses = this.$store.getters.items;
      for (let i = 0; i < courses.length; ++i) {
        if(courses[i].name === this.Gcourseid){

          console.log(this.$store.getters.items[i]);
          const units = this.$store.getters.items[i].children;
          console.log(units);
          let res = [];
          for (let j = 0; j < units.length; j++) {
            res.push(units[j].unit_name);
          }
          return res;
        }
      }
      return null;
    },
    courses() {
      const courses = this.$store.getters.items;
      let res = [];
      for (let i = 0; i < courses.length; ++i) {
        res.push(courses[i].name);
      }
      return res;
    }
  },
  methods: {
    openEditGroupDialog(group) {
      this.editGroupDialog = true;
      this.Gname = group.name;
      this.Gid = group.id;
      this.Gdescription = group.description;
      this.Gunit = group.curr_unit;
      let flag = 0;
      const courses = this.$store.getters.items;
      for (let i = 0; i < courses.length; ++i) {
        if (courses[i].id ===  group.course_id){
          this.Gcourseid = courses[i].name;
          flag = i;
          break;
        }
      }
      for (let j = 0; j < courses[flag].children.length; ++j) {
        if (courses[flag].children[j].id === this.Gunit) {
          this.Gunit =courses[flag].children[j].unit_name;
          break;
        }
      }
      // this.GstartDate = group.startdate;

    },
    editGroup() {
      const courses = this.$store.getters.items;
      let flag = 0;
      for (let i = 0; i < courses.length; ++i) {
        if (courses[i].name === this.Gcourseid){
          this.Gcourseid = courses[i].id;
          flag = i;
          break;
        }
      }
      for (let j = 0; j < courses[flag].children.length; ++j) {
        if (courses[flag].children[j].unit_name === this.Gunit) {
          this.Gunit =courses[flag].children[j].id;
        }
      }
      this.$store.dispatch('changesGroup',
          {
              id: this.selected.id,
              name: this.Gname,
              description: this.Gdescription,
              start_date: this.GstartDate,
              course_id: this.Gcourseid,
            curr_unit:this.Gunit
          })
          .then(() => {
                this.$router.push("/students/");
          }) .catch(err => console.log(err));

      this.selected.name = this.Gname;
      this.selected.description = this.Gdescription;
      this.selected.Gcourseid = this.Gcourseid;
      this.editGroupDialog = false
      // this.selected.st = this.Gname;
    },

    saveAddedUnit() {
      //
      this.addDialog = false;
    },

    deleteGroup: function () {

      this.$store.dispatch('deletesGroup',this.selected.id)
          .then(() => {
            this.$store.dispatch('loadAllStudents')
                .then(() => {
                  this.$store.dispatch('loadGroups');
                });
			      this.$router.push("/students/");
          })
          .catch(err => console.log(err));

      //TODO надо загрузить группы и студентов заново

      // for (let i = 0; i < this.students.length; ++i) {
      //   for (let j = 0; j < this.students[i].groups.length; ++j) {
      //     if (this.students[i].groups[j] === this.selected.id) {
      //       this.students[i].groups.pop(j);
      //     }
      //     if (this.students[i].groupName[j] === this.selected.name) {
      //       this.students[i].groupName.pop(j);
      //     }
      //
      //   }
      // }
      //
      // for (let i = 0; i < this.groups.length; ++i) {
      //   if (this.groups[i].id === this.selected.id) {
      //     this.groups.pop(i);
      //     break;
      //   }
      // }

    }
  },
  created() {
    for( let i = 0;i<this.$store.getters.items.length;i++ ){
      this.$store.dispatch('loadUnitsByCourse',{next:function () {
          console.log("OK");
        },payload:this.$store.getters.items[i]});
    }
  },
};
</script>
