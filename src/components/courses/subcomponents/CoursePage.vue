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
                    <v-chip label dark color="primary">{{ selected.name }}</v-chip>
                    has
                    <v-chip label dark color="primary">
                      {{ selected.children.length }}
                    </v-chip>
                    unit(s)
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
                  Creating new Course
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

                  <v-btn color="green" :loading="loading" flat @click="createUnit(selected)">
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

                  <v-btn color="red" flat :loading="loadingToDelete" @click="deleteCourse(selected)">
                    Delete
                  </v-btn>

                </v-card-actions>

              </v-card>
            </v-dialog>

          </v-card-actions>
        </v-card>

        <br>

        <v-card v-if="selected.children.length !== 0">
          <v-list two-line>
          <template v-for="(unit, index) in selected.children">

            <v-list-tile
                :key="unit.name"
                @click="">

              <v-list-tile-content>
                <v-layout row align-center>
                  <span class="headline mb-4">
                    <v-chip dark label color="green">{{unit.name}}</v-chip> has
                    <v-chip dark label color="green">{{unit.children.length}}</v-chip> tasks.
                    | {{unit.description}}
                  </span>
                </v-layout>
              </v-list-tile-content>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="grey darken-3">edit</v-icon>
                </v-btn>
              </v-list-tile-action>

              <v-list-tile-action>
                <v-btn icon ripple>
                  <v-icon color="red darken-3">delete</v-icon>
                </v-btn>
              </v-list-tile-action>


            </v-list-tile>

            <v-divider></v-divider>

          </template>
        </v-list>
        </v-card>

      </v-flex>
    </v-layout>



  </v-container>
</template>

<script>
export default {
  data() {
    return {
      loadingToDelete: false,

      editDialog: false,
      addDialog: false,
      deleteDialog: false,
      addUnitDialog: false,

	    unitName: null,
	    unitDescr: null,

      loading: false
    };
  },
  computed: {
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
	  deleteCourse(selected) {
      this.loadingToDelete = true;
      this.$store.dispatch('deleteCourse', selected)
          .then(() => {
			      this.deleteDialog = false;
			      this.loadingToDelete = false;
          })
          .catch((e) => {
            console.error(e);
            this.deleteDialog = false;
            this.loadingToDelete = false;
          });
    },
	  createUnit() {

      this.loading = true;

      this.$store.dispatch('createUnit',
          {
            unit_name: this.unitName,
            description: this.unitDescr,
            course_id: this.selected.id,
			      position: this.selected.children.length + 10
          }).then(() => {

          }).catch();

      this.loading = false;

      this.unitName = null;
      this.unitDescr = null;
      this.addUnitDialog = false;
    }
  }
};
</script>
