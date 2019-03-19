<template>
  <v-container>
    <v-layout row>
      <v-flex xs12>
        <v-card>
          <v-img :src="selected.imgSrc" aspect-ratio="2.75"></v-img>

          <v-card-title primary-title>
            <div>
              <h2 class="headline mb-0">
                Unit
                <v-chip label dark color="primary">{{ selected.name }}</v-chip>
                has
                <v-chip label dark color="primary"
                  >{{ selected.children.length }}
                </v-chip>
                task(s)
              </h2>
              <div>{{ selected.description }}</div>
            </div>
          </v-card-title>

          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon large v-on="on" @click="openEditDialog"
                  ><v-icon>edit</v-icon></v-btn
                >
              </template>
              <span>edit this UNIT</span>
            </v-tooltip>

            <v-dialog v-model="editDialog" persistent max-width="490">
              <v-card>
                <v-card-title class="headline"
                  >Editing current unit</v-card-title
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="editDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="green" flat @click="saveAfterEdit">Save</v-btn>
                </v-card-actions>
              </v-card>
            </v-dialog>

            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn icon large v-on="on" @click="openAddDialog"
                  ><v-icon>add</v-icon></v-btn
                >
              </template>
              <span>add new TASK</span>
            </v-tooltip>

            <v-dialog v-model="addDialog" persistent max-width="490">
              <v-card>
                <v-card-title class="headline">Adding new Task</v-card-title>
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="addDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="green" flat @click="saveAddedUnit">Save</v-btn>
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
              <span>delete this UNIT</span>
            </v-tooltip>

            <v-dialog v-model="deleteDialog" persistent max-width="290">
              <v-card>
                <v-card-title class="headline"
                  >Do you want to delete this unit?</v-card-title
                >
                <v-card-text
                  >This process is irreversible, you can't restore this unit
                  later!</v-card-text
                >
                <v-card-actions>
                  <v-spacer></v-spacer>
                  <v-btn color="primary" flat @click="deleteDialog = false"
                    >Cancel</v-btn
                  >
                  <v-btn color="red" flat @click="deleteDialog = false"
                    >Delete</v-btn
                  >
                </v-card-actions>
              </v-card>
            </v-dialog>
          </v-card-actions>
        </v-card>
      </v-flex>
    </v-layout>
  </v-container>
</template>

<script>
export default {
  data() {
    return {
      editDialog: false,
      addDialog: false,
      deleteDialog: false
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
    }
  }
};
</script>
