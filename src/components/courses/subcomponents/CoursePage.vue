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
                    Course
                    <v-chip label dark color="primary">{{ courseById.name }}</v-chip>
                    has
                    <v-chip label dark color="primary">
                      {{ courseById.children.length }}
                    </v-chip>
                    unit(s)
                  </h2>
                  <div>{{ courseById.description }}</div>
                </div>
              </v-card-title>
            </v-flex>

            <v-flex xs2>
              <v-img :src="courseById.imgSrc" aspect-ratio="2"></v-img>
            </v-flex>

          </v-layout>

          <v-card-actions>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon large v-on="on" @click="openEditDialog">
                  <v-icon>edit</v-icon>
                </v-btn>
              </template>
              <span>edit this COURSE</span>
            </v-tooltip>

            <v-dialog v-model="editDialog" persistent max-width="490">
              <v-card>
                <v-card-title class="headline">
                  Editing current course
                </v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="editDialog = false">
                    Cancel
                  </v-btn>
                  <v-btn color="green" flat @click="saveAfterEdit">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large v-on="on" @click="openAddUnitDialog"
                  ><v-icon>add</v-icon></v-btn>
              </template>
              <span>Adding new unit</span>
            </v-tooltip>

            <v-dialog v-model="addUnitDialog" persistent max-width="490">
              <v-card>

                <v-card-title class="headline">
                  Creating new Unit
                </v-card-title>

                <v-card-text>
                  <v-form v-model="valid" ref="form" validation>
                    <v-text-field
                        name="name"
                        label="Unit Name"
                        type="text"
                        v-model="unitName"
                    ></v-text-field>
                    <v-text-field
                        name="description"
                        label="Unit Description"
                        type="text"
                        v-model="unitDescr"
                    ></v-text-field>
                  </v-form>
                </v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn color="red" flat @click="addUnitDialog = false">
                    Cancel
                  </v-btn>

                  <v-btn color="green" :loading="loading" flat @click="createUnit(courseById)">
                    Save
                  </v-btn>

                </v-card-actions>
              </v-card>
            </v-dialog>

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
                  @click="openDeleteDialog"
                  ><v-icon>delete</v-icon></v-btn
                >
              </template>
              <span>delete this COURSE</span>
            </v-tooltip>

            <v-dialog v-model="deleteDialog" persistent max-width="440">
              <v-card>

                <v-card-title class="headline">
                  Do you want to delete this course?
                </v-card-title>

                <v-card-text>
                  This process is irreversible, you can't restore this course later!
                </v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn color="primary" flat @click="deleteDialog = false">
                    Cancel
                  </v-btn>

                  <v-btn color="red" flat :loading="loadingToDelete" @click="deleteCourse(courseById)">
                    Delete
                  </v-btn>

                </v-card-actions>

              </v-card>
            </v-dialog>

          </v-card-actions>

        </v-card>

        <br>

        <v-container fluid grid-list-sm>
          <v-layout row wrap>
            <template v-for="unit in courseById.children">
              <v-flex xs12 sm6 md4 lg3>

                <v-card>

                  <v-card-title>
                    <span class="headline mb-4">
                    Unit: <v-chip dark label color="green">{{unit.unit_name}}</v-chip>
                    has <v-chip dark label color="green">{{unit.children.length}}</v-chip> tasks.
                  </span>
                  </v-card-title>

                  <v-card-actions>

                    <v-btn icon ripple @click="clickUnit(unit)">
                      <v-icon color="darken-3">remove_red_eye</v-icon>
                    </v-btn>

                    <v-spacer></v-spacer>

                    <v-btn icon ripple @click="openAddUnitDialog">
                      <v-icon color="darken-3">edit</v-icon>
                    </v-btn>

                    <v-btn icon ripple @click="deleteUnitDialog = true; unitToDelete = unit;">
                      <v-icon color="red darken-3">delete</v-icon>
                    </v-btn>

                  </v-card-actions>

                </v-card>

              </v-flex>
            </template>

            <v-dialog v-model="deleteUnitDialog" persistent max-width="440">
              <v-card>

                <v-card-title class="headline">
                  Do you want to delete this unit?
                </v-card-title>

                <v-card-text>
                  This process is irreversible, you can't restore this course later!
                </v-card-text>

                <v-card-actions>

                  <v-spacer></v-spacer>

                  <v-btn color="primary" flat @click="deleteUnitDialog = false">
                    Cancel
                  </v-btn>

                  <v-btn color="red" flat :loading="loadingToDelete" @click="deleteUnit()">
                    Delete
                  </v-btn>

                </v-card-actions>

              </v-card>
            </v-dialog>

          </v-layout>
        </v-container>



      </v-flex>

    </v-layout>



  </v-container>
</template>

<script>
export default {
  props: ['id'],
  data() {
    return {

	    valid: false,

      loadingToDelete: false,

      editDialog: false,
      addDialog: false,
      deleteDialog: false,
      addUnitDialog: false,
      unitToDelete: null,

	    unitName: null,
	    unitDescr: null,
	    deleteUnitDialog: false,

      loading: false,
    };
  },
  computed: {

    courseById() {
      const id = this.id;
      return this.$store.getters.courseById(id)
    },

    selected() {
      return this.$store.getters.selected;
    }
  },
  methods: {
    openEditDialog() {
      this.editDialog = true;
    },

    saveAfterEdit() {
      //
      this.editDialog = false;
    },

    openAddDialog() {
      this.addDialog = true;
    },

    saveAddedUnit() {
      //
      this.addDialog = false;
    },

    openDeleteDialog() {
      this.deleteDialog = true;
    },

    openAddUnitDialog() {
      this.addUnitDialog = true;
    },

	  deleteCourse(courseById) {
      this.loadingToDelete = true;
      this.$store.dispatch('deleteCourse', courseById)
          .then(() => {
			      this.deleteDialog = false;
			      this.loadingToDelete = false;
          })
          .catch((e) => {
            console.error(e);
            this.deleteDialog = false;
            this.loadingToDelete = false;
          })
          .finally(() => {
			      this.deleteDialog = false;
			      this.loadingToDelete = false;
          })
    },

	  createUnit() {

      this.loading = true;

      // let prevId = null;
      // if (this.courseById.children.length > 0) {
      //   prevId = this.courseById.children[this.courseById.children.length - 1].id;
      // }

      this.$store.dispatch('createUnit',
          {
            unit_name: this.unitName,
            description: this.unitDescr,
            course_id: this.courseById.id,
          }).then(() => {

          }).catch();

      this.loading = false;

      this.unitName = null;
      this.unitDescr = null;
      this.addUnitDialog = false;
    },

    clickUnit(unit) {
      if (unit !== null) {
        this.$store.dispatch("setSelected", unit)
            .then(this.$router.push("/courses/unit/" + unit.id));
      }
    },

    deleteUnit() {
	    this.loadingToDelete = true;
      this.$store.dispatch("deleteUnit", this.unitToDelete)
          .then(() => {
			      this.deleteUnitDialog = false;
			      this.loadingToDelete = false;
			      this.unitToDelete = null;
          })
          .catch((e) => {
			      console.error(e);
      			this.deleteUnitDialog = false;
			      this.loadingToDelete = false;
			      this.unitToDelete = null;
          })
          .finally(() => {
			      this.deleteDialog = false;
			      this.loadingToDelete = false;
			      this.unitToDelete = null;
          })
    }
  },
};
</script>

<style>

</style>
