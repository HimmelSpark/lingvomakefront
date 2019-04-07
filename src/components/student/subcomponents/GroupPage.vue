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
                <v-btn flat icon large v-on="on" @click="openEditGroupDialog(selected)"
                  ><v-icon>edit</v-icon></v-btn
                >
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
                        v-model="Gname"
                ></v-text-field>
                <!--<v-text-field-->
                        <!--name="startDate"-->
                        <!--label="StartDate"-->
                        <!--type="text"-->
                        <!--v-model="GstartDate"-->
                <!--&gt;</v-text-field>-->
                <v-text-field
                        name="description"
                        label="Description"
                        type="text"
                        v-model="Gdescription"
                ></v-text-field>
                <v-select
                        name="course_id"
                        :items="courses"
                        label="Select course for group"
                        v-model="Gcourseid"
                ></v-select>

                <!--TODO заделать юниты-->
                <v-select
                        name="current_unit"
                        :items="courses"
                        label="Select course for group"
                        v-model="Gcourseid"
                ></v-select>

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
      Gcourseid:null
    };
  },
  computed: {
    selected() {
      return this.$store.getters.getSelectedSTUD;
    },
    students() {
      return this.$store.getters.getStudents;
    },
    groups() {
      return this.$store.getters.getGroups;
    },
  courses() {
    return this.$store.getters.getCourseNames;
  }
  },
  methods: {
    openEditGroupDialog(group) {
      this.editGroupDialog = true;
      this.Gname = group.name;
      this.Gid = group.id;
      this.Gdescription = group.description;
      var i = 0;
      for (i in this.$store.getters.getCourses){
        if(this.$store.getters.getCourses[i].id ===  group.course_id){
          this.Gcourseid = this.$store.getters.getCourses[i].name;
          break;
        }
      }
      // this.GstartDate = group.startdate;

    },
    editGroup(){
      var i = 0;
      for (i in this.$store.getters.getCourses){
        if(this.$store.getters.getCourses[i].name === this.Gcourseid){
          this.Gcourseid = this.$store.getters.getCourses[i].id;
          break;
        }
      }
      this.$store.dispatch('changesGroup', {id: this.selected.id,name: this.Gname, description: this.Gdescription, start_date: this.GstartDate, course_id: this.Gcourseid}).then(() => {
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

      this.$store.dispatch('deletesGroup',this.selected.id).then(() => {
        this.$router.push("/students/");
      }) .catch(err => console.log(err));
      var i, j = null;
      for (i in this.students) {
        for (j in this.students[i].groups) {
          if (this.students[i].groups[j] === this.selected.id) {
            this.students[i].groups.pop(j);
          }
          if (this.students[i].groupName[j] === this.selected.name) {
            this.students[i].groupName.pop(j);
          }

        }
      }
      for (i in this.groups) {
        if (this.groups[i].id === this.selected.id) {
          this.groups.pop(i);
          break;
        }
      }

    }
  }
};
</script>
