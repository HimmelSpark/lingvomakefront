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
                    Unit
                    <v-chip label dark color="primary">{{ unitById.unit_name }}</v-chip>
                    has
                    <v-chip label dark color="primary"
                    >{{ unitById.children.length }}
                    </v-chip>
                    task(s)
                  </h2>
                  <div>{{ unitById.description }}</div>
                </div>
              </v-card-title>
            </v-flex>
            <v-flex xs2>
              <v-img :src="unitById.imgSrc" aspect-ratio="1.95"></v-img>
            </v-flex>
          </v-layout>

          <v-card-actions>
            <v-tooltip bottom>
              <template v-slot:activator="{ on }">
                <v-btn flat icon large v-on="on" @click="openEditDialog"><v-icon>edit</v-icon></v-btn>
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
                <v-btn icon large v-on="on" @click="createTaskDialog = true">
                  <v-icon>add</v-icon>
                </v-btn>
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
                  @click="openDeleteDialog">
                  <v-icon>delete</v-icon>
                </v-btn>
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

        <br>

        <v-container fluid grid-list-sm>

          <v-layout row wrap>

            <template
                v-for="task in unitById.children">
              <v-flex xs12 sm6 md4 lg3>
                <v-card>
                  <v-card-title>
                    <span>name: {{task.name}}</span>
                  </v-card-title>

                  <v-card-text>
                    <span>data: {{task.task}}</span>
                    <span>Type: {{task.task_type}}</span>
                  </v-card-text>

                  <v-card-actions>
                    <v-spacer></v-spacer>
                    <v-btn icon dark @click="openEditTaskDialog(task)"><v-icon>edit</v-icon></v-btn>
                    <v-btn icon flat color="red"><v-icon>delete</v-icon></v-btn>
                  </v-card-actions>
                </v-card>
              </v-flex>
              <br>
            </template>
          </v-layout>
        </v-container>

        <v-dialog v-model="editTaskDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>

            <v-toolbar dark>

              <v-btn icon dark @click="closeEditTaskDialog">
                <v-icon>close</v-icon>
              </v-btn>

              <v-toolbar-title>Editing task</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-toolbar-items>
                <v-btn dark flat @click="saveEditedDialog">Save</v-btn>
              </v-toolbar-items>

            </v-toolbar>

            <br>

            <template v-if="editingTask !== null && editingTask.type === 'T1'">
              <v-layout row justify-center>

                <v-flex xs5>
                  <h1>Here should be form for T1 type task</h1>
                </v-flex>

                <v-divider vertical></v-divider>

                <v-flex xs5>
                  <h1>Here should be visualisation of T1 task</h1>
                </v-flex>

              </v-layout>
            </template>

            <template v-if="editingTask !== null && editingTask.type === 'T2'">
              <v-layout row justify-center>

                <v-flex xs5>
                  <h1>Here should be form for T2 type task</h1>
                </v-flex>

                <v-divider vertical></v-divider>

                <v-flex xs5>
                  <h1>Here should be visualisation of T2 task</h1>
                </v-flex>

              </v-layout>
            </template>

            <template v-if="editingTask !== null && editingTask.type === 'T3'">
              <v-layout row justify-center>

                <v-flex xs5>
                  <h1>Here should be form for T3 type task</h1>
                </v-flex>

                <v-divider vertical></v-divider>

                <v-flex xs5>
                  <h1>Here should be visualisation of T3 task</h1>
                </v-flex>

              </v-layout>
            </template>

          </v-card>
        </v-dialog>

        <v-dialog v-model="createTaskDialog" fullscreen hide-overlay transition="dialog-bottom-transition">
          <v-card>

            <v-toolbar dark>

              <v-btn icon dark @click="createTaskDialog = false">
                <v-icon>close</v-icon>
              </v-btn>

              <v-toolbar-title>Creating task</v-toolbar-title>

              <v-spacer></v-spacer>

              <v-toolbar-items>
                <v-btn dark flat @click="saveCreatedTask">Save</v-btn>
              </v-toolbar-items>
            </v-toolbar>
            <br>
            <v-layout row justify-center>
                <v-flex xs5>
                  <v-card>
                  <v-card-title>
                    <h1 class="text-xs-center headline">Task data form</h1>
                  </v-card-title>
                  <v-card-text>

                    <v-form v-model="valid" ref="form" validation>
                      <v-text-field
                          name="name"
                          label="name"
                          type="text"
                          v-model="newTaskName">
                      </v-text-field>
                      <v-text-field
                          name="text"
                          label="text"
                          type="text"
                          v-model="newTaskText">
                      </v-text-field>

                      <v-combobox
                          v-model="model"
                          :filter="filter"
                          :hide-no-data="!search"
                          :items="items"
                          :search-input.sync="search"
                          hide-selected
                          label="Write options here"
                          multiple
                          small-chips
                          solo>
                        <template v-slot:no-data>
                          <v-list-tile>
                            <span class="subheading">Create</span>
                            <v-chip
                                :color="`${colors[nonce - 1]} lighten-3`"
                                label
                                small>
                              {{ search }}
                            </v-chip>
                          </v-list-tile>
                        </template>
                        <template v-slot:selection="{ item, parent, selected }">
                          <v-chip
                              v-if="item === Object(item)"
                              :color="`${item.color} lighten-3`"
                              :selected="selected"
                              label
                              small
                          >
        <span class="pr-2">
          {{ item.text }}
        </span>
                            <v-icon
                                small
                                @click="parent.selectItem(item)"
                            >close</v-icon>
                          </v-chip>
                        </template>
                        <template v-slot:item="{ index, item }">
                          <v-list-tile-content>
                            <v-text-field
                                v-if="editing === item"
                                v-model="editing.text"
                                autofocus
                                flat
                                background-color="transparent"
                                hide-details
                                solo
                                @keyup.enter="edit(index, item)">
                            </v-text-field>
                            <v-chip
                                v-else
                                :color="`${item.color} lighten-3`"
                                dark
                                label
                                small>
                              {{ item.text }}
                            </v-chip>
                          </v-list-tile-content>
                          <v-spacer></v-spacer>
                          <v-list-tile-action @click.stop>
                            <v-btn
                                icon
                                @click.stop.prevent="edit(index, item)">
                              <v-icon>{{ editing !== item ? 'edit' : 'check' }}</v-icon>
                            </v-btn>
                          </v-list-tile-action>
                        </template>
                      </v-combobox>

                      <v-text-field
                          name="correct"
                          label="correct answer"
                          type="text"
                          v-model="newTaskCorrect">

                      </v-text-field>

                      <v-card-actions>
                        <v-spacer></v-spacer>
                        <v-btn flat dark @click="saveCreatedTask">SAVE</v-btn>
                      </v-card-actions>
                    </v-form>
                  </v-card-text>
                  </v-card>
                </v-flex>
                <v-divider vertical></v-divider>
                <v-flex xs5 offset-xs1>
                  <h1>Here should be visualisation of T1 task</h1>
                </v-flex>
              </v-layout>
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
      editDialog: false,
      valid: true,

      addDialog: false,
      deleteDialog: false,

	    editTaskDialog: false,
	    createTaskDialog: false,
      editingTask: null,

      newTaskText: null,
	    newTaskCorrect: null,
      newTaskName: null,

      newTask: {
        name: null,
        unit_id: [],
		    task_type: 1,
        task: {
          answers: [],
          correct: null,
          text: null
        }
      },



	    activator: null,
	    attach: null,
	    colors: ['green', 'purple', 'indigo', 'cyan', 'teal', 'orange'],
	    editing: null,
	    index: -1,
	    items: [
		    { header: 'Answer options' },
	    ],
	    nonce: 1,
	    menu: false,
	    model: [],
	    x: 0,
	    search: null,
	    y: 0

    };
  },

  watch: {
    model (val, prev) {
      if (val.length === prev.length) return;

      this.model = val.map(v => {
      if (typeof v === 'string') {
        v = {
        text: v,
        color: this.colors[this.nonce - 1]
        };

        this.items.push(v);

        this.nonce++
      }
      return v
      })
    }
  },

  computed: {
    selected() {
      return this.$store.getters.selected;
    },
    unitById() {
      return this.$store.getters.unitById(this.id);
    }
  },
  methods: {

    edit (index, item) {
      if (!this.editing) {
        this.editing = item;
        this.index = index
      } else {
          this.editing = null;
          this.index = -1
      }
    },
    filter (item, queryText, itemText) {

      if (item.header) return false;

      const hasValue = val => val != null ? val : '';

      const text = hasValue(itemText);
      const query = hasValue(queryText);

      return text.toString()
          .toLowerCase()
          .indexOf(query.toString().toLowerCase()) > -1
    },

    openEditDialog() {
      this.editDialog = true;
    },
    saveAfterEdit() {
      //
      this.editDialog = false;
    },
	  saveCreatedTask() {

      let answers = [];
      this.items.forEach(item => {
        if (item.text !== undefined) {
          answers.push(item.text);
        }
      });

      this.newTask.task.answers = answers;
      this.newTask.unit_id = [this.id];
      this.newTask.name = this.newTaskName;
      this.newTask.task.text = this.newTaskText;
      this.newTask.task.correct = this.newTaskCorrect;
      this.$store.dispatch('createTask', this.newTask)
          .then(() => {
			      this.createTaskDialog = false;
          })
          .catch(e => {
            console.log(e);
          })
          .finally(() => {
			      this.createTaskDialog = false;
          });


    },
    openAddDialog() {
      this.addDialog = true;
    },
    saveAddedUnit() {
      //
      this.addDialog = false;
    },
    openDeleteDialog() {
        //todo здесь
      this.deleteDialog = true;
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
    },
    openEditTaskDialog(editingTask) {
      this.editingTask = editingTask;
      this.editTaskDialog = true;
    },
    closeEditTaskDialog() {
      this.editTaskDialog = false;
	    this.editingTask = null;
    },
    aveEditedDialog() {
      alert('mock save');
	    this.editTaskDialog = false;
    }
  }
};
</script>
